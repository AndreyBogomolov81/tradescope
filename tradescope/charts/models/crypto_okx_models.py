from django.db import models
from django.contrib.postgres.fields import ArrayField
import okx.PublicData as PublicData



class InstrumentOKX(models.Model):
    class Meta:
        '''
        Класс описания инструмента торгуемого на OKX
        доступные категории:
            SPOT: Spot
            MARGIN: Margin
            SWAP: Swap
            FUTURES: Futures
            OPTION: Option
        Отдельные параметры по категории в связанных моделях
        поля используемые из запроса:
        symbol: instId;
        baseCoin: baseCcy;
        quoteCoin: quoteCcy.
        '''
        indexes = [
            models.Index(fields=['symbol', 'baseCoin', 'quoteCoin'])
        ]

    symbol = models.CharField(max_length=50, unique=True)
    baseCoin = models.CharField(max_length=50)
    quoteCoin = models.CharField(max_length=50)
    hasFutures = models.BooleanField(default=False)
    hasSpot = models.BooleanField(default=False)
    hasOption = models.BooleanField(default=False)
    hasMargin = models.BooleanField(default=False)
    hasSwap = models.BooleanField(default=False)

    def __str__(self):
        return f'InstrumentBybit(symbol={self.symbol})'

    @classmethod
    def _get_cleaned_info_data(cls, elem: dict, fields: dict) -> tuple:
        '''
        метод для разбиения словаря на два отдельных
        '''
        instr_data = {
            k: v for k, v in elem.items()
            if k in fields.keys()
        }
        instr_data = {fields[k]: v for k, v in instr_data.items()}
        info_data = {
            k: v for k, v in elem.items()
            if k not in fields.keys()
        }

        return instr_data, info_data
    @classmethod
    def _create_or_update_okx_spot_margin(cls, category: str, query):
        '''
        for spot
        :return:
        '''
        instr_fields = {'instId': 'symbol', 'baseCcy': 'baseCoin', 'quoteCcy': 'quoteCoin'}
        info_models = {
            'SPOT': InfoOKXSpot,
            'MARGIN': InfoOKXMargin
        }
        info_model = info_models[category.upper()]
        for i in query:
            instr_data, info_data = cls._get_cleaned_info_data(
                elem=i,
                fields=instr_fields
            )

            instrument, created = cls.objects.get_or_create(
                **instr_data
            )
            info_data.update({'inst': instrument})

            if category == 'SPOT':
                instrument.hasSpot = True
            elif category == 'MARGIN':
                instrument.hasMargin = True

            instrument.save()

            if not created:
                info_rec = info_model.objects.filter(
                    inst__id=instrument.pk
                )
                # если есть такая запись обновлем
                if info_rec.exists():
                    info_rec.update(**info_data)
                else:
                    # если записи еще нет
                    info_model.objects.create(**info_data)
                instrument.save()
            else:
                info_model.objects.create(**info_data)

    @classmethod
    def create_or_update_all_instrument(cls, category: str):
        try:
            flag = '0'
            publicDataAPI = PublicData.PublicAPI(flag=flag)
            result = publicDataAPI.get_instruments(instType=category.upper())
            cls._create_or_update_okx_spot_margin(
                category=category,
                query=result['data']
            )
        except BaseException as exc:
            print(str(exc))


class InfoOKXSpot(models.Model):
    inst = models.OneToOneField(
        InstrumentOKX,
        on_delete=models.CASCADE,
        related_name='spot_okx'
    )
    alias = models.CharField(max_length=50, blank=True)
    auctionEndTime = models.CharField(max_length=50, blank=True)
    category = models.CharField(max_length=50, blank=True)
    contTdSwTime = models.CharField(max_length=50, blank=True)
    ctMult = models.CharField(max_length=50, blank=True)
    ctType = models.CharField(max_length=50, blank=True)
    ctVal = models.CharField(max_length=50, blank=True)
    ctValCcy = models.CharField(max_length=50, blank=True)
    expTime = models.CharField(max_length=50, blank=True)
    futureSettlement = models.BooleanField()
    instFamily = models.CharField(max_length=50, blank=True)
    instIdCode = models.IntegerField()
    instType = models.CharField(max_length=50, blank=True)
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

    def __str__(self):
        return f'OKX spot {self.inst.symbol}'


class InfoOKXMargin(models.Model):
    inst = models.OneToOneField(
        InstrumentOKX,
        on_delete=models.CASCADE,
        related_name='margin_okx'
    )
    alias = models.CharField(max_length=50, blank=True)
    auctionEndTime = models.CharField(max_length=50, blank=True)
    category = models.CharField(max_length=50, blank=True)
    contTdSwTime = models.CharField(max_length=50, blank=True)
    ctMult = models.CharField(max_length=50, blank=True)
    ctType = models.CharField(max_length=50, blank=True)
    ctVal = models.CharField(max_length=50, blank=True)
    ctValCcy = models.CharField(max_length=50, blank=True)
    expTime = models.CharField(max_length=50, blank=True)
    futureSettlement = models.BooleanField()
    instFamily = models.CharField(max_length=50, blank=True)
    instIdCode = models.IntegerField()
    instType = models.CharField(max_length=50, blank=True)
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

    def __str__(self):
        return f'OKX spot {self.inst.symbol}'
