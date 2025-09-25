from typing import Type

from django.db import models

from ..models import (
    InstrumentBybitInverse,
    InstrumentBybitLinear,
    InstrumentBybitOption,
    InstrumentBybitSpot,
    InstrumentOKXFutures,
    InstrumentOKXMargin,
    InstrumentOKXSpot,
    InstrumentOKXSwap,
)
from .repositories_bybit import (
    InverseBybitInstrumentRepository,
    LinearBybitInstrumentRepository,
    OptionBybitInstrumentRepository,
    SpotBybitInstrumentRepository,
)
from .repositories_okx import (
    FuturesOKXInstrumentRepository,
    MarginOKXInstrumentRepository,
    SpotOKXInstrumentRepository,
    SwapOKXInstrumentRepository,
)


def repository_factory_for_model(model: Type):
    mapping: dict = {
        InstrumentBybitSpot: SpotBybitInstrumentRepository,
        InstrumentBybitLinear: LinearBybitInstrumentRepository,
        InstrumentBybitInverse: InverseBybitInstrumentRepository,
        InstrumentBybitOption: OptionBybitInstrumentRepository,
        InstrumentOKXSpot: SpotOKXInstrumentRepository,
        InstrumentOKXMargin: MarginOKXInstrumentRepository,
        InstrumentOKXSwap: SwapOKXInstrumentRepository,
        InstrumentOKXFutures: FuturesOKXInstrumentRepository,
    }
    repo_cls = mapping.get(model)
    return repo_cls(model)
