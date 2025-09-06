from datetime import datetime as dt
import asyncio

from django.db import models
from pybit.exceptions import InvalidRequestError
from pybit.unified_trading import HTTP
from django.core.files.base import ContentFile


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
    class Meta:
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
    class Meta:
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
    class Meta:
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
    class Meta:
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
            {'title': 'spot_bybit', 'system_mark': 'spot', 'description': 'Spot'},
            {'title': 'linear_bybit', 'system_mark': 'linear', 'description': 'Futures'},
            {'title': 'inverse_bybit', 'system_mark': 'inverse', 'description': 'Inverse Futures'},
            # {'title': 'option_bybit', 'system_mark': 'option', 'description': 'Option'},
        ]
        for c in t:
            cls.objects.create(**c)


class BaseCandleBybit(models.Model):
    class Meta:
        abstract = True

    time = models.FloatField()
    open = models.FloatField()
    high = models.FloatField()
    low = models.FloatField()
    close = models.FloatField()
    volume = models.FloatField()
    turnover = models.FloatField()
    interval = models.CharField(max_length=10)


class CandleBybitSpot(
    BaseCandleBybit,
    models.Model
):
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['time', 'inst', 'interval'],
                                    name='unique_spot_startTime_inst_interval')
        ]
        indexes = [
            models.Index(fields=['time'])
        ]
        ordering = ['time']

    inst = models.ForeignKey(
        InstrumentBybitSpot,
        on_delete=models.CASCADE,
        related_name='candles'
    )


class CandleBybitLinear(
    BaseCandleBybit,
    models.Model
):
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['time', 'inst', 'interval'],
                                    name='unique_linear_startTime_inst_interval')
        ]
        indexes = [
            models.Index(fields=['time'])
        ]
        ordering = ['time']

    inst = models.ForeignKey(
        InstrumentBybitLinear,
        on_delete=models.CASCADE,
        related_name='candles'
    )


class CandleBybitInverse(
    BaseCandleBybit,
    models.Model
):
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['time', 'inst', 'interval'],
                                    name='unique_inverse_startTime_inst_interval')
        ]
        indexes = [
            models.Index(fields=['time'])
        ]
        ordering = ['time']

    inst = models.ForeignKey(
        InstrumentBybitInverse,
        on_delete=models.CASCADE,
        related_name='candles'
    )


def historical_data_spot_dir_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    return "historical_data_bybit/coin_spot_{0}/{1}".format(
        instance.inst.symbol,
        filename
    )


def historical_data_linear_dir_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    return "historical_data_bybit/coin_linear_{0}/{1}".format(
        instance.inst.symbol,
        filename
    )


def historical_data_inverse_dir_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    return "historical_data_bybit/coin_inverse_{0}/{1}".format(
        instance.inst.symbol,
        filename
    )


class HistoricalDataBybitSpot(
    models.Model
):
    class Meta:
        indexes = [
            models.Index(fields=['start_date', 'end_date', 'interval'])
        ]
        ordering = ['start_date']

    start_date = models.FloatField()
    end_date = models.FloatField()
    interval = models.CharField(max_length=50)
    total_count = models.IntegerField()

    inst = models.ForeignKey(
        InstrumentBybitSpot,
        on_delete=models.CASCADE,
        related_name='hist_data'
    )

    data = models.FileField(upload_to=historical_data_spot_dir_path)

    def __str__(self):
        return f'instr={self.inst.symbol}, interval={self.interval}'


class HistoricalDataBybitLinear(
    models.Model
):
    class Meta:
        indexes = [
            models.Index(fields=['start_date', 'end_date', 'interval'])
        ]
        ordering = ['start_date']

    start_date = models.FloatField()
    end_date = models.FloatField()
    interval = models.CharField(max_length=50)
    total_count = models.IntegerField()

    inst = models.ForeignKey(
        InstrumentBybitLinear,
        on_delete=models.CASCADE,
        related_name='hist_data'
    )

    data = models.FileField(upload_to=historical_data_linear_dir_path)

    def __str__(self):
        return f'instr={self.inst.symbol}, interval={self.interval}'


class HistoricalDataBybitInverse(
    models.Model
):
    class Meta:
        indexes = [
            models.Index(fields=['start_date', 'end_date', 'interval'])
        ]
        ordering = ['start_date']

    start_date = models.FloatField()
    end_date = models.FloatField()
    interval = models.CharField(max_length=50)
    total_count = models.IntegerField()

    inst = models.ForeignKey(
        InstrumentBybitInverse,
        on_delete=models.CASCADE,
        related_name='hist_data'
    )

    data = models.FileField(upload_to=historical_data_inverse_dir_path)

    def __str__(self):
        return f'instr={self.inst.symbol}, interval={self.interval}'
