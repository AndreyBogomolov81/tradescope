from typing import Type, Any, Iterable
from django.db import models

ModelType = Type[models.Model]


class BaseInstrumentRepository:
    '''
    Базовый репозиторий для инструментов
    '''

    def __init__(self, model: ModelType, model_info=None, **kwargs):
        self.model = model
        self.model_info = model_info

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

    def _split_object_by_fields(
            self, data: dict, fields: list
    ) -> tuple[dict, dict]:
        '''
        метод для разбиения словаря на два отдельных по
        '''
        instr_data = {
            k: v for k, v in data.items()
            if k in fields
        }
        info_data = {
            k: v for k, v in data.items()
            if k not in fields
        }

        return instr_data, info_data
