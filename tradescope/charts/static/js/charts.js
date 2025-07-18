// import { klines } from './chart-data.js' // загрузка данных
import {
  chartOptions,
  timeScaleOptions,
  candlestickOptions,
  priceScaleOptions
} from './options.js';


const BASE_CHARTS_URL = 'http://0.0.0.0:8000/charts/api/v1/';
let loaded;

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


//настройка отображения диаграммы
chart.timeScale().applyOptions(timeScaleOptions);
mainSeries.priceScale().applyOptions(priceScaleOptions);
mainSeries.applyOptions(candlestickOptions);

//форматирование цены
// const myPriceFormatter = p => p.toFixed(2);
const currentLocate = window.navigator.languages[0];

// const myPriceFormatter = Intl.NumberFormat(currentLocate, {
//     style: 'currency',
//     currency: 'EUR', // Currency for data points
// }).format;


// // Apply the custom priceFormatter to the chart
// chart.applyOptions({
//     localization: {
//         priceFormatter: myPriceFormatter,
//     },
// });

//создание легенды
function createLegend(data) {
  const mainLegend = document.createElement('div');
  mainLegend.setAttribute("id", "main-legend");

  mainLegend.classList.add('legend');
  document.getElementById("container").appendChild(mainLegend);

  let o = data.at(-1).open;
  let h = data.at(-1).high;
  let l = data.at(-1).low;
  let c = data.at(-1).close;

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
}

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

//загрузка данных по событию загрузки DOM
//загрузка документа

document.addEventListener('DOMContentLoaded', async function (event) {

  //загрузка данных будет происходить отсюда
  //событие при первой загрузке  или после обновления страницы
  //отсюда будем загружать первичные данные без указания диапазона, тоесть первую в базе партию
  //перед загрузкой данных запросим текущие интервалы для инструмента
  //и инициализоровать переменную с первым интервалом
  loaded = {
    exchange: document.querySelector('#markets-list-btn').textContent.trim(),
    symbol: document.querySelector('#btn-instruents').textContent.trim(),
    interval: document.querySelector('#timeframe-btn').textContent.trim(),
    category: this.exchange === 'MOEX' ? 'share' : 'spot',
    start_date: undefined,
    data: [],
  };

  await gatKlines();
});


//функиця для запроса свечных данных
//разделим загрузку на две части при первой загружается часть данных
//часть данных определяется параметром взависимости от выбранного таймфрейма и будет передаваться в параметре запроса
//вторая часть это оставшиеся данные, после того как загрузка пройдет будет время на расширение массива

//первый вариант загрузки данных пачками
//не рабочий
let isLoaded = false;
async function gatKlines() {
  try {
    if (isLoaded) return;
    isLoaded = true;
    //проверяем на соответствие уже загруженным данным
    // извлекаем уже загруженные  данные
    const {
      exchange: loaded_exch,
      symbol: loaded_symb,
      interval: loaded_interval,
      category: loaded_category,
      data: loaded_all_data,
    } = loaded;

    let exchange = document.querySelector('#markets-list-btn').textContent.trim();
    let symbol = document.querySelector('#btn-instruents').textContent.trim();
    let interval = document.querySelector('#timeframe-btn').textContent.trim();
    let category = 'spot';

    let url = BASE_CHARTS_URL + `historical-data/?exchange=${exchange}
    &symbol=${symbol}&interval=${interval}&category=${category}`;  

    const response = await fetch(url);
    if (!response.ok) throw new Error('ошибка сети');

    const query = await response.json();
    if (query['result']) {
      //загружаем стартовую дату
      loaded.start_date = query['start_date'];
      //если параметры запроса равны прежним то обновляем данные с учетом хронологии
      if (
        loaded_exch == exchange && 
        loaded_symb == symbol && 
        loaded_interval == interval && 
        loaded_category == category      
      ) {
        loaded.data = [...loaded_all_data, ...query['data']];
      }
      else {
        loaded.data = query['data'];
      }
        //если с момента последнего объявления выбрана другая биржа или инструмент, то обновляем данные    
      if (exchange != loaded_exch)
        loaded.exchange = exchange;

      if (symbol != loaded_symb)
        loaded.symbol = symbol;

      if (interval != loaded_interval)
        loaded.interval = interval;

      mainSeries.setData(query['data']);
      createLegend(query['data']);
      loaded.flag = true;
    }
    else
      console.log('данные отсутствуют');

  } catch (error) {
    console.log('Ошибка:', error);
  } finally {
    isLoaded = false;
  }
}

const chunks = new Map([
  ['15t', 2],
  ['30t', 2],
  ['1h', 3],
  ['4h', 6],
  ['1DD', 30]
]);

chart.timeScale().subscribeVisibleLogicalRangeChange(async range => {
  // console.dir(range);
  //обновление диапазона
  const step = new Map([
    ['1h', 890000]
  ]);

  let {start_date} = loaded;  
  const date_to = chart.timeScale().getVisibleRange().to;

  if ((date_to - start_date) < step.get('1h')) {
    await gatKlines();
    console.log(start_date); 
   }

})
//размер чанков в зависимости от таймфреймов


console.log(chunks);

