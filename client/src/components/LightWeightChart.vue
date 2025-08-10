<template>
  <Navbar/>
  <div ref="chart" class="chart">
    <div ref="legend" class="legend"></div>
  </div>

  <teleport to="#modals">
    <InstrumentsModal 
        :instruments="crypto_instruments" 
        :categories="categories" 
        @category_changed="handleChangeCat"/>
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
        chart: null,
        chart_width: 1,
        chart_height: 0.95,
        candlestickSeries: null,
        klines: klines,
        categories: ['Спот', 'Фьючерсы', 'Опционы'],
        selected_category: 'Спот',        

        crypto_instruments: [
          {title: 'BTCUSDT', selected: true, exchange: 'Bybit', category: 'Спот', isBase: true, data: null},
          {title: 'EHTUSDT', selected: false, exchange: 'Bybit', category: 'Спот', isBase: false, data: null},
          {title: 'SALANAUSDT', selected: false, exchange: 'Bybit', category: 'Спот', isBase: false, data: null},
          {title: 'XRPUSDT', selected: false, exchange: 'Bybit', category: 'Спот', isBase: false, data: null},
          {title: 'FDRUSDT', selected: false, exchange: 'Bybit', category: 'Спот', isBase: false, data: null},
          {title: 'BTCUSDT', selected: false, exchange: 'Bybit', category: 'Спот', isBase: false, data: null},
          {title: 'BTCAUSDT', selected: false, exchange: 'Bybit', category: 'Спот', isBase: false, data: null},
          {title: 'FGTCUSDT', selected: false, exchange: 'Bybit', category: 'Спот', isBase: false, data: null},
        ]
      }
    },

    methods: {

      async getCategories(exchange) {
        let url = `/api/v1/charts/categories/${exchange}`
        let response = await fetch(url)
        let res = await response.json()
        if (res.result == false) {
          throw new Error('request error')
        }
        this.categories = res.data.categories
        this.selected_category = res.data.baseCategory
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

      handleChangeCat(category) {
        //обработка события смены категории в модальном окне
        this.selected_category = category
      }
    },    
    async mounted() {
      await this.getCategories('bybit')
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