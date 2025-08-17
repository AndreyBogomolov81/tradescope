import okx.PublicData as PublicData

from .base_repositories import BaseInstrumentRepository
from ..models import (
    InfoOKXSpot,
    InfoOKXMargin,
    InfoOKXSwap,
    InfoOKXFutures
)
from .exceptions import InstrumentNotFoundException


class InstrumentOKXRepository(BaseInstrumentRepository):
    """Базовый репозиторий для таблиц InstrumentBybit* с удобными методами."""

    def __init__(self, model, category=None, model_info=None, **kwargs):
        super().__init__(model, model_info=model_info, **kwargs)
        self.category = category
        self.instruments_data = None

    def create_instruments_by_category(self):
        flag = '0'
        publicDataAPI = PublicData.PublicAPI(flag=flag)
        if self.category in ('SPOT', 'MARGIN', 'SWAP'):
            response = publicDataAPI.get_instruments(
                instType=self.category
            )
            if response and response['data']:
                self.instruments_data = response['data']
                self.add_instruments_to_db()

        else:
            families = ['BTC-USDT', 'ETH-USDT']
            for f in families:
                response = publicDataAPI.get_instruments(
                    instType=self.category,
                    instFamily=f
                )
                if response and response['data']:
                    self.instruments_data = response['data']
                    self.add_instruments_to_db()

    def add_instruments_to_db(self):
        if self.instruments_data:
            for item in self.instruments_data:
                instr_data, info_data = self._split_object_by_fields(
                    item,
                    ['instId']
                )
                instrument = self.create_instrument(**instr_data)
                info_data.update({'inst': instrument})
                self.create_info_for_instrument(**info_data)


class SpotOKXInstrumentRepository(InstrumentOKXRepository):
    def __init__(self, model, **kwargs):
        self.category = 'SPOT'
        self.model_info = InfoOKXSpot
        super().__init__(
            model,
            category=self.category,
            model_info=self.model_info,
            **kwargs
        )


class MarginOKXInstrumentRepository(InstrumentOKXRepository):
    def __init__(self, model, **kwargs):
        self.category = 'MARGIN'
        self.model_info = InfoOKXMargin
        super().__init__(
            model,
            category=self.category,
            model_info=self.model_info,
            **kwargs
        )


class SwapOKXInstrumentRepository(InstrumentOKXRepository):
    def __init__(self, model, **kwargs):
        self.category = 'SWAP'
        self.model_info = InfoOKXSwap
        super().__init__(
            model,
            category=self.category,
            model_info=self.model_info,
            **kwargs
        )


class FuturesOKXInstrumentRepository(InstrumentOKXRepository):
    def __init__(self, model, **kwargs):
        self.category = 'FUTURES'
        self.model_info = InfoOKXFutures
        super().__init__(
            model,
            category=self.category,
            model_info=self.model_info,
            **kwargs
        )
