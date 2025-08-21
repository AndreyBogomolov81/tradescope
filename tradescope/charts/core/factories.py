from typing import Type

from django.db import models

from .repositories_bybit import (
    SpotBybitInstrumentRepository, LinearBybitInstrumentRepository,
    InverseBybitInstrumentRepository, OptionBybitInstrumentRepository,
)

from .repositories_okx import (
    SpotOKXInstrumentRepository, MarginOKXInstrumentRepository,
    SwapOKXInstrumentRepository, FuturesOKXInstrumentRepository
)

from ..models import (
    InstrumentBybitSpot, InstrumentBybitLinear,
    InstrumentBybitInverse, InstrumentBybitOption,
    InstrumentOKXSpot, InstrumentOKXMargin,
    InstrumentOKXSwap, InstrumentOKXFutures
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
        InstrumentOKXFutures: FuturesOKXInstrumentRepository
    }
    repo_cls = mapping.get(model)
    return repo_cls(model)
