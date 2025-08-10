import okx.MarketData as marketData
import okx.PublicData as PublicData

def get_all_tickers_okx():
    flag = '1'
    market_data_api = marketData.MarketAPI(flag=flag)

    result = market_data_api.get_tickers(instType='SPOT')

    for i in result['data']:
        print(i)

def get_all_instruments(instType):
    flag = '0'
    publicDataAPI = PublicData.PublicAPI(flag=flag)

    result = publicDataAPI.get_instruments(instType=instType)

    for item in result['data']:
        print(item)
        break


if __name__ == '__main__':
    get_all_instruments('FUTURES')