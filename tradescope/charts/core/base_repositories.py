import asyncio
from datetime import datetime as dt
from typing import Any, Iterable, List, Type

from channels.db import database_sync_to_async
from django.db import models, transaction

ModelType = Type[models.Model]


class BaseInstrumentRepository:
    """
    Базовый репозиторий для инструментов
    """

    def __init__(
        self, model: ModelType, model_info=None, model_historical_data=None, **kwargs
    ):
        self.model = model
        self.model_info = model_info
        self.model_historical_data = model_historical_data

    def list(self, **filters: dict[str, Any]) -> Iterable[models.Model]:
        return self.model.objects.filter(**filters)

    def get(self, pk: Any) -> models.Model | None:
        try:
            return self.model.objects.get(pk=pk)
        except self.model.DoesNotExist as e:
            return None

    def get_by(self, **filters) -> models.Model | None:
        try:
            return self.model.objects.get(**filters)
        except self.model.DoesNotExist as e:
            return None

    def create_hist_data_many(self, arr):
        for item in arr:
            self.create_hist_data(**item)

    def create_hist_data(self, **data):
        return self.model_historical_data.objects.get_or_create(**data)

    @database_sync_to_async
    def acreate_hist_data(self, **data):
        with transaction.atomic():
            return self.model_historical_data.objects.create(**data)

    async def acreate_hist_data_many(self, arr):
        sem = asyncio.Semaphore(10000)

        async def save_row(**data):
            async with sem:
                return await self.acreate_hist_data(**data)

        task = []
        for d in arr:
            task.append(asyncio.create_task(save_row(**d)))

        await asyncio.gather(*task)

    def get_all_instruments(self):
        return self.model.objects.all()

    def create_instrument(self, **instr_data) -> models.Model:
        return self.model.objects.create(**instr_data)

    def create_info_for_instrument(self, **info_data):
        return self.model_info.objects.create(**info_data)

    def update(self, pk: Any, **data):
        obj = self.get(pk)
        for k, v in data.items():
            setattr(obj, k, v)
        obj.save()
        return obj

    def delete(self, pk: Any):
        self.model.objects.filter(pk=pk).delete()

    def _split_object_by_fields(self, data: dict, fields: list) -> tuple[dict, dict]:
        """
        метод для разбиения словаря на два отдельных по
        """
        instr_data = {k: v for k, v in data.items() if k in fields}
        info_data = {k: v for k, v in data.items() if k not in fields}

        return instr_data, info_data

    def get_intervals_for_klines_query(
        self, start_date, end_date, interval=15
    ) -> List[dict]:
        """
        Функция получения списка временных интервалов для запроса свечей с биржи ByBit
        :param start_date: стартовая дата
        :param end_date: конечная дата
        :param interval: таймфрейм в минутах
        :return:
        """
        interval_sec = interval * 60
        m = end_date.minute
        m -= m % interval
        end_date = dt(
            year=end_date.year,
            month=end_date.month,
            day=end_date.day,
            hour=end_date.hour,
            minute=m,
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
                ls.append({"start": st, "end": ed, "limit": count})
                count = 1
            else:
                count += 1
        else:
            if count > 1:
                ls.append({"start": st, "end": ed, "limit": count - 1})
        return ls
