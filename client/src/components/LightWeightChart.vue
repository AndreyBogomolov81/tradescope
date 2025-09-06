<template>
  <Navbar @select_period="handleSelectPeriod"/>
  <div ref="chart" class="chart">
    <div ref="legend" class="legend"></div>
  </div>

  <teleport to="#modals">
    <InstrumentsModal 
        :categories_bybit="categories_bybit"
        :categories_okx="categories_okx"
        :instruments_bybit="instruments_bybit"
        :instruments_okx="instruments_okx"
        :base_instrument="base_instrument"
        :selected_instruments="selected_instruments"
        @change_selected_instr="handleChangeSelectedInstr"/>
</teleport> 
</template>

<script>
import { createChart } from 'lightweight-charts';
import {
   chartOptions, 
   timeScaleOptions, 
   priceScaleOptions, 
   candlestickOptions
} from '@/assets/js/options';

import Navbar from './Navbar.vue';
import InstrumentsModal from './InstrumentsModal.vue';
import { Instrument } from '@/services/Instrument';

export default {
    name: 'chart',
    props: {
        msg: String,
    },

    components: {
      Navbar, 
      InstrumentsModal
    },

    data() {
      return {
        //для настройки графика
        chart: null,
        chart_width: 1,
        chart_height: 0.95,
        candlestickSeries: null,
        _main_candles: null,

        //выбор тафмферйма в выпадающем списке временно для 1-го пуска
        _sel_per: '15',

        //текущий иснтрументы
        _instrumentsMap: new Map(),
        
        //для передачи в модальное
        base_instrument: null, 
        selected_instruments: null,
        categories_bybit: null,
        categories_okx: null,
        instruments_bybit: null,
        instruments_okx: null,
        
        //webockets
        ws: null,
        messages: [],
        topic: 'tickers.BTCUSDT',
        subscribed: false,
        _onMsg: null,
      }
    },

    methods: {
      
      formatMsg(m) {
        try {
          return JSON.stringify(m);
        } catch (error) {
          return String(m);          
        }
      },
      toggleSubscribe() {
        // if (this.subscribed) {
        //   wsService.unSubscribeTopic 
        //   ? wsService.unSubscribeTopic(this.topic) : wsService.unSubscribe(this.topic);
        //   this.subscribed = false
        // } else {
        //   wsService.subscribeTopic 
        //   ? wsService.subscribeTopic(this.topic) : wsService.subscribe(this.topic);
        //   this.subscribed = true
        // }
      },
      async loadData(url) {
        //функция для загрузки данных с сервера
        const response = await fetch(url);
        if (!response.ok) throw new Error(res.status);
        const result = await response.json();
        return result.data
      },

      setEventsForChart() {
        //функция для установки всех событий для графика
        //resize window
        window.addEventListener('resize', () => {
          this.chart.resize(
            window.innerWidth * this.chart_width, 
            window.innerHeight * this.chart_height
          );
        });
        //обновление диапазона при движении к старым данным
        let flag = false
        let end_data = false
        this.chart.timeScale().subscribeVisibleLogicalRangeChange(async range => {
          if (range.from < 15 && range.from > 0 && !flag && !end_data) {
            flag = true          
            end_data = await this._create_or_update_instruments_map()
            this._main_candles = this._getBaseInstrumentObj()
              .candles.get(this._sel_per)

            this.candlestickSeries.setData(this._main_candles)
            flag = false
          }
        })
      },

      //инициализация инструмента
      async _create_or_update_instruments_map() {
        // функция для создания или обновления данных в хранилище
        let common = []
        for (let v of this.selected_instruments) {
          //сделаем один общий мвссив категорий
          let categories = [...this.categories_bybit, ...this.categories_okx]
          let category = categories.find(i => i.description == v.category)

          let instrument = this._getInstrument(category, v)
          if (!instrument) {
            instrument = this._setInstrument(category, v)
          } 
          //для каждого инструмента запрашиваем данные с сервера
          let res = await instrument.set_candles(this._sel_per)
          common.push(res)
        }
        return common.find(i => i) ? true : false
      },

      _getBaseInstrumentObj() {
        let categories = [...this.categories_bybit, ...this.categories_okx]
        let category = categories.find(
          i => i.description == this.base_instrument.category
        )
        return this._getInstrument(category, this.base_instrument)
      },

      _getInstrument(category, instr) {
        let key = `${category.title}_${instr.title}`
        return this._instrumentsMap.get(key)
      },

      _setInstrument(category, instr) {
        let key = `${category.title}_${instr.title}`
        let i = new Instrument(instr.title, category)
        this._instrumentsMap.set(key, i)
        return i
      },

      setLegend(){
        //создание легенды для графика
        const mainLegend = this.$refs.legend

        let o = this._main_candles.at(-1).open;
        let h = this._main_candles.at(-1).high;
        let l = this._main_candles.at(-1).low;
        let c = this._main_candles.at(-1).close;

        mainLegend.innerHTML = getMainLegendText(o, h, l, c);        

        function getMainLegendText(o, h, l, c) {
          let color = c > o ? "#008984" : "#f23645";
          return `OPEN: <span style="color:${color};">${o}</span>
                  HIGHT: <span style="color:${color};">${h}</span>
                  LOW: <span style="color:${color};">${l}</span>
                  CLOSE: <span style="color:${color};">${c}</span>`;
        }

        this.chart.subscribeCrosshairMove(param => {
          if (param.time) {
            let {
              open: o, 
              high: h,
              low: l, 
              close: c              
            } = Array.from(param.seriesPrices)[0][1]
            mainLegend.innerHTML = getMainLegendText(o, h, l, c)
          }          
        });
      },

      //обработчики событий для реактивных данных
      async handleSelectPeriod(data) {
        this._sel_per = data
        await this._create_or_update_instruments_map()
        this._main_candles = this._getBaseInstrumentObj()
        .candles.get(this._sel_per)
        this.candlestickSeries.setData(this._main_candles);
      },

      async handleChangeSelectedInstr(data) {
        //обработка события смены категории в модальном окне
        this.selected_instruments = data
        this.base_instrument = data.find(i => i.isBase)
        await this._create_or_update_instruments_map()
        this._main_candles = this._getBaseInstrumentObj()
          .candles.get(this._sel_per)
        this.candlestickSeries.setData(this._main_candles);
      }
    },
    
    created() {
      // this._onMsg = (msg) => {
      //   // покажем в консоли каждое сообщение, которое дошло до компонента
      //   console.log('[LightWeightChart] onMsg:', msg);

      //   if (msg.topic && msg.topic !== this.topic) return;
      //   this.messages.unshift(msg);
      //   if (this.messages.length > 200) this.messages.pop();
      // };
      //   // регистрируем слушатель
      // if (wsService && wsService.addListener) {
      //   wsService.addListener(this._onMsg);
      // } else {
      //   console.warn('wsService.addListener not found');
      // }
    },   

    async mounted() {
      //this.ws = new WebSocket('ws://localhost:8000/ws/proxy/')
      //this.ws.onopen = () => console.log('connected to django-channels proxy')
      //this.ws.onmessage = (evt) => {
      //  try {
      //    const msg = JSON.parse(evt.data);
      //    console.log('msg from server:', msg);
      //  } catch (e) {
      //    console.log('raw', evt.data);
      //  }
      //};
      //this.ws.onClose = () => console.log('closed')
      //this.ws.onerror = (e) => console.log('ws error', e)
      // console.log('WS instance before connect:', wsService.ws);
      // if (!wsService.ws) {
      //   wsService.connect();
      //   console.log('wsService.connect() called');
      // }
      // // подписка
      // wsService.subscribe ? wsService.subscribe(this.topic) : wsService.subscribeTopic(this.topic);
      // console.log('subscribe requested for', this.topic);

      //загрузка данных с сервера
      this.categories_bybit = await this.loadData(
        `/api/v1/charts/categories-bybit/`
      )
      this.categories_okx = await this.loadData(
        `/api/v1/charts/categories-okx/`
      )
      this.instruments_bybit = await this.loadData(
        '/api/v1/charts/instruments-bybit/'
      )

      //основное описание базового инструмента
      this.base_instrument = this.instruments_bybit
        .find(i => i.category == 'Spot')['instruments']
        .find(i => i.isBase)

      //список выбранных иснтрументов с сервера по умолчанию
      this.selected_instruments = this.instruments_bybit
        .map(i => i.instruments)
        .flat().filter(i => i.selected)

      //инициализация объекта Map интруметнов
      await this._create_or_update_instruments_map()

      //для базового инструмента выводим свечные данные для основной серии
      this._main_candles = this._getBaseInstrumentObj()
        .candles.get(this._sel_per)

      //запрашиваем инструменты для okx
      this.instruments_okx = await this.loadData(
        '/api/v1/charts/instruments-okx/'
      )

      //инициализируем график
      this.chart = createChart(this.$refs.chart, chartOptions);
      this.candlestickSeries = this.chart.addCandlestickSeries();
      this.candlestickSeries.setData(this._main_candles);
      
      this.chart.timeScale().applyOptions(timeScaleOptions);
      this.candlestickSeries.priceScale().applyOptions(priceScaleOptions)
      this.candlestickSeries.applyOptions(candlestickOptions)
      this.chart.resize(
        window.innerWidth * this.chart_width, 
        window.innerHeight * this.chart_height
      );

      this.setEventsForChart()
      this.setLegend()
    },

    beforeUnmount() {
      if (this.ws) this.ws.close();
      // if (this._onMsg) wsService.removeListener(this._onMsg);
      // // по желанию отписаться от топика:
      // if (this.subscribed) {
      //   wsService.unSubscribeTopic 
      //   ? wsService.unSubscribeTopic(this.topic) : wsService.unSubscribe(this.topic);
      // }
    },
  //добавить метод unmounted()

}
</script>

<style scoped>

.chart {
  width: 100%;
  height: 100%;
  cursor: crosshair;
}

.legend {
  position: absolute;
  left: 12px;
  top: 50px;
  z-index: 2;
  color: #DDD;
  font-family: sans-serif;
}

</style>