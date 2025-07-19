import os
import pandas as pd

from charts.models import HistoricalDataByBitLinear

#TODO:
'''
для перебора данных можно использовать следующее

1 перебрать все файлы, сохраненные в БД (в данном примере открыть те файлы что сохранены в папке medias/coin...
2 создать на основе их датафрейм общий
3 преобразовать его с интервалом 1ч, ....
4 вывести результат
'''

file_path = os.path.join(
    os.path.curdir,
    'media',
    'historical_data_bybit',
    'coin_linear_BTCUSDT',
    'BTCUSDT_1704068100_1704877200.json'
)

# прочитаем json file
def get_all_klines_for_instrument(queryset, interval: str):
    '''
    Функция загрузки всех имеющихся данных для графика
    :param queryset:
    :param interval:
    :return:
    '''
    # объединяем в общий датафрейм все данные
    df_total = pd.concat(
        [pd.read_json(f.data.path) for f in queryset],
        axis=0,
        ignore_index=True
    ).sort_values(by='time')

    # преобразуем числа в столбце time в дату и индексируем
    df_total['time'] = pd.to_datetime(df_total['time'], unit='s')
    df_total.set_index('time', inplace=True)

    # # агрегируем данные по заданному интервалу
    df_hour = df_total.resample('4h').agg(
        {
            'open': 'first',
            'close': 'last',
            'high': 'max',
            'low': 'min',
            'volume': 'sum'
        }
    )

    # сбрасываем индекс для созданного объекта
    df_hour = df_hour.reset_index()

    # преобразуем формат столбца time
    df_hour['time'] = df_hour['time'].astype(np.int64)
    df_hour['time'] = df_hour['time'].apply(lambda x: int(str(x)[:10]))

    # возвращаем словарь
    return df_hour.to_dict(orient='records')

