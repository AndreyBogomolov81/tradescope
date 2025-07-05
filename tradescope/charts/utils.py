import asyncio
import aiohttp
from datetime import datetime as dt
from typing import List
import pandas as pd

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


async def fetch(session, url):
    async with session.get(url) as response:
        return await response.json()  # или response.text(), в зависимости от формата данных


async def get_klines(symbol, category, start_date, end_date, interval='15'):
    url = ('https://api.bybit.com/v5/market/kline'
           '?category={category}&symbol={symbol}&interval={interval}'
           '&start={start}&end={end}&limit={limit}')
    tasks = []

    intervals = get_intervals_for_klines_query(
        start_date=start_date,
        end_date=end_date
    )

    # Создаем сессию один раз
    async with aiohttp.ClientSession() as session:
        # Запускаем несколько задач
        for t in intervals:  # замените на нужное число
            tasks.append(fetch(session, url.format(
                category=category,
                symbol=symbol,
                interval=interval,
                limit=t['limit'],
                start=str(t['start'] * 1000),
                end=str(t['end'] * 1000)
            )))

        # Выполняем все запросы параллельно и собираем результаты
        results = await asyncio.gather(*tasks)

    # results — список результатов каждого запроса

    return results

def get_cleared_dataset(data) -> tuple:
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

    start = int(df_sorted['time'].iloc[0])
    end = int(df_sorted['time'].iloc[-1])

    return start, end, df_sorted.to_json(orient='records')

