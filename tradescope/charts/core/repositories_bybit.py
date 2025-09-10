import asyncio
import time
from datetime import datetime as dt
from typing import List, Optional

import aiohttp
import pandas as pd
from channels.db import database_sync_to_async
from django.core.files.base import ContentFile
from django.db import models
from django.db.models import Max, Min, Model
from pybit.unified_trading import HTTP

from ..models import (
    CandleBybitInverse,
    CandleBybitLinear,
    CandleBybitSpot,
    HistoricalDataBybitInverse,
    HistoricalDataBybitLinear,
    HistoricalDataBybitSpot,
    InfoBybitInverse,
    InfoBybitLinear,
    InfoBybitOptions,
    InfoBybitSpot,
)
from ..utils import (
    get_intervals_for_klines_query,
    round_to_nearest,
    split_object_by_fields,
    split_df_to_dict
)
from .base_repositories import BaseInstrumentRepository
from .exceptions import InstrumentNotFoundException


class InstrumentBybitRepository(BaseInstrumentRepository):
    """Базовый репозиторий для таблиц InstrumentBybit* с удобными методами."""

    def __init__(
            self,
            model,
            category=None,
            model_info=None,
            model_candle=None,
            model_hist_data=None,
            **kwargs,
    ):
        super().__init__(
            model=model, model_info=model_info,
            model_candle=model_candle, **kwargs
        )
        self.model_hist_data = model_hist_data
        self.category = category
        self._instruments_data = None
        self._current_symbol = None
        self._current_instrument = None
        self._current_start_date = None
        self._current_end_date = None
        self._intervals = None

    def _set_intervals(self):
        intervals = [
            "1", "3", "5", "15", "30",
            "60", "120", "240", "360", "720"
        ]
        self._intervals = {
            i: self._get_intervals_for_instrument(i) for i in intervals
        }

    def _set_instrument(self, symbol):
        instrument = self.get_by_symbol(symbol)
        if not instrument:
            raise Exception(f"The {symbol} does not exist")

        self._current_instrument = instrument
        self._current_symbol = symbol

    def get_by_symbol(self, symbol: str) -> models.Model | None:
        """
        Метод получение инструмента по символу, находится в этом классе
        так как параметр symbol относится только к инструменту bybit
        :param symbol:
        :return:
        """
        try:
            return self.model.objects.get(symbol=symbol)
        except self.model.DoesNotExist as e:
            return None

    @database_sync_to_async
    def aget_by_symbol(self, symbol: str):
        return self.get_by_symbol(symbol)

    def create_instruments_by_category(self):
        """
        Метод добавления инструментов в базу данных
        :return:
        """
        session = HTTP()
        response = session.get_instruments_info(category=self.category)
        if response and response["result"]["list"]:
            self._instruments_data = response["result"]["list"]
            for item in self._instruments_data:
                instr_data, info_data = split_object_by_fields(
                    item, ["symbol"]
                )
                instrument = self.create_instrument(**instr_data)
                info_data.update({"inst": instrument})
                self.create_info_for_instrument(**info_data)

    async def _fetch(self, session, url):
        """
        Метод для создания сессии асинхронных запросов к бирже по url
        :param session:
        :param url:
        :return:
        """
        async with session.get(url) as response:
            return (
                await response.json()
            )  # или response.text(), в зависимости от формата данных

    async def _get_candles_from_exchange(
            self, interval: str, intervals_list: list
    ) -> List[dict]:
        '''
        Метод для получения исторических данных с биржи bybit
        :param interval: 
        :param intervals_list:
        :return:
        '''

        url = (
            "https://api.bybit.com/v5/market/kline"
            "?category={category}&symbol={symbol}&interval={interval}"
            "&start={start}&end={end}&limit={limit}"
        )

        # Создаем сессию один раз
        async with aiohttp.ClientSession() as session:
            # Запускаем несколько задач
            tasks = []
            for t in intervals_list:  # замените на нужное число
                tasks.append(
                    asyncio.create_task(
                        self._fetch(
                            session,
                            url.format(
                                category=self.category,
                                symbol=self._current_symbol,
                                interval=interval,
                                limit=t["limit"],
                                start=str(t["start"] * 1000),
                                end=str(t["end"] * 1000),
                            ),
                        )
                    )
                )

            # Выполняем все запросы параллельно и собираем результаты
            results = await asyncio.gather(*tasks)
            # results — список результатов каждого запроса

        return results

    async def _get_candles_for_all_intervals(self):
        results = {}
        for k, v in self._intervals.items():
            results[k] = await asyncio.create_task(
                self._get_candles_from_exchange(
                    interval=k,
                    intervals_list=v
                )
            )
        return results

    def _get_cleaned_dataset(self, data):
        """
        Функция для подготовки данных через dataset
        :param data:
        :return:
        """

        columns = [
            "time", "open", "high", "low", "close", "volume", "turnover"
        ]
        df = pd.DataFrame(data, columns=columns)

        for column in columns:
            if column == "time":
                df[column] = df[column].astype(float) / 1000
            df[column] = df[column].astype(float)
        df_sorted = df.sort_values(by="time", ascending=True)

        return df_sorted

    def _download_hist_data(
            self,
            interval,
            array,
    ):
        """
        Метод только сохраняет уже полученные данные и перезаписывает начальную и конечную свечки
        начальная свечка записывается если до этого не было записей в БД
        """
        try:
            # получить стартовую и конечные дату предудущих записей
            common_l = []
            for item in array:
                cleaned_data = self._get_cleaned_dataset(
                    item["result"]["list"]
                )
                start = cleaned_data.iloc[0].to_dict()
                end = cleaned_data.iloc[-1].to_dict()
                l = len(cleaned_data)

                # СОЗДАЕМ ФАЙЛ
                file_name = "{symbol}_{start}_{end}_{interval}.json".format(
                    symbol=self._current_symbol,
                    start=int(start["time"]),
                    end=int(end["time"]),
                    interval=interval,
                )
                hd = self.model_hist_data(
                    inst=self._current_instrument,
                    start_date=start.get("time"),
                    end_date=end.get("time"),
                    interval=interval,
                    total_count=l,
                )
                # конетнт ввиде довичных данных
                d = cleaned_data.copy()
                content = ContentFile(d.to_json(orient="records"), name=file_name)
                hd.data.save(file_name, content)

                common_l.extend(cleaned_data.to_dict(orient="records"))
            result = sorted(common_l, key=lambda x: x["time"])
            return result

        except BaseException as e:
            print(str(e))

    def _get_intervals_for_instrument(self, interval) -> list:
        '''
        Метод для получения списка доступных интервалов для
        инструмента по определенному периоду (интервалу)

        :param interval: интервал в минутах
        :return:
        '''

        # округляем по старшему интервалу для того чтобы по всем
        # таймфреймам стартовая и конечная даты совпадали
        start_date = round_to_nearest(self._current_start_date, "720")
        end_date = round_to_nearest(self._current_end_date, "720")
        # список для хранения всех интервалов
        all_periods = []

        # проверяем есть ли исторические записи для конкретного инструмента
        hd = self._current_instrument.hist_data.filter(interval=interval)
        if hd.exists():
            # если данные есть то сравниваем значения начальной и конечной даты
            # Получаем дату начальной свечи в timestamp
            existing_start_date = hd.aggregate(min_date=Min("start_date"))[
                "min_date"
            ]

            # если новая стартовая дата меньше чем сохраненная стартовая то получаем список дат
            if start_date.timestamp() < existing_start_date:
                res = get_intervals_for_klines_query(
                    start_date,
                    dt.fromtimestamp(
                        existing_start_date - int(interval) * 60
                    ),
                    int(interval),
                )
                all_periods.extend(res)

            # получвем метку времени для последней свечи в timestamp
            existing_end_data = hd.aggregate(
                max_date=Max("end_date")
            )["max_date"]

            # если новая конечная дата больше чем сохраненная то получаем списко дат
            if end_date.timestamp() > existing_end_data:
                res = get_intervals_for_klines_query(
                    dt.fromtimestamp(
                        existing_end_data + int(interval) * 60
                    ),
                    end_date,
                    int(interval),
                )
                all_periods.extend(res)

        else:
            all_periods = get_intervals_for_klines_query(
                start_date, end_date, int(interval)
            )
        return all_periods

    def create_or_update_hist_data(
            self,
            symbol,
            start_date,
            end_date
    ):
        '''
        Метод для обновления исторических данных для выбранного инструмента
        :param symbol:
        :param start_date:
        :param end_date:
        :return:
        '''
        try:
            self._set_instrument(symbol)
            self._current_start_date = start_date
            self._current_end_date = end_date
            self._set_intervals()

            result = asyncio.run(self._get_candles_for_all_intervals())
            for k, v in result.items():
                self._download_hist_data(
                    interval=k,
                    array=v
                )

        except Exception as e:
            pass

    def get_candles(self, symbol, interval):
        '''
        Метод для получения свечных данных по инструменту
        :param symbol:
        :param interval:
        :return:
        '''
        try:
            self._set_instrument(symbol)
            hd = self._current_instrument.hist_data.filter(interval=interval)
            if hd.exists():
                df_total = pd.concat(
                    [pd.read_json(f.data.path) for f in hd],
                    axis=0,
                    ignore_index=True
                ).sort_values(by='time')
                max_value = df_total['high'].max()
                res = split_df_to_dict(
                    df_total[['time', 'open', 'high', 'low', 'close', 'volume']],
                    1000
                )[:: -1]
                return max_value, res
            return []
        except Exception as e:
            pass


def test_result1(array):
    # все кроме первого из вложенных списков должны иметь по 1000 элементов
    for i, v in enumerate(array, 1):
        print(i, len(v))


def test_result2(array):
    # все эхлементы в вложенном списке должны быть отсортированы по возратсанию
    for i, v in enumerate(array, 1):
        print(i, v[0]['time'] < v[-1]['time'])


def test_result3(array):
    # последний элемент первого вложенного списка должен иметь самую большую дату
    # первый элемент последнего вложенного списка должен иметь самую раннюю дату
    max_e = array[0][-1]['time']
    min_e = array[-1][0]['time']
    common_l = []
    for i in array:
        common_l.extend(i)

    for i in common_l:
        if ((i['time'] != max_e and i['time'] >= max_e)
                or (i['time'] != min_e and i['time'] <= min_e)):
            print(False)
            break
    else:
        print(True)


# Можно определить специальные репозитории, если потребуется логика per-model:
class SpotBybitInstrumentRepository(InstrumentBybitRepository):
    def __init__(self, model, **kwargs):
        self.category = "spot"
        self.model_info = InfoBybitSpot
        self.model_candle = CandleBybitSpot
        self.model_hist_data = HistoricalDataBybitSpot
        super().__init__(
            model,
            category=self.category,
            model_info=self.model_info,
            model_candle=self.model_candle,
            model_hist_data=self.model_hist_data,
            **kwargs,
        )


class LinearBybitInstrumentRepository(InstrumentBybitRepository):
    def __init__(self, model, **kwargs):
        self.category = "linear"
        self.model_info = InfoBybitLinear
        self.model_candle = CandleBybitLinear
        self.model_hist_data = HistoricalDataBybitLinear
        super().__init__(
            model,
            category=self.category,
            model_info=self.model_info,
            model_candle=self.model_candle,
            model_hist_data=self.model_hist_data,
            **kwargs,
        )


class InverseBybitInstrumentRepository(InstrumentBybitRepository):
    def __init__(self, model, **kwargs):
        self.category = "inverse"
        self.model_info = InfoBybitInverse
        self.model_candle = CandleBybitInverse
        self.model_hist_data = HistoricalDataBybitInverse
        super().__init__(
            model,
            category=self.category,
            model_info=self.model_info,
            model_candle=self.model_candle,
            model_hist_data=self.model_hist_data,
            **kwargs,
        )


class OptionBybitInstrumentRepository(InstrumentBybitRepository):
    def __init__(self, model, **kwargs):
        self.category = "option"
        self.model_info = InfoBybitOptions
        self.model_candle = None
        super().__init__(
            model,
            category=self.category,
            model_info=self.model_info,
            model_candle=self.model_candle,
            **kwargs,
        )
