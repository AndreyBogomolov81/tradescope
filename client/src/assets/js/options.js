//Настройки графика
import { LineStyle, CrosshairMode } from "lightweight-charts"

const daysOfWeek = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];
const months = [
  "Янв",
  "Фев",
  "Мар",
  "Апр",
  "Май",
  "Июн",
  "Июл",
  "Авг",
  "Сен",
  "Окт",
  "Ноя",
  "Дек",
];

export const chartOptions = {
    autoSize: true,
    layout: {
        background: { color: '#181c27' },
        textColor: '#DDD',
    },

    grid: {
        vertLines: { color: '#242733' },
        horzLines: { color: '#242733' },
    },

    rightPriceScale: {
        visible: true, // обязательно
        borderVisible: false,
    },

    // height: 1200,
    // width: 1400,
    timeScale: {
        rightOffset: 5,
        barSpacing: 10,
        minBarSpacing: 2,
        borderVisible: false,
        tickMarkFormatter: (time) => {
        var date = new Date(time * 1000);
        var day = date.getUTCDate();
        var month = date.getUTCMonth();
        var year = date.getUTCFullYear();
        var hours = date.getUTCHours();
        var minutes = date.getUTCMinutes();

        if (month == 0 && day == 1 && hours == 0 && minutes == 0) {
            return String(year);
        } else if (day == 1 && hours == 0 && minutes == 0) {
            return months[date.getUTCMonth()];
        } else if (hours == 0 && minutes == 0) {
            return String(day);
        } else {
            hours = String(hours).padStart(2, "0");
            minutes = String(minutes).padStart(2, "0");
            return `${hours}:${minutes}`;
        }
        },
    },
    localization: {
        timeFormatter: (time) => {
        var date = new Date(time * 1000);
        var dayOfWeek = daysOfWeek[date.getUTCDay()];
        var day = date.getUTCDate();
        var month = months[date.getUTCMonth()];
        var year = date.getUTCFullYear();
        var hours = String(date.getUTCHours()).padStart(2, "0");
        var minutes = String(date.getUTCMinutes()).padStart(2, "0");
        return `${dayOfWeek} ${day} ${month} ${year}   ${hours}:${minutes}`;
        },
    },

    //настройка перекрестия
    crosshair: {
        //убираем привязку к барам
        // mode: LightweightCharts.CrosshairMode.Normal,
        mode: CrosshairMode.Normal,

        //настройка видимости вертикальной линии
        vertLine: {
            width: 8,
            color: '#C3BCDB44',
            style: LineStyle.Solid,
            labelBackgroundColor: '#C3BCDB44',
        },
        //настройка видимости горизонтальной линии
        horzLine: {
            color: '#9B7DFF',
            labelBackgroundColor: '#C3BCDB44',
        }, 
    },    
   
}

export const volumeOption = {
    color: '#26a69a',
    priceFormat: {
        type: 'volume',
    },
    priceScaleId: '', // set as an overlay by setting a blank priceScaleId
    // set the positioning of the volume series
    scaleMargins: {
        top: 0.8, // highest point of the series will be 70% away from the top
        bottom: 0,
    },
}

export const timeScaleOptions = {
    borderColor: '#71649C',
    barSpacing: 10,
}

export const priceScaleOptions = {
    autoScale: true, // disables auto scaling based on visible content
    scaleMargins: {
        top: 0.1,
        bottom: 0.2,
    },
}


export const candlestickOptions = [
    {
        wickUpColor: '#089981',
        upColor: '#089981',
        wickDownColor: '#f23645',
        downColor: '#f23645',
        borderVisible: false,
        lastValueVisible: true,          // <-- включаем метку последней цены
        priceLineVisible: true,
        priceFormat: { type: 'price' },
        priceScaleId: 'right',

    },
    {
        wickUpColor: 'rgba(60, 180, 228, 0.5)',
        upColor: 'rgba(60, 180, 228, 0.5)',
        wickDownColor: 'rgba(42, 94, 236, 0.5)',
        downColor: 'rgba(42, 94, 236, 0.5)',
        borderVisible: false,
        lastValueVisible: true,          // <-- включаем метку последней цены
        priceLineVisible: true,          // <-- линия текущей цены (для некоторых серий)
        priceFormat: { type: 'price' },
    },
    {
        wickUpColor: 'rgba(213, 86, 238, 0.5)',
        upColor: 'rgba(213, 86, 238, 0.5)',
        wickDownColor: 'rgba(54, 6, 50, 0.5)',
        downColor: 'rgba(54, 6, 50, 0.5)',
        borderVisible: false,
        lastValueVisible: true,          // <-- включаем метку последней цены
        priceLineVisible: true,          // <-- линия текущей цены (для некоторых серий)
        priceFormat: { type: 'price' },
    }
]