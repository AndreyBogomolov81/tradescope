from django.db import models
from django.contrib.postgres.fields import ArrayField


class InfoOKXMixin(models.Model):
    baseCcy = models.CharField(max_length=50)
    quoteCcy = models.CharField(max_length=50)

    alias = models.CharField(max_length=50, blank=True)  #
    auctionEndTime = models.CharField(max_length=50, blank=True)  #
    category = models.CharField(max_length=50, blank=True)  #
    contTdSwTime = models.CharField(max_length=50, blank=True)  #

    ctMult = models.CharField(max_length=50, blank=True)  #
    ctType = models.CharField(max_length=50, blank=True)  #
    ctVal = models.CharField(max_length=50, blank=True)  #
    ctValCcy = models.CharField(max_length=50, blank=True)  #
    expTime = models.CharField(max_length=50, blank=True)  #

    futureSettlement = models.BooleanField()  #
    instFamily = models.CharField(max_length=50, blank=True)  #
    instIdCode = models.IntegerField()  #
    instType = models.CharField(max_length=50, blank=True)  #

    lever = models.CharField(max_length=50, blank=True)
    listTime = models.CharField(max_length=50, blank=True)
    lotSz = models.CharField(max_length=50, blank=True)
    maxIcebergSz = models.CharField(max_length=50, blank=True)

    maxLmtAmt = models.CharField(max_length=50, blank=True)
    maxLmtSz = models.CharField(max_length=50, blank=True)
    maxMktAmt = models.CharField(max_length=50, blank=True)
    maxMktSz = models.CharField(max_length=50, blank=True)

    maxStopSz = models.CharField(max_length=50, blank=True)
    maxTriggerSz = models.CharField(max_length=50, blank=True)
    maxTwapSz = models.CharField(max_length=50, blank=True)
    minSz = models.CharField(max_length=50, blank=True)
    openType = models.CharField(max_length=50, blank=True)
    optType = models.CharField(max_length=50, blank=True)

    ruleType = models.CharField(max_length=50, blank=True)
    settleCcy = models.CharField(max_length=50, blank=True)
    state = models.CharField(max_length=50, blank=True)
    stk = models.CharField(max_length=50, blank=True)
    tickSz = models.CharField(max_length=50, blank=True)
    uly = models.CharField(max_length=50, blank=True)

    tradeQuoteCcyList = ArrayField(models.CharField(max_length=20))

    class Meta:
        abstract = True


class InstrumentOKXSpot(models.Model):
    indexes = [
        models.Index(fields=['instId'])
    ]
    instId = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return f'InstrumentOKXSpot(id={self.pk}, instId={self.instId})'


class InfoOKXSpot(InfoOKXMixin, models.Model):
    inst = models.OneToOneField(
        InstrumentOKXSpot,
        on_delete=models.CASCADE,
        related_name='spot_okx'
    )

    def __str__(self):
        return f'OKX spot {self.inst.instId}'


class InstrumentOKXMargin(models.Model):
    indexes = [
        models.Index(fields=['instId'])
    ]
    instId = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return f'InstrumentOKXMargin(id={self.pk}, instId={self.instId})'


class InfoOKXMargin(InfoOKXMixin, models.Model):
    inst = models.OneToOneField(
        InstrumentOKXMargin,
        on_delete=models.CASCADE,
        related_name='margin_okx'
    )

    def __str__(self):
        return f'OKX margin {self.inst.instId}'


class InstrumentOKXSwap(models.Model):
    indexes = [
        models.Index(fields=['instId'])
    ]
    instId = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return f'InstrumentOKXSwap(id={self.pk}, instId={self.instId})'


class InfoOKXSwap(InfoOKXMixin, models.Model):
    inst = models.OneToOneField(
        InstrumentOKXSwap,
        on_delete=models.CASCADE,
        related_name='swap_okx'
    )

    def __str__(self):
        return f'OKX swap {self.inst.instId}'


class InstrumentOKXFutures(models.Model):
    indexes = [
        models.Index(fields=['instId'])
    ]
    instId = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return f'InstrumentOKXFutures(id={self.pk}, instId={self.instId})'


class InfoOKXFutures(InfoOKXMixin, models.Model):
    inst = models.OneToOneField(
        InstrumentOKXFutures,
        on_delete=models.CASCADE,
        related_name='futures_okx'
    )

    def __str__(self):
        return f'OKX futures {self.inst.instId}'


class CategoryOKX(models.Model):
    title = models.CharField(max_length=50)
    system_mark = models.CharField(max_length=50)
    description = models.CharField(max_length=50)

    def __str__(self):
        return (f'Category(id={self.pk}, title={self.title}, '
                f'system_mark={self.system_mark}, descr={self.description})')

    @classmethod
    def create_category(cls):
        t = [
            {'title': 'spot_okx', 'system_mark': 'SPOT', 'description': 'Spot'},
            {'title': 'futures_okx', 'system_mark': 'FUTURES', 'description': 'Futures'},
            {'title': 'margin_okx', 'system_mark': 'MARGIN', 'description': 'Margin'},
            {'title': 'swap_okx', 'system_mark': 'SWAP', 'description': 'Swap'},
        ]
        for c in t:
            cls.objects.create(**c)
