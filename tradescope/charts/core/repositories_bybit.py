import asyncio
import time
from datetime import datetime as dt
from typing import Optional

import aiohttp
from channels.db import database_sync_to_async
from django.db import models
from pybit.unified_trading import HTTP

from ..models import (
    HistoricalDataBybitInverse,
    HistoricalDataBybitLinear,
    HistoricalDataBybitSpot,
    InfoBybitInverse,
    InfoBybitLinear,
    InfoBybitOptions,
    InfoBybitSpot,
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
        model_historical_data=None,
        **kwargs
    ):
        super().__init__(
            model=model,
            model_info=model_info,
            model_historical_data=model_historical_data,
            **kwargs
        )

        self.category = category
        self.instruments_data = None

    def get_by_symbol(self, symbol: str) -> models.Model | None:
        try:
            return self.model.objects.get(symbol=symbol)
        except self.model.DoesNotExist as e:
            return None

    @database_sync_to_async
    def aget_by_symbol(self, symbol: str):
        return self.get_by_symbol(symbol)

    def create_instruments_by_category(self):
        session = HTTP()
        response = session.get_instruments_info(category=self.category)
        if response and response["result"]["list"]:
            self.instruments_data = response["result"]["list"]
            for item in self.instruments_data:
                instr_data, info_data = self._split_object_by_fields(item, ["symbol"])
                instrument = self.create_instrument(**instr_data)
                info_data.update({"inst": instrument})
                self.create_info_for_instrument(**info_data)

    async def fetch(self, session, url):
        async with session.get(url) as response:
            return (
                await response.json()
            )  # или response.text(), в зависимости от формата данных

    async def get_candles_from_exchange(
        self, symbol, category, start_date=None, end_date=None, interval="15"
    ):
        """
        Метод для получения исторических данных с биржи bybit
        :param symbol:
        :param category:
        :param start_date:
        :param end_date:
        :param interval:
        :return:
        """

        if start_date and end_date:
            start_date = dt.strptime(start_date, "%d.%m.%Y")

            end_date = dt.strptime(end_date, "%d.%m.%Y")
        else:
            start_date = dt(year=2024, month=1, day=1)
            end_date = dt.now()

        url = (
            "https://api.bybit.com/v5/market/kline"
            "?category={category}&symbol={symbol}&interval={interval}"
            "&start={start}&end={end}&limit={limit}"
        )

        intervals = self.get_intervals_for_klines_query(
            start_date=start_date, end_date=end_date, interval=int(interval)
        )
        # Создаем сессию один раз
        async with aiohttp.ClientSession() as session:
            # Запускаем несколько задач
            tasks = []
            for t in intervals:  # замените на нужное число
                tasks.append(
                    asyncio.create_task(
                        self.fetch(
                            session,
                            url.format(
                                category=category,
                                symbol=symbol,
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

    def download_hist_data(self, symbol, interval, array):
        try:
            instrument = self.get_by_symbol(symbol=symbol)

            for i in array:
                r = self._get_arr_hist_data(
                    i["result"]["list"], inst=instrument, interval=interval
                )
                self.create_hist_data_many(r)

        except BaseException as e:
            print(str(e))

    async def adownload_hist_data(self, **data):
        start: float = time.time()

        results = await self.get_candles_from_exchange(**data)
        print("data recieved, time {:.4}".format(time.time() - start))
        instrument = await self.aget_by_symbol(symbol=data.get("symbol"))
        common_l = []
        for i in results:
            r = self._get_arr_hist_data(
                i["result"]["list"], inst=instrument, interval=data.get("interval")
            )
            common_l.append(r)
        print("data is ready to be written, time {:.4}".format(time.time() - start))
        task = []
        for item in common_l:
            task.append(asyncio.create_task(self.acreate_hist_data_many(item)))

        await asyncio.gather(*task)
        print("data recorded, time {:.4}".format(time.time() - start))
        return 0

    def _get_arr_hist_data(self, arr: list, inst, interval) -> list:
        res = []
        _fields = [
            "startTime",
            "openPrice",
            "highPrice",
            "lowPrice",
            "closePrice",
            "volume",
            "turnover",
        ]
        for i in arr:
            d = {
                k: (float(v) * 0.001 if k == "startTime" else float(v))
                for k, v in zip(_fields, i)
            }
            d.update({"inst": inst, "interval": interval})
            res.append(d)

        return res


# Можно определить специальные репозитории, если потребуется логика per-model:
class SpotBybitInstrumentRepository(InstrumentBybitRepository):
    def __init__(self, model, **kwargs):
        self.category = "spot"
        self.model_info = InfoBybitSpot
        self.model_historical_data = HistoricalDataBybitSpot
        super().__init__(
            model,
            category=self.category,
            model_info=self.model_info,
            model_historical_data=self.model_historical_data,
            **kwargs
        )


class LinearBybitInstrumentRepository(InstrumentBybitRepository):
    def __init__(self, model, **kwargs):
        self.category = "linear"
        self.model_info = InfoBybitLinear
        self.model_historical_data = HistoricalDataBybitLinear
        super().__init__(
            model,
            category=self.category,
            model_info=self.model_info,
            model_historical_data=self.model_historical_data,
            **kwargs
        )


class InverseBybitInstrumentRepository(InstrumentBybitRepository):
    def __init__(self, model, **kwargs):
        self.category = "inverse"
        self.model_info = InfoBybitInverse
        self.model_historical_data = HistoricalDataBybitInverse
        super().__init__(
            model,
            category=self.category,
            model_info=self.model_info,
            model_historical_data=self.model_historical_data,
            **kwargs
        )


class OptionBybitInstrumentRepository(InstrumentBybitRepository):
    def __init__(self, model, **kwargs):
        self.category = "option"
        self.model_info = InfoBybitOptions
        self.model_historical_data = None
        super().__init__(
            model,
            category=self.category,
            model_info=self.model_info,
            model_historical_data=self.model_historical_data,
            **kwargs
        )
