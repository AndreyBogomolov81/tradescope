<template>
  <Navbar
    :periods="Object.keys(periods)"
    :selected_period="selected_period"
    @select_period="handleSelectPeriod"
    @run_test="handleRunTest"/>
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
   candlestickOptions,
   volumeOption,
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
        mainSeries: null,
        secondSeries: null,
        thirdSeries: null,
        volumeSeries: null,
        _main_candles: null,
        _volume: null,

        // для обновления данных
        _end_data: false,

        //выбор тафмферйма в выпадающем списке временно для 1-го пуска
        // пережедать для обозначений с учетом дня
        //periods: ['1', '3', '5', '15', '30', '60', '120', '240', '360', '720'],
        periods: {
          '1m': '1',
          '3m': '3',
          '5m': '5',
          '15m': '15',
          '30m': '30',
          '1h': '60',
          '2h': '120',
          '4h': '240',
          '6h': '360',
          '12h': '720',
          'D': '1440'
        },
        selected_period: '15m',

        // набор переменных для тестирования
        _isRunningTest: false,
        _test_periods: {
          '15m': {'sm_period': '3m', 'k': 5},
          '30m': {'sm_period': '5m', 'k': 6},
          '1h': {'sm_period': '15m', 'k': 4},
          '2h': {'sm_period': '30m', 'k': 4},
          '4h': {'sm_period': '1h', 'k': 4},  
          'D': {'sm_period': '6h', 'k': 4},         
        },

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

        window.addEventListener("keydown", (event) => {
          if (event.key === "ArrowRight") {
            this.chart.timeScale().scrollToRealTime();
          }
        })

        //обновление диапазона при движении к старым данным
        let flag = false
        this.chart.timeScale().subscribeVisibleLogicalRangeChange(async range => {
          if (range.from < 15 && range.from > 0 && !flag && !this._end_data) {
            flag = true          
            this._end_data = await this._create_or_update_instruments_map()
            this._setSeries()
            flag = false
          }
        })
      },

      //инициализация инструмента
      async _create_or_update_instruments_map() {
        // функция для создания или обновления данных в хранилище
        let common = []
        let res;
        for (let v of this.selected_instruments) {
          //сделаем один общий мвссив категорий
          //логика формирования _selected_instruments выполнена так что базовый всегд под 0
          let instrument = this._getInstrument(v)
          if (!instrument) {
            instrument = this._setInstrument(v)
          } 
          //для каждого инструмента запрашиваем данные с сервера
          res = await instrument.set_candles(
            this.periods[this.selected_period]
          )

          // если инструмент базовый то достаем массив его данных находим максимальное и минимальное значение
          // если инструмент не основной добавляем вызываем функцию для создания относительных величин
          common.push(res)
        }
        return common.find(i => i) ? true : false
      },

      _setSeries() {
        let [a, b, c] = this.selected_instruments
        if (this.selected_instruments.length > 1) {
          this.mainSeries.setData(
            this._getInstrument(a).relative_candles.get(
              this.periods[this.selected_period]
            )
          )
          this._main_candles = null
          this.volumeSeries.setData([])
        } else {
          this._main_candles = this._getInstrument(a)
            .candles.get(this.periods[this.selected_period])
          this.mainSeries.setData(this._main_candles)

          this._volume = this._main_candles.map(i => this._getVolume(i))
          this.volumeSeries.setData(
            this._main_candles.map(i => this._getVolume(i))
          )
        }
        
        if (b) {
          this.secondSeries.setData(
            this._getInstrument(b).relative_candles.get(
              this.periods[this.selected_period]              
            )
          )
        } else {
          this.secondSeries.setData([])
        }

        if (c) {
          this.thirdSeries.setData(
            this._getInstrument(c).relative_candles.get(
              this.periods[this.selected_period]
            )
          )
        } else {
          this.thirdSeries.setData([])
        }
      },      

      _getVolume(obj) {
        let {time, open, close, volume: value} = obj
        let color = close > open ? "#008984" : "#f23645";
        return {time, value, color}
      },


      _getInstrument(instr) {
        const category = this._getCategoryByInstrument(instr)
        const key = `${category.title}_${instr.title}`
        return this._instrumentsMap.get(key)
      },

      _setInstrument(instr) {
        const category = this._getCategoryByInstrument(instr)
        const key = `${category.title}_${instr.title}`
        const i = new Instrument(instr.title, category)
        this._instrumentsMap.set(key, i)
        return i
      },

      _getCategoryByInstrument(instr) {
        return [
          ...this.categories_bybit, 
          ...this.categories_okx
        ].find(i => i.description == instr.category)
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
        this._end_data = false
        this.selected_period = data
        await this._create_or_update_instruments_map()
        this._setSeries()
      },

      async handleChangeSelectedInstr(data) {
        //обработка события смены категории в модальном окне
        this.selected_instruments = data
        this.base_instrument = data.find(i => i.isBase)
        await this._create_or_update_instruments_map()
        this._setSeries()
      },

      handleRunTest() {
        this._isRunningTest = true
        console.log('run test')
          /*
        Подготовка тнмтирования
        1 Тестирование должно выполняться для уже имеющихся данных 
        нсли даггых нет либо тх меньше чни 1000 то выводится сообщение что данных нет
        ['1', '3', '5', '15', '30', '60', '120', '240', '360', '720']
        */
        alert('Данных недостаточно')
      },
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

      //запрашиваем инструменты для okx
      this.instruments_okx = await this.loadData(
        '/api/v1/charts/instruments-okx/'
      )

      //инициализируем график рабочий код разкоментировать

      this.chart = createChart(this.$refs.chart, chartOptions);

      this.mainSeries = this.chart.addCandlestickSeries();
      this.mainSeries.applyOptions(candlestickOptions[0])
      
      // this.mainSeries.priceScale().applyOptions(priceScaleOptions);

      this.secondSeries = this.chart.addCandlestickSeries();
      this.secondSeries.applyOptions(candlestickOptions[1])

      this.thirdSeries = this.chart.addCandlestickSeries();
      this.thirdSeries.applyOptions(candlestickOptions[2])

      this.volumeSeries = this.chart.addHistogramSeries()
      this.volumeSeries.applyOptions(volumeOption)

      this.chart.timeScale().applyOptions(timeScaleOptions)
      this.chart.priceScale().applyOptions(priceScaleOptions)

      this._setSeries()
      // this.chart.timeScale().fitContent()

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