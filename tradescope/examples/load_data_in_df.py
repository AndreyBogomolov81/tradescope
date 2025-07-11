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



def main():
    '''
    пример получения и преобразования по таймфрему
    :return:
    '''
    f = HistoricalDataByBitLinear.objects.all()[0]
    data = pd.read_json(f.data.path)
    temp = data[:8]
    temp.loc[:, 'time'] = pd.to_datetime(temp['time'], unit='s')
    temp.set_index('time', inplace=True) # обязательно
    print(temp)
    df_hour = temp.resample('1h').agg({
        'open': 'first',
        'close': 'last',
        'high': 'max',
        'low': 'min',
        'volume': 'sum'})
    # преобразование времени в секндах в время пандас#
    #  pd.to_datetime(data['time'], unit='s')

