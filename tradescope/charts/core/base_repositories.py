import asyncio
from typing import Any, Iterable, Type

from channels.db import database_sync_to_async
from django.db import models, transaction

ModelType = Type[models.Model]


class BaseInstrumentRepository:
    """
    Базовый репозиторий для инструментов
    """

    def __init__(
        self, model, model_info=None, model_candle=None):
        self.model = model
        self.model_info = model_info
        self.model_candle = model_candle

    def list(self, **filters: dict[str, Any]) -> Iterable[models.Model]:
        return self.model.objects.filter(**filters)

    def addCandle(self, **data):
        return self.model_candle.objects.create(**data)

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
        return self.model_candle.objects.get_or_create(**data)

    @database_sync_to_async
    def acreate_hist_data(self, **data):
        with transaction.atomic():
            return self.model_candle.objects.create(**data)

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
        if hasattr(self.model, 'hist_data'):
            return self.model.objects.all().prefetch_related('hist_data')
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
