from datetime import datetime as dt
import asyncio

from django.db import models
from pybit.exceptions import InvalidRequestError
from pybit.unified_trading import HTTP
from django.core.files.base import ContentFile

from charts.utils import get_klines, get_cleared_dataset


# TODO: переписать модели с использованием подхода наследования
class InfoBybitMixin(models.Model):
    class Meta:
        abstract = True

    baseCoin = models.CharField(max_length=50)
    quoteCoin = models.CharField(max_length=50)
    status = models.CharField(max_length=50)

    lotSizeFilter = models.JSONField()
    priceFilter = models.JSONField()


class InfoBybitBaseDerivativeMixin(models.Model):
    class Meta:
        abstract = True

    settleCoin = models.CharField(max_length=50)
    launchTime = models.CharField(max_length=50)
    deliveryTime = models.CharField(max_length=50, blank=True)
    deliveryFeeRate = models.CharField(max_length=50)
    displayName = models.CharField(max_length=50, null=True, blank=True)


class InfoBybitFuturesMixin(models.Model):
    class Meta:
        abstract = True

    contractType = models.CharField(max_length=100)
    priceScale = models.CharField(max_length=50)
    unifiedMarginTrade = models.BooleanField()
    fundingInterval = models.IntegerField()
    copyTrading = models.CharField(max_length=50)
    upperFundingRate = models.CharField(max_length=50)
    lowerFundingRate = models.CharField(max_length=50)
    isPreListing = models.BooleanField()
    preListingInfo = models.CharField(max_length=50, null=True, blank=True)

    leverageFilter = models.JSONField()


class InstrumentBybitSpot(models.Model):
    indexes = [
        models.Index(fields=['symbol'])
    ]
    symbol = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return f'InstrumentBybitSpot(id={self.pk}, symbol={self.symbol})'


class InfoBybitSpot(InfoBybitMixin, models.Model):
    inst = models.OneToOneField(
        InstrumentBybitSpot,
        on_delete=models.CASCADE,
        related_name='spot_bybit'
    )
    innovation = models.CharField(max_length=50)
    marginTrading = models.CharField(max_length=50)
    stTag = models.CharField(max_length=50)

    riskParameters = models.JSONField()

    def __str__(self):
        return f'Bybit spot {self.inst.symbol}'


class InstrumentBybitLinear(models.Model):
    indexes = [
        models.Index(fields=['symbol'])
    ]
    symbol = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return f'InstrumentBybitLinear(id={self.pk}, symbol={self.symbol})'


class InfoBybitLinear(
    InfoBybitMixin,
    InfoBybitBaseDerivativeMixin,
    InfoBybitFuturesMixin,
    models.Model
):
    inst = models.OneToOneField(
        InstrumentBybitLinear,
        on_delete=models.CASCADE,
        related_name='linear_bybit'
    )

    riskParameters = models.JSONField()

    def __str__(self):
        return f'Bybit linear {self.inst.symbol}'


class InstrumentBybitInverse(models.Model):
    indexes = [
        models.Index(fields=['symbol'])
    ]

    symbol = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return f'InstrumentBybitInverse(id={self.pk}, symbol={self.symbol})'


class InfoBybitInverse(
    InfoBybitMixin,
    InfoBybitBaseDerivativeMixin,
    InfoBybitFuturesMixin,
    models.Model
):
    inst = models.OneToOneField(
        InstrumentBybitInverse,
        on_delete=models.CASCADE,
        related_name='inverse_bybit'
    )

    riskParameters = models.JSONField()

    def __str__(self):
        return f'Bybit inverse {self.inst.symbol}'


class InstrumentBybitOption(models.Model):
    indexes = [
        models.Index(fields=['symbol'])
    ]

    symbol = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return f'InstrumentBybitOption(id={self.pk}, symbol={self.symbol})'


class InfoBybitOptions(
    InfoBybitMixin,
    InfoBybitBaseDerivativeMixin,
    models.Model
):
    inst = models.ForeignKey(
        InstrumentBybitOption,
        on_delete=models.CASCADE,
        related_name='options_bybit'
    )

    optionsType = models.CharField(max_length=50)

    def __str__(self):
        return f'Bybit option {self.inst.symbol}'


class CategoryBybit(models.Model):
    title = models.CharField(max_length=50)
    system_mark = models.CharField(max_length=50)
    description = models.CharField(max_length=50)

    def __str__(self):
        return (f'CategoryBybit(id={self.pk}, title={self.title}, '
                f'system_mark={self.system_mark}, descr={self.description})')

    @classmethod
    def create_category(cls):
        t = [
            {'title': 'spot', 'system_mark': 'spot', 'description': 'Spot'},
            {'title': 'futures', 'system_mark': 'linear', 'description': 'Futures'},
            {'title': 'inverse_futures', 'system_mark': 'inverse', 'description': 'Inverse Futures'},
            {'title': 'option', 'system_mark': 'option', 'description': 'Option'},
        ]
        for c in t:
            cls.objects.create(**c)
