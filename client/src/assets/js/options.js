//Настройки графика
import { LineStyle, CrosshairMode } from "lightweight-charts"

export const chartOptions = {
    layout: {
        background: { color: '#181c27' },
        textColor: '#DDD',
    },
    grid: {
        vertLines: { color: '#242733' },
        horzLines: { color: '#242733' },
    },

    // height: 1200,
    // width: 1400,

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
            labelBackgroundColor: '#9B7DFF',
        },
        //настройка видимости горизонтальной линии
        horzLine: {
            color: '#9B7DFF',
            labelBackgroundColor: '#9B7DFF',
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
        top: 0.9, // highest point of the series will be 70% away from the top
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

// export const candlestickOptions = {
//     wickUpColor: '#089981',
//     upColor: '#089981',
//     wickDownColor: '#f23645',
//     downColor: '#f23645',
//     borderVisible: false,
// }

export const candlestickOptions = [
    {
        wickUpColor: '#089981',
        upColor: '#089981',
        wickDownColor: '#f23645',
        downColor: '#f23645',
        borderVisible: false,
    },
    {
        wickUpColor: 'rgba(60, 180, 228, 0.5)',
        upColor: 'rgba(60, 180, 228, 0.5)',
        wickDownColor: 'rgba(42, 94, 236, 0.5)',
        downColor: 'rgba(42, 94, 236, 0.5)',
        borderVisible: false,
    },
    {
        wickUpColor: 'rgba(213, 86, 238, 0.5)',
        upColor: 'rgba(213, 86, 238, 0.5)',
        wickDownColor: 'rgba(54, 6, 50, 0.5)',
        downColor: 'rgba(54, 6, 50, 0.5)',
        borderVisible: true,
    }
]