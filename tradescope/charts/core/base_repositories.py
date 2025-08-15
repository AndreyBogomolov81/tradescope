from typing import Type, Any, Iterable
from django.db import models

ModelType = Type[models.Model]

class BaseRepository:
    '''
    Базовый репозиторий
    '''

    def __init__(self, model: ModelType, **kwargs):
        self.model = model
        self.data_from_exchange = None

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

    def create(self, **data) -> models.Model:
        return self.objects.create(**data)

    def update(self, pk: Any, **data):
        obj = self.get(pk)
        for k, v in data.items():
            setattr(obj, k, v)
        obj.save()
        return obj

    def delete(self, pk: Any):
        self.model.objects.filter(pk=pk).delete()
