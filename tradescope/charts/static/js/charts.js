import { klines } from './chart-data.js' // загрузка данных
import { 
    chartOptions, 
    timeScaleOptions, 
    candlestickOptions, 
    priceScaleOptions 
} from './options.js';

// создание chart
const chart = LightweightCharts.createChart(
    document.querySelector('#container'),
    chartOptions
);

//отрисовка горизонтальной линии
document.addEventListener('keydown', (e) => {
  let count = 0;
  if (e.code == 'ShiftLeft') {
    chart.subscribeClick(params => {
      if (!params.point) return;
      if (count == 0) {
        const price = mainSeries.coordinateToPrice(params.point.y);
        const minPriceLine = {
              price,
              color: '#ef5350',
              lineWidth: 2,
              lineStyle: 0, // LineStyle.Dashed
              axisLabelVisible: true,
          };
        mainSeries.createPriceLine(minPriceLine);
        count++;
      }      
    })
  }
});

//потсроение диаграммы
const mainSeries = chart.addSeries(LightweightCharts.CandlestickSeries);
mainSeries.setData(klines);

//настройка отображения диаграммы
chart.timeScale().applyOptions(timeScaleOptions);
mainSeries.priceScale().applyOptions(priceScaleOptions);
mainSeries.applyOptions(candlestickOptions);

//форматирование цены
// const myPriceFormatter = p => p.toFixed(2);
const currentLocate = window.navigator.languages[0];

const myPriceFormatter = Intl.NumberFormat(currentLocate, {
    style: 'currency',
    currency: 'EUR', // Currency for data points
}).format;


// Apply the custom priceFormatter to the chart
chart.applyOptions({
    localization: {
        priceFormatter: myPriceFormatter,
    },
});

//создание легенды
const mainLegend = document.createElement('div');
mainLegend.setAttribute("id", "main-legend");

mainLegend.classList.add('legend');
document.getElementById("container").appendChild(mainLegend)

let o = klines.at(-1).open;
let h = klines.at(-1).high;
let l = klines.at(-1).low;
let c = klines.at(-1).close;

mainLegend.innerHTML = getMainLegendText(o, h, l, c);

const crosshairMoveHandler = (crosshairPosition) => {
  if (crosshairPosition.time) {
    let mainData = crosshairPosition.seriesData.get(mainSeries);
    o = mainData.open;
    h = mainData.high;
    l = mainData.low;
    c = mainData.close;
    mainLegend.innerHTML = getMainLegendText(o, h, l, c);
  }
};

chart.subscribeCrosshairMove(crosshairMoveHandler);

function getMainLegendText(o, h, l, c) {
  let color = c > o ? "#008984" : "#f23645";
  return `OPEN: <span style="color:${color};">${o}</span>
          HIGHT: <span style="color:${color};">${h}</span>
          LOW: <span style="color:${color};">${l}</span>
          CLOSE: <span style="color:${color};">${c}</span>`;
}

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    timeScale.scrollToRealTime();
  }
});

//Автоматическое изменение размера диаграммы при изменении размера окна
window.addEventListener('resize', () => {
    chart.resize(window.innerWidth, window.innerHeight);
});

