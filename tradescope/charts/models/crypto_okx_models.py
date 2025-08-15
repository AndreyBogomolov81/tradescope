from django.db import models
from django.contrib.postgres.fields import ArrayField
import okx.PublicData as PublicData


class HelperOKXMixin:
    @classmethod
    def _get_cleaned_info_data(cls, elem: dict, fields: list) -> tuple:
        '''
        метод для разбиения словаря на два отдельных
        '''
        instr_data = {
            k: v for k, v in elem.items()
            if k in fields
        }
        info_data = {
            k: v for k, v in elem.items()
            if k not in fields
        }

        return instr_data, info_data

    # TODO: переработать метод по созданию инструментов
    # TODO: определить метод по обновлению инструментов, выяснить какие параметры нужно обновлять
    # TODO: реализоавть метод для удаления производных инструментов

    @classmethod
    def create_instrument(cls, category):
        info_models = {
            'SPOT': InfoOKXSpot,
            'MARGIN': InfoOKXMargin,
            'SWAP': InfoOKXSwap,
            'FUTURES': InfoOKXFutures,
        }
        flag = '0'
        publicDataAPI = PublicData.PublicAPI(flag=flag)
        if category in ('SPOT', 'MARGIN', 'SWAP'):
            result = publicDataAPI.get_instruments(instType=category)
            for item in result['data']:
                instr_data, info_data = cls._get_cleaned_info_data(item, ['instId'])
                instrument = cls.objects.create_instrument_by_category(instId=item['instId'])
                info_data.update({'inst': instrument})
                info_models[category].objects.create(**info_data)
        else:
            spot_instr = InstrumentOKXSpot.objects.all()
            for inst in spot_instr:
                print(inst.instId)
                result = publicDataAPI.get_instruments(instType=category, instFamily=inst.instId)
                if result['data']:
                    print(result['data'])
                    for item in result['data']:
                        instr_data, info_data = cls._get_cleaned_info_data(item, ['instId'])
                        instrument = cls.objects.create_instrument_by_category(instId=item['instId'])
                        info_data.update({'inst': instrument})
                        info_models[category].objects.create(**info_data)



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


class InstrumentOKXSpot(models.Model, HelperOKXMixin):
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


class InstrumentOKXMargin(models.Model, HelperOKXMixin):
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


class InstrumentOKXSwap(models.Model, HelperOKXMixin):
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


class InstrumentOKXFutures(models.Model, HelperOKXMixin):
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
            {'title': 'spot', 'system_mark': 'SPOT', 'description': 'Spot'},
            {'title': 'futures', 'system_mark': 'FUTURES', 'description': 'Futures'},
            {'title': 'inverse_futures', 'system_mark': 'FUTURES', 'description': 'Inverse Futures'},
            {'title': 'margin', 'system_mark': 'MARGIN', 'description': 'Margin'},
            {'title': 'option', 'system_mark': 'OPTION', 'description': 'Option'},
            {'title': 'swap', 'system_mark': 'SWAP', 'description': 'Swap'},
        ]
        for c in t:
            cls.objects.create(**c)
