from datetime import timedelta
from datetime import datetime as dt
from typing import List


def round_to_nearest(d, interval):
    '''
    Функция округления времени по интервалу
    время выдается минус три часа от московского
    :param d:
    :param interval:
    :return:
    '''
    return d - (d - dt.min) % timedelta(minutes=int(interval))


def get_intervals_for_klines_query(
        start_date, end_date, interval=15
) -> List[dict]:
    """
    Функция получения списка временных интервалов для запроса свечей с биржи ByBit
    :param start_date: стартовая дата
    :param end_date: конечная дата
    :param interval: таймфрейм в минутах
    :return:
    """
    print('стартовая дата внутри get_intervals:', start_date, start_date.timestamp())
    print('конечная дата внутри get_intervals:', end_date, end_date.timestamp())
    interval_sec = interval * 60
    start = int(dt.timestamp(start_date))
    end = int(dt.timestamp(end_date))

    # получить непрерывный список timestamp для интервала
    times = (i for i in range(start, end + interval_sec, interval_sec))

    ls = []
    count = 1
    st = 0
    ed = 0
    for v in times:
        ed = v
        if count == 1:
            st = v
        if count == 900:
            ls.append({"start": st, "end": ed, "limit": count})
            count = 1
        else:
            count += 1
    else:
        if count > 1:
            ls.append({"start": st, "end": ed, "limit": count - 1})
    return ls


def split_object_by_fields(data: dict, fields: list) -> tuple[dict, dict]:
    """
    метод для разбиения словаря на два отдельных по
    """
    instr_data = {k: v for k, v in data.items() if k in fields}
    info_data = {k: v for k, v in data.items() if k not in fields}

    return instr_data, info_data


def t_1(start, end, interval):
    '''
    1 Если start == end функция должна вернуть список с одним словарем
    пример:
    s = dt(year=2025, month=8, day=28, hour=0, minute=0)
    e = dt(year=2025, month=8, day=28, hour=0, minute=0)

    [{'start': 1756328400, 'end': 1756328400, 'limit': 1}]
    подразумевается что будет запрашиваться одна свечка с временной меткой указанной в словаре
    при этом если limit = 1, то s - e = 0, если s - e = 900, тогда limit = 2

    таким образом справедливо d = (limit - 1) * interval * 60

    д
    :param start:
    :param end:
    :return:
    '''
    start = round_to_nearest(start, 720)
    end = round_to_nearest(end, 720)

    # считываем сумму всех limit
    _s = 0
    res = get_intervals_for_klines_query(
        start, end, interval
    )
    print(res)
    for i in res:
        _s += i['limit']

    _t: timedelta = end - start

    return (_s - 1) * 60 * interval == int(_t.total_seconds())


if __name__ == '__main__':
    s = dt(year=2024, month=1, day=1, hour=0, minute=0)
    e = dt(year=2025, month=8, day=28, hour=0, minute=30)
    intervals = [
        '1', '3', '5', '15', '30', '60', '120',
        '240', '360', '720'
    ]
    for t in intervals:
        # проверка 1
        result = t_1(s, e, int(t))
        print(result)

