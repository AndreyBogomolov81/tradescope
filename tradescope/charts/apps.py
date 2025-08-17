from django.apps import AppConfig


class ChartsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'charts'

    def ready(self):
        # импорт внутри чтобы избежать проблем с миграциями
        from .core import Registry, DataFacade
        from .core import repository_factory_for_model
        from .models import (
            InstrumentBybitSpot, InstrumentBybitLinear,
            InstrumentBybitInverse, InstrumentBybitOption,
            InstrumentOKXSpot, InstrumentOKXMargin,
            InstrumentOKXSwap, InstrumentOKXFutures
        )

        # создаем регистратор
        registry = Registry()
        facade = DataFacade(registry)

        facade.register_model('spot_bybit', InstrumentBybitSpot)
        facade.register_model('linear_bybit', InstrumentBybitLinear)
        facade.register_model('inverse_bybit', InstrumentBybitInverse)
        facade.register_model('option_bybit', InstrumentBybitOption)
        facade.register_model('spot_okx', InstrumentOKXSpot)
        facade.register_model('margin_okx', InstrumentOKXMargin)
        facade.register_model('swap_okx', InstrumentOKXSwap)
        facade.register_model('futures_okx', InstrumentOKXFutures)

        from . import core as _core_package
        # созданные объекты прикрепляются в виде атрибутов к core
        _core_package.registry = registry
        _core_package.facade = facade

