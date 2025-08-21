<template>
  <Navbar/>
  <div ref="chart" class="chart">
    <div ref="legend" class="legend"></div>
  </div>

  <teleport to="#modals">
    <InstrumentsModal 
        :categories_bybit="categories_bybit"
        :categories_okx="categories_okx"
        :instruments_bybit="instruments_bybit"
        :instruments_okx="instruments_okx"
        @change_selected_instr="handleChangeSelectedInstr"/>
</teleport> 
</template>

<script>
import { createChart } from 'lightweight-charts';
import { klines } from '@/assets/js/chart-data';
import {
   chartOptions, 
   timeScaleOptions, 
   priceScaleOptions, 
   candlestickOptions
} from '@/assets/js/options';

import Navbar from './Navbar.vue';
import InstrumentsModal from './InstrumentsModal.vue';
import { wsService } from '@/services/ws-service';

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
        klines: klines,
        //для передачи в модальное 
        categories_bybit: null,
        categories_okx: null,
        instruments_bybit: null,
        instruments_okx: null,
        
        //webockets
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
        if (this.subscribed) {
          wsService.unSubscribeTopic 
          ? wsService.unSubscribeTopic(this.topic) : wsService.unSubscribe(this.topic);
          this.subscribed = false
        } else {
          wsService.subscribeTopic 
          ? wsService.subscribeTopic(this.topic) : wsService.subscribe(this.topic);
          this.subscribed = true
        }
      },
      async loadData(url) {
        const response = await fetch(url);
        if (!response.ok) throw new Error(res.status);
        const result = await response.json();
        return result.data
      },

      setEventsForChart() {
        //resize window
        window.addEventListener('resize', () => {
          this.chart.resize(
            window.innerWidth * this.chart_width, 
            window.innerHeight * this.chart_height
          );
      });
      },

      setLegend(){
        //создание легенды для графика
        const mainLegend = this.$refs.legend

        let o = this.klines.at(-1).open;
        let h = this.klines.at(-1).high;
        let l = this.klines.at(-1).low;
        let c = this.klines.at(-1).close;

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

      handleChangeSelectedInstr(data) {
        //обработка события смены категории в модальном окне
        for (let v of data) {
          console.log(v)
        }
      }
    },
    created() {
      this._onMsg = (msg) => {
        // покажем в консоли каждое сообщение, которое дошло до компонента
        console.log('[LightWeightChart] onMsg:', msg);

        if (msg.topic && msg.topic !== this.topic) return;
        this.messages.unshift(msg);
        if (this.messages.length > 200) this.messages.pop();
      };
        // регистрируем слушатель
      if (wsService && wsService.addListener) {
        wsService.addListener(this._onMsg);
      } else {
        console.warn('wsService.addListener not found');
      }
    },   

    async mounted() {
      console.log('WS instance before connect:', wsService.ws);
      if (!wsService.ws) {
        wsService.connect();
        console.log('wsService.connect() called');
      }
      // подписка
      wsService.subscribe ? wsService.subscribe(this.topic) : wsService.subscribeTopic(this.topic);
      console.log('subscribe requested for', this.topic);
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
      this.instruments_okx = await this.loadData(
        '/api/v1/charts/instruments-okx/'
      )

      this.chart = createChart(this.$refs.chart, chartOptions);
      this.candlestickSeries = this.chart.addCandlestickSeries();
      this.candlestickSeries.setData(this.klines);
      
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
      if (this._onMsg) wsService.removeListener(this._onMsg);
      // по желанию отписаться от топика:
      if (this.subscribed) {
        wsService.unSubscribeTopic 
        ? wsService.unSubscribeTopic(this.topic) : wsService.unSubscribe(this.topic);
      }
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