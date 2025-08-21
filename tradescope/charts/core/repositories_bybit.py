from typing import Optional

from pybit.unified_trading import HTTP

from .base_repositories import BaseInstrumentRepository
from ..models import (
    InfoBybitSpot,
    InfoBybitLinear,
    InfoBybitInverse,
    InfoBybitOptions
)
from .exceptions import InstrumentNotFoundException


class InstrumentBybitRepository(BaseInstrumentRepository):
    """Базовый репозиторий для таблиц InstrumentBybit* с удобными методами."""

    def __init__(self, model, category=None, model_info=None, **kwargs):
        super().__init__(model, model_info=model_info, **kwargs)
        self.category = category
        self.instruments_data = None

    def create_instruments_by_category(self):
        session = HTTP()
        response = session.get_instruments_info(category=self.category)
        if response and response['result']['list']:
            self.instruments_data = response['result']['list']
            for item in self.instruments_data:
                instr_data, info_data = self._split_object_by_fields(
                    item,
                    ['symbol']
                )
                instrument = self.create_instrument(**instr_data)
                info_data.update({'inst': instrument})
                self.create_info_for_instrument(**info_data)


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
