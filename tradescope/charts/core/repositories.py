from typing import Optional

from pybit.unified_trading import HTTP

from .base_repositories import BaseRepository
from ..models import (
    InstrumentBybitSpot,
    InstrumentBybitLinear,
    InstrumentBybitInverse,
    InstrumentBybitOption,
    InfoBybitSpot,
    InfoBybitLinear,
    InfoBybitInverse,
    InfoBybitOptions
)
from .exceptions import InstrumentNotFoundException


class InstrumentBybitRepository(BaseRepository):
    """Базовый репозиторий для таблиц InstrumentBybit* с удобными методами."""
    def __init__(self, model, category=None, model_info=None, **kwargs):
        super().__init__(model, **kwargs)
        self.category = category
        self.model_info = model_info
        self.instruments_data = None

    def get_by_symbol(self, symbol: str):
        return self.get_by(symbol=symbol)

    def exists_symbol(self, symbol: str) -> bool:
        return self.model.objects.filter(symbol=symbol).exists()

    def split_object_by_fields(
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

    def get_data_from_exchange(self):
        session = HTTP()
        response = session.get_instruments_info(category=self.category)
        if response and response['result']['list']:
            self.instruments_data = response['result']['list']
            return
        raise InstrumentNotFoundException('No data for the given category')

    def create_instrument(self):
        self.get_data_from_exchange()
        if self.instruments_data:
            for item in self.instruments_data:
                instr_data, info_data = self.split_object_by_fields(item, ['symbol'])
                instrument = self.model.objects.create(**instr_data)
                info_data.update({'inst': instrument})
                self.model_info.objects.create(**info_data)


# Можно определить специальные репозитории, если потребуется логика per-model:
class SpotBybitInstrumentRepository(InstrumentBybitRepository):
    def __init__(self, model, **kwargs):
        self.category = 'spot'
        self.model_info = InfoBybitSpot
        super().__init__(
            model,
            category=self.category,
            model_info=self.model_info,
            **kwargs
        )


class LinearBybitInstrumentRepository(InstrumentBybitRepository):
    def __init__(self, model, **kwargs):
        self.category = 'linear'
        self.model_info = InfoBybitLinear
        super().__init__(
            model,
            category=self.category,
            model_info=self.model_info,
            **kwargs
        )


class InverseBybitInstrumentRepository(InstrumentBybitRepository):
    def __init__(self, model, **kwargs):
        self.category = 'inverse'
        self.model_info = InfoBybitInverse
        super().__init__(
            model,
            category=self.category,
            model_info=self.model_info,
            **kwargs
        )


class OptionBybitInstrumentRepository(InstrumentBybitRepository):
    def __init__(self, model, **kwargs):
        self.category = 'option'
        self.model_info = InfoBybitOptions
        super().__init__(
            model,
            category=self.category,
            model_info=self.model_info,
            **kwargs
        )

