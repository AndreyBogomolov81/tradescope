from typing import List
from datetime import datetime as dt
import time

from pybit.unified_trading import HTTP
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

session = HTTP()


def get_intervals_for_klines_query(start_date, end_date, interval=15) -> List[dict]:
    '''
    Функция получения списка временных интервалов для запроса свечей с биржи ByBit
    :param start_date: стартовая дата
    :param end_date: конечная дата
    :param interval: таймфрейм в минутах
    :return:
    '''
    interval_sec = interval * 60
    m = end_date.minute
    m -= m % interval
    end_date = dt(
        year=end_date.year,
        month=end_date.month,
        day=end_date.day,
        hour=end_date.hour,
        minute=m
    )
    start = int(dt.timestamp(start_date))
    end = int(dt.timestamp(end_date))

    # получить непрерывный список timestamp для интервала
    times = (i for i in range(start, end + interval_sec, interval_sec))

    ls = []
    count = 0
    st = 0
    ed = 0
    for v in times:
        ed = v
        if count == 1:
            st = v
        if count == 900:
            ls.append(
                {
                    'start': st,
                    'end': ed,
                    'limit': count
                }
            )
            count = 1
        else:
            count += 1
    else:
        if count > 1:
            ls.append(
                {
                    'start': st,
                    'end': ed,
                    'limit': count - 1
                }
            )

    return ls


def test_intervals(start, end, limit=0):
    times = (i for i in range(start, end + 900, 900))
    count = 0
    for i, v in enumerate(times, 1):
        count += 1
        # print(count, dt.fromtimestamp(v))
    print(count, limit)


# TODO: переписать на асинхронное получение данных либо на многопоточное
def get_klines(symbol, category, start_date, end_date, interval=15):
    '''
    Функция для получения котировок от указанной даты или интервала
    :param symbol:
    :param category:
    :param start_date:
    :param end_date:
    :param interval:
    :return:
    '''
    time_intervals = get_intervals_for_klines_query(
        start_date=start_date,
        end_date=end_date,
        interval=interval
    )

    result = []
    for t in time_intervals:
        quotes = session.get_kline(
            category=category,  # spot
            symbol=symbol,  # BTCUSDT
            interval=interval,
            limit=t['limit'],
            start=t['start'] * 1000,
            end=t['end'] * 1000
        )['result']['list']
        result.extend(quotes)
        time.sleep(0.5)

    return result


def save_cleared_data(data):
    '''
    Функция для сохранение очищенных свечных данных
    :param data:
    :return:
    '''
    columns = ['time', 'open', 'high', 'low', 'close', 'volume', 'turnover']
    df = pd.DataFrame(data, columns=columns)

    for column in columns:
        if column == 'time':
            df[column] = df[column].astype(int) / 1000
        df[column] = df[column].astype(float)
    df_sorted = df.sort_values(by='time', ascending=True)
    df_sorted.to_json('./quotes/btc.json', orient='records')


temp = {'retCode': 0, 'retMsg': 'OK', 'result': {'category': 'spot', 'symbol': 'BTCUSDT', 'list': [
    ['1750782480000', '105441.5', '105441.5', '105424.1', '105441.1', '0.485354', '51170.5001479'],
    ['1750782420000', '105458', '105476.7', '105441.5', '105441.5', '4.19958', '442879.0882669'],
    ['1750782360000', '105396.1', '105458.1', '105388.7', '105458', '3.392567', '357603.2431476'],
    ['1750782300000', '105353.4', '105461.8', '105353.4', '105396.1', '16.797122', '1770883.5721816'],
    ['1750782240000', '105295.9', '105353.4', '105295.9', '105353.4', '3.0246', '318573.0622313'],
    ['1750782180000', '105332.4', '105335.7', '105280.3', '105295.9', '4.18945', '441223.6697715'],
    ['1750782120000', '105275.6', '105339.7', '105275.6', '105332.4', '4.484569', '472261.0836293'],
    ['1750782060000', '105251.4', '105275.6', '105231.3', '105275.6', '2.193287', '230840.1847624'],
    ['1750782000000', '105259.2', '105259.2', '105216.7', '105251.4', '3.372913', '354963.2620927'],
    ['1750781940000', '105285.8', '105306.7', '105244.8', '105259.2', '4.049964', '426383.4573058'],
    ['1750781880000', '105339.8', '105359.1', '105282.1', '105285.8', '5.109975', '538208.424093'],
    ['1750781820000', '105334.5', '105347.7', '105322', '105339.8', '3.929365', '413887.4555476'],
    ['1750781760000', '105307.4', '105345.4', '105301.7', '105334.5', '2.789505', '293810.6235802'],
    ['1750781700000', '105247.5', '105328.2', '105247.5', '105307.4', '3.794153', '399479.7383637'],
    ['1750781640000', '105203.8', '105249.5', '105203.8', '105247.5', '5.686123', '598318.8148012']]}, 'retExtInfo': {},
        'time': 1750782488342}

r = [
    ['1750782480000', '105441.5', '105441.5', '105424.1', '105441.1', '0.485354', '51170.5001479'],
    ['1750782420000', '105458', '105476.7', '105441.5', '105441.5', '4.19958', '442879.0882669'],
    ['1750782360000', '105396.1', '105458.1', '105388.7', '105458', '3.392567', '357603.2431476'],
    ['1750782300000', '105353.4', '105461.8', '105353.4', '105396.1', '16.797122', '1770883.5721816'],
    ['1750782240000', '105295.9', '105353.4', '105295.9', '105353.4', '3.0246', '318573.0622313'],
    ['1750782180000', '105332.4', '105335.7', '105280.3', '105295.9', '4.18945', '441223.6697715'],
    ['1750782120000', '105275.6', '105339.7', '105275.6', '105332.4', '4.484569', '472261.0836293'],
    ['1750782060000', '105251.4', '105275.6', '105231.3', '105275.6', '2.193287', '230840.1847624'],
    ['1750782000000', '105259.2', '105259.2', '105216.7', '105251.4', '3.372913', '354963.2620927'],
    ['1750781940000', '105285.8', '105306.7', '105244.8', '105259.2', '4.049964', '426383.4573058'],
    ['1750781880000', '105339.8', '105359.1', '105282.1', '105285.8', '5.109975', '538208.424093'],
    ['1750781820000', '105334.5', '105347.7', '105322', '105339.8', '3.929365', '413887.4555476'],
    ['1750781760000', '105307.4', '105345.4', '105301.7', '105334.5', '2.789505', '293810.6235802'],
    ['1750781700000', '105247.5', '105328.2', '105247.5', '105307.4', '3.794153', '399479.7383637'],
    ['1750781640000', '105203.8', '105249.5', '105203.8', '105247.5', '5.686123', '598318.8148012']]

# получчение данных котировок для BTCUSDT
# res = get_klines(
#     symbol='BTCUSDT',
#     category='spot',
#     interval=15,
#     start_date=dt(
#         year=2025,
#         month=5,
#         day=1
#     ),
#     end_date=dt.now(),
# )

# save_cleared_data(res)

'''
Получение информации об инструментах

'''
instrument_info = session.get_instruments_info(category='spot', symbol='BTCUSDT')
print(instrument_info)
