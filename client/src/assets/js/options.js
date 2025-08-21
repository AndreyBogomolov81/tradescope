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

export const candlestickOptions = {
    wickUpColor: '#089981',
    upColor: '#089981',
    wickDownColor: '#f23645',
    downColor: '#f23645',
    borderVisible: false,
}