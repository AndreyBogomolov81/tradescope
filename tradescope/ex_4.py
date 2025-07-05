import json

from pybit.unified_trading import HTTP

session = HTTP()

def get_instrument():
    '''
    Функция для получения инструмента для тестирования базы данных
    :return:
    '''
    with open('./charts/data_instrument_example.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    return data[0]['result']['list'][0]

def get_instruments_info_bybit(category):
    '''
    Функция получения информации по инструментам с биржи Bybit
    :param category: spot, linear, inverse, option
    :return:
    '''
    instruments = session.get_instruments_info(
        category=category
    )['result']['list']
    for index, instrument in enumerate(instruments, 1):
        print(index, instrument)

if __name__ == '__main__':
    get_instruments_info_bybit('option')