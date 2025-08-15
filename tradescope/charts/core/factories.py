from typing import Type

from django.db import models

from .repositories import (
    InstrumentBybitRepository,
    SpotBybitInstrumentRepository, LinearBybitInstrumentRepository,
    InverseBybitInstrumentRepository, OptionBybitInstrumentRepository
)

from ..models import (
    InstrumentBybitSpot, InstrumentBybitLinear,
    InstrumentBybitInverse, InstrumentBybitOption
)

def repository_factory_for_model(model: Type):
    mapping: dict = {
        InstrumentBybitSpot: SpotBybitInstrumentRepository,
        InstrumentBybitLinear: LinearBybitInstrumentRepository,
        InstrumentBybitInverse: InverseBybitInstrumentRepository,
        InstrumentBybitOption: OptionBybitInstrumentRepository
    }
    repo_cls = mapping.get(model, InstrumentBybitRepository)
    return repo_cls(model)
