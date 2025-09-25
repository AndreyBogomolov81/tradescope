<template>
  <Navbar
    :periods="periods_keys"
    :selected_period="selected_period"
    @select_period="handleSelectPeriod"
    @run_test="handleRunTest"
    @reset_test="hendleResetTest"
    @update_hist_data="handleUpdateHistData"
    @play="handlePlay"
    @pause="handlePause"/>
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
      let periods = {
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
        }

      let periods_keys = Object.keys(periods)

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
        _priceLines: [],

        // для обновления данных
        _end_data: false,

        //выбор тафмферйма в выпадающем списке временно для 1-го пуска
        // пережедать для обозначений с учетом дня
        //periods: ['1', '3', '5', '15', '30', '60', '120', '240', '360', '720'],
        periods,
        periods_keys,
        selected_period: '1h',

        // набор переменных для тестирования
        isReadyTest: false,
        _base_test_candles: null,
        _block_update_hist: false,
        _streamInterval: null,
        _pauseTest: true,
        
        _test_periods: {
          '1h': {'base_period': '15m', 'k': 4},
          '4h': {'base_period': '1h', 'k': 4},  
          'D': {'base_period': '6h', 'k': 4},         
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
        let drawLine = false

        window.addEventListener('resize', () => {
          this.chart.resize(
            window.innerWidth * this.chart_width, 
            window.innerHeight * this.chart_height
          );
        });

        window.addEventListener("keydown", (event) => {
          if (event.key === "ArrowRight") {
            //сдвигаем график до последней свечки
            this.chart.timeScale().scrollToRealTime();

          } else if (event.code == 'ShiftLeft') {
            let setLine = true
            // отрисовываем горизонтальную линию
            this.chart.subscribeClick(params => {
              if (!params.point) return

              if (setLine) {
                const price = this.mainSeries.coordinateToPrice(params.point.y);
                const priceLine = {
                    price,
                    color: '#ef5350',
                    lineWidth: 2,
                    lineStyle: 0, // LineStyle.Dashed
                    axisLabelVisible: true,
                }

                let t = this.mainSeries.createPriceLine(priceLine)
                this._priceLines.push(t)
                setLine = false
              }
            })

          } else if (event.key == 'z') {
            drawLine = !drawLine
            let line = this._priceLines.find(i => i.options().color == '#0d6efd')
            // редактирование линии 
            // получаем цену по нажатию на график
            this.chart.subscribeClick(params => {
              if (!params.point) return
              const price = this.mainSeries.coordinateToPrice(params.point.y)
              if (line) {
                line.applyOptions({
                  price,
                  color: '#ef5350',
                })
                line = null

              } else {
                if (!drawLine) return
                //если линии ранее не было то находим новую
                const l = price - price * 0.001
                const h = price + price * 0.001
                
                //дублируем массив свойств #0d6efd
                line = this._priceLines.find(
                  i => (i.options().price > l && i.options().price < h)
                )             
                //после получения индекса меняем цвет
                if (line) {
                  line.applyOptions({color: '#0d6efd'})
                }
              }
              //ищем по цене если совадает получаем индекс
            })
          } else if (event.key == 'Delete') {
            let line = this._priceLines.find(i => i.options().color == '#0d6efd')
            if (line) {
              this.mainSeries.removePriceLine(line)
              this._priceLines.splice(
                this._priceLines.findIndex(i => i.options().color == line.options().color), 1
              )
            }
          }
        })

        //обновление диапазона при движении к старым данным
        let flag = false
        this.chart.timeScale().subscribeVisibleLogicalRangeChange(async range => {
          if (range.from < 15 && !flag && !this._end_data && !this._block_update_hist) {
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
        // this.chart.timeScale().fitContent()
      },
      
      //функция для создания тестовых данных
      async _setTestSeries() {
        const instr        = this._getInstrument(this.base_instrument);
        const testPeriod   = this.periods[this.selected_period];                // текущий период
        const basePeriod   = this.periods[this._test_periods[this.selected_period].base_period]; //-— базовый относитель текущего

        /* 1. Подтягиваем свежие данные (3 попытки) */
        await this._loadWithRetries(instr, testPeriod, basePeriod, 3);

        /* 2. Берём массив свечей тестового (H1) периода */
        const testCandles = instr.candles.get(testPeriod);

        /* 3. Выбираем случайную точку отсечения так,
              чтобы у меньшего тайм-фрейма существовала свеча
              > последней выбранной H1-свечи.                */
        const cutIndex = this._randomCutIndex(testCandles, instr.candles.get(basePeriod));
        const main     = testCandles.slice(0, cutIndex);          // готовый срез H1
        const lastTime = main.at(-1).time;

        /* 4. Формируем базовый массив начиная СТРОГО после lastTime */
        const base = instr.candles.get(basePeriod)
                      .filter(b => b.time > lastTime);

        /* 5. Отрисовываем */
        this._main_candles      = main;
        this._base_test_candles = base;

        this.mainSeries.setData(main);
        this.volumeSeries.setData(main.map(this._getVolume));
        this.chart.timeScale().fitContent()
      },

      async _loadWithRetries(instr, testP, baseP, attempts = 3) {
        for (let i = 0; i < attempts; i++) {
          if (await instr.set_candles(testP)) return;          // если приходит true то не запрашиваем базовый и выходим
          // если основной период не пришёл – пробуем 4-кратно подкачать базовый
          for (let j = 0; j < 4; j++) await instr.set_candles(baseP);
        }
        console.log('Данные загрузились');
      },

      /* б) ищем валидный случайный индекс без рекурсии  */
      _randomCutIndex(testArr, baseArr) {
        const baseTimes = new Set(baseArr.map(b => b.time));   //  создаем множество из времен O(1) проверка
        const len       = testArr.length;

        // максимум 20 попыток
        for (let tries = 0; tries < 20; tries++) { 
          //берем случайный индекс от 1 до len-1
          const idx = Math.floor(Math.random() * (len - 1)) + 1; 
          // если временная метка есть в базовом массиве возвращаем индекс
          if (baseTimes.has(testArr[idx - 1].time)) return idx;
        }

        // если за 20 попыток не нашли ‑ берём последний доступный
        for (let i = len - 1; i > 0; i--) {
          if (baseTimes.has(testArr[i - 1].time)) return i;
        }
        return len;                                           // fallback: весь массив
      },

      // Функция-генератор для выдачи данных серий
      *realTimeGenerator() {
        for (const bar of this._base_test_candles) {
          yield bar
        }
      },

      startStreaming() {
        let lastH1 = null
        const stream = this.realTimeGenerator()
        this._streamInterval = setInterval(() => {
          if (this._pauseTest) {
            return
          }
          const next = stream.next()
          if (next.done) {
            clearInterval(this._streamInterval)
            return
          }
          // начальная свеча 1h null          
          let bar_base = next.value
          //число для округления взависимости от выбранного интервала
          let rounded_number = Number(this.periods[this.selected_period]) * 60
          let hourStart = bar_base.time - (bar_base.time % rounded_number)
          
          //новый час
          if (!lastH1 || hourStart > lastH1.time) {
            if (lastH1) {
              // если у нас уже была свеча, можно сохранить её в массив
              this._main_candles.push(lastH1)
            }

            // создаём новую часовую свечу
            lastH1 = {
              time: hourStart,
              open: bar_base.open,
              high: bar_base.high,
              close: bar_base.close,
              low: bar_base.low,
              volume: bar_base.volume
            }

            this.mainSeries.update(lastH1)
          } else {

            lastH1.high = Math.max(lastH1.high, bar_base.high)
            lastH1.low = Math.min(lastH1.low, bar_base.low)
            lastH1.close = bar_base.close
            lastH1.volume += bar_base.volume
            
            this.mainSeries.update(lastH1)
          }

          let v = this._getVolume(lastH1)
          this.volumeSeries.update(v)
        }, 500)
      },

      stopStreaming() {
        clearInterval(this._streamInterval)
      },

      _getVolume(obj) {
        // получение объекта объем для выбранной свечки
        let {time, open, close, volume: value} = obj
        let color = close > open ? "#008984" : "#f23645";
        return {time, value, color}
      },


      _getInstrument(instr) {
        // получение инструмента 
        const category = this._getCategoryByInstrument(instr)
        const key = `${category.title}_${instr.title}`
        return this._instrumentsMap.get(key)
      },

      _setInstrument(instr) {
        //создыние нового инструмента и включение в отобраэжение
        const category = this._getCategoryByInstrument(instr)
        const key = `${category.title}_${instr.title}`
        const i = new Instrument(instr.title, category)
        this._instrumentsMap.set(key, i)
        return i
      },

      _getCategoryByInstrument(instr) {
        //получение интсрумента по категории
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
        //смена временного интервала
        this.selected_period = data
        if (this.isReadyTest) {
          console.log('тестирование')
          //если во время выбора таймфрема стоит тестирование то реализуем ту же логику что и при запуске тест
          this.stopStreaming()
          if (!Object.keys(this._test_periods).includes(this.selected_period)) {
            alert('неверно выбран интервал')
            return
          }
          await this._setTestSeries()
          this.startStreaming()
          return
        }
        this._end_data = false        
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

      async handleRunTest() {
        // обработка запуска тестирования
        if (!Object.keys(this._test_periods).includes(this.selected_period)) {
          alert('неверно выбран интервал')
          return
        }

        this.isReadyTest = true
        this._block_update_hist = true
        // отключаем выбор биржи
        //отключаем выбор инструмента из модального окна

        // передадим новый список для периодов
        await this._setTestSeries()
        this.startStreaming()
        
      },

      hendleResetTest() {
        // обработка сброса тестирования
        this.stopStreaming();
        this.isReadyTest = false
        this._block_update_hist = false

        // восстанавливаем периоды
        this.periods_keys = Object.keys(this.periods)
        this._base_test_candles = null
        this._setSeries()
      },

      async handleUpdateHistData() {
        //обработка обновления исторических данных
        this.stopStreaming()
        await this._setTestSeries()
        this.startStreaming()
      },

      handlePlay() {
        //обработка нажатия кнопки play
        this._pauseTest = false
      },

      handlePause() {
        // обработка нажатия кнопки pause
        this._pauseTest = true
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

      window.addEventListener('beforeunload', this.stopStreaming)
    },

    beforeUnmount() {
      if (this.ws) this.ws.close();
      // if (this._onMsg) wsService.removeListener(this._onMsg);
      // // по желанию отписаться от топика:
      // if (this.subscribed) {
      //   wsService.unSubscribeTopic 
      //   ? wsService.unSubscribeTopic(this.topic) : wsService.unSubscribe(this.topic);
      // }
      this.stopStreaming();
      window.removeEventListener('beforeunload', this.stopStreaming);
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