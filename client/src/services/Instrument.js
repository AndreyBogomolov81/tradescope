export class Instrument {
    constructor(title, category) {
        this.title = title;
        this.category = category;
        this.requests_number = new Map();
        this.candles = new Map();
        this.relative_candles = new Map();
        this.max_value = null;
    }

    async set_candles(interval, relative_value=0) {
        /*
        Метод отвечает за подгрузку свечных данных для выбранного интервала
        */
        //проеряем есть ли для указанного интервала готовый список
        let count, url, response;
        let t = this.candles.get(interval)
        if (t) {
            //получаем элемент по номеру проверяя чтобы номер был меньше длины массива
            count = this._increaseCount(interval)
            let oldArr = this.candles.get(interval)
            url = this._get_url(interval, count)
            response = await this.loadCandlesData(url)

            if (response.length > 0) {
                let newArr = [...response, ...oldArr]
                this.candles.set(interval, newArr)

                let rel_arr = newArr.map(
                    i => this._get_rel_candle(i)
                )
                this.relative_candles.set(interval, rel_arr)
                return false
            }
            return true

        } else {
            //если данных нет устанавливаем счетчик равным 1, выполняем запрос
            count = 0
            url = this._get_url(interval, count)
            response = await this.loadCandlesData(url)
            if (response.length > 0) {
                this.candles.set(interval, response)
                this.requests_number.set(interval, count)

                let rel_arr = response.map(
                    i => this._get_rel_candle(i)
                )
                this.relative_candles.set(interval, rel_arr)
                return false            
            }
            return true
        }        
    }

    
    _get_rel_candle(obj) {
        const normalize = value => Number(
            (value / this.max_value).toFixed(4)
        );
        let {open, high, low, close} = obj

        return {
            ...obj,
            close: normalize(close),
            high: normalize(high),
            open: normalize(open),
            low: normalize(low)
        }
    }

    _increaseCount(interval) {
        let count = this.requests_number.get(interval)
        this.requests_number.set(interval, ++count)
        return count
    }

    async loadCandlesData(url) {
        //Метод для выполнения запроса на сервер
        const response = await fetch(url);
        if (!response.ok) throw new Error(res.status);
        const result = await response.json();
        if (result.data.candles) {
            this.max_value = result.data.max_value
            return result.data.candles
        }
        return []
    }

    _get_url(interval, count) {
        if (this.category.title.includes('bybit')) {
            return `/api/v1/charts/candles-data-bybit/?symbol=${this.title}&category=${this.category.title}&interval=${interval}&count=${count}`
        } else if (this.category.title.includes('okx')) {
            return `/api/v1/charts/candles-data-okx/?symbol=${this.title}&category=${this.category.title}&interval=${interval}&count=${count}`
        }
    }
}