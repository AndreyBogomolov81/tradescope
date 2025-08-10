from datetime import datetime as dt
import asyncio

from django.db import models
from pybit.exceptions import InvalidRequestError
from pybit.unified_trading import HTTP
from django.core.files.base import ContentFile

from charts.utils import get_klines, get_cleared_dataset

def historical_data_spot_dir_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    return "historical_data_bybit/coin_spot_{0}/{1}".format(
        instance.coin.symbol,
        filename
    )


def historical_data_futures_dir_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    return "historical_data_bybit/coin_futures_{0}/{1}".format(
        instance.coin.symbol,
        filename
    )


class InstrumentBybit(models.Model):
    '''
    Класс описания инструмента торгуемого на Bybit
    доступные категории:
        spot: Spot
        inverse: Inverse Futures
        linear: Futures
        option: Option
    Отдельные параметры по категории в связанных моделях
    поля используемые из запроса:
    symbol: symbol;
    baseCoin: baseCoin;
    quoteCoin: quoteCoin.
    '''
    class Meta:
        indexes = [
            models.Index(fields=['symbol', 'baseCoin', 'quoteCoin'])
        ]

    symbol = models.CharField(max_length=50, unique=True)
    baseCoin = models.CharField(max_length=50)
    quoteCoin = models.CharField(max_length=50)
    hasFutures = models.BooleanField(default=False)
    hasSpot = models.BooleanField(default=False)
    hasOption = models.BooleanField(default=False)

    def __str__(self):
        return f'InstrumentBybit(symbol={self.symbol})'

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

    @classmethod
    def _create_or_update_bybit_spot_futures(cls, category, query):
        '''
        Метод обновления данных по споту или фьючерсу
        :param category: spot, linear(futures)
        :param query: результат запроса на bybit
        :return:
        '''
        instr_fields = ['symbol', 'baseCoin', 'quoteCoin']
        info_models = {
            'spot': InfoBybitSpot,
            'linear': InfoBybitFutures,
        }
        info_model = info_models[category]
        for i in query:
            instr_data, info_data = cls._get_cleaned_info_data(
                elem=i,
                fields=instr_fields
            )
            instrument, created = cls.objects.get_or_create(
                **instr_data
            )
            info_data.update({'inst': instrument})

            if category == 'spot':
                instrument.hasSpot = True
            elif category == 'linear':
                instrument.hasFutures = True
            instrument.save()

            if not created:
                # проверяяем есть ли запись с информацией об инструменте, если есть
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
    def _create_or_update_bybit_option(cls, query):
        '''
        метод для обновления информации по опционам
        :param query: результат запроса на bybit
        :return:
        '''
        instr_fields = ['baseCoin', 'quoteCoin']
        for i in query:
            instr_data, info_data = cls._get_cleaned_info_data(
                elem=i,
                fields=instr_fields
            )
            instrument, created = cls.objects.get_or_create(
                symbol=''.join(instr_data.values())
            )
            instrument.hasOption = True
            instrument.save()
            if not created:
                info_data.update({'inst': instrument})
                rec_info = InfoBybitOptions.objects.filter(
                    symbol=i['symbol']
                )
                #проверям наличие опциона если есть то обновляем, если нет то создаем новый
                if rec_info.exists():
                    rec_info.update(**info_data)
                else:
                    InfoBybitOptions.objects.create(**info_data)

    @classmethod
    def create_or_update_all_instrument(cls, category: str):
        '''
        Метод создания или обновления информации по и=инструментам с указанием биржи
        :param category:
        :return:
        '''
        try:
            category = 'linear' if category == 'futures' else category
            session = HTTP()
            query = session.get_instruments_info(
                category=category
            )['result']['list']

            if category == 'option':
                cls._create_or_update_bybit_option(
                    query=query
                )
            else:
                cls._create_or_update_bybit_spot_futures(
                    category=category,
                    query=query
                )

        except InvalidRequestError as exc:
            print('Ошибка перехввачена')
            print(str(exc))

        except BaseException as exc:
            print(str(exc))

    @classmethod
    def _set_historical_data(
            cls,
            category: str,
            start_date,
            end_date,
            interval: str,
            instrument
    ):

        historical_data_models = {
            'linear': HistoricalDataByBitFutures,
            'spot': HistoricalDataByBitSpot,
        }
        # # получаем набор неочищенных данных
        raw_data = asyncio.run(get_klines(
            symbol=instrument.symbol,
            category=category,
            interval=interval,
            start_date=start_date,
            end_date=end_date
        ))
        count = 0
        for item in raw_data:
            # получаем строку json для
            start, end, cleared_data = get_cleared_dataset(item['result']['list'])
            file_name = '{symbol}_{start}_{end}.json'.format(
                symbol=instrument.symbol,
                start=start,
                end=end
            )
            # создаем объект
            hd = historical_data_models[category](
                coin=instrument,
                start_date=start,
                end_date=end,
                interval=interval
            )
            content = ContentFile(cleared_data, name=file_name)
            hd.data.save(file_name, content)
            count += 1
        print('Загружено файлов:', count)

    @classmethod
    def create_or_update_historical_data(
            cls,
            category: str,
            symbol: str,
            start_date: str,
            end_date: str,
            interval: str
    ):
        # получить иснтрумент
        category = 'linear' if category == 'futures' else category

        kw = {
            'linear': 'hasFutures',
            'spot': 'hasSpot',
        }
        atr = {
            'linear': 'historical_futures_data',
            'spot': 'historical_spot_data',
        }
        try:
            instrument = cls.objects.get(
                **{'symbol': symbol, kw[category]: True}
            )
            options = {
                'category': category,
                'interval': interval,
                'instrument': instrument
            }

            new_start_date = dt.strptime(start_date, '%d.%m.%Y %H:%M')
            new_end_date = dt.strptime(end_date, '%d.%m.%Y %H:%M')

            # проверяем есть ли записи в таблице истории для этого инструмента
            historical_data = getattr(instrument, atr[category]).all()
            if historical_data.exists():
                # берем первую дату и последнюю
                exist_start_date = historical_data.first().start_date
                exist_end_date = historical_data.last().end_date

                first_arr_ts = [
                    i for i in range(
                        int(new_start_date.timestamp()),
                        exist_start_date,
                        60
                    )
                ]
                last_arr_ts = [
                    i for i in range(
                        exist_end_date + 60,
                        int(new_end_date.timestamp()) + 60,
                        60
                    )
                ]
                new_periods = [
                    (
                        dt.fromtimestamp(first_arr_ts[0]),
                        dt.fromtimestamp(first_arr_ts[-1])
                    ),
                    (
                        dt.fromtimestamp(last_arr_ts[0]),
                        dt.fromtimestamp(last_arr_ts[-1])
                    )
                ]
                for start, end in new_periods:
                    cls._set_historical_data(
                        start_date=start,
                        end_date=end,
                        **options
                    )
            else:
                cls._set_historical_data(
                    start_date=new_start_date,
                    end_date=new_end_date,
                    **options
                )

        except cls.DoesNotExist:
            print('entry not found')

        except Exception as e:
            error_type = type(e).__name__
            error_message = str(e)
            print(
                error_type,
                error_message
            )


class InfoBybitSpot(models.Model):
    inst = models.OneToOneField(
        InstrumentBybit,
        on_delete=models.CASCADE,
        related_name='spot_bybit'
    )
    innovation = models.CharField(max_length=50)
    status = models.CharField(max_length=50)
    marginTrading = models.CharField(max_length=50)
    stTag = models.CharField(max_length=50)

    lotSizeFilter = models.JSONField()
    priceFilter = models.JSONField()
    riskParameters = models.JSONField()

    def __str__(self):
        return f'Bybit spot {self.inst.symbol}'


class InfoBybitFutures(models.Model):
    inst = models.OneToOneField(
        InstrumentBybit,
        on_delete=models.CASCADE,
        related_name='futures_bybit'
    )
    contractType = models.CharField(max_length=100)
    status = models.CharField(max_length=50)
    launchTime = models.CharField(max_length=50)  #
    deliveryTime = models.CharField(max_length=50, blank=True)
    deliveryFeeRate = models.CharField(max_length=50)
    priceScale = models.CharField(max_length=50)
    unifiedMarginTrade = models.BooleanField()
    fundingInterval = models.IntegerField()
    settleCoin = models.CharField(max_length=50)
    copyTrading = models.CharField(max_length=50)
    upperFundingRate = models.CharField(max_length=50)
    lowerFundingRate = models.CharField(max_length=50)
    isPreListing = models.BooleanField()
    preListingInfo = models.CharField(max_length=50, null=True, blank=True)
    displayName = models.CharField(max_length=50, null=True, blank=True)

    leverageFilter = models.JSONField()
    priceFilter = models.JSONField()
    lotSizeFilter = models.JSONField()
    riskParameters = models.JSONField()

    def __str__(self):
        return f'Bybit futures {self.inst.symbol}'


class InfoBybitOptions(models.Model):
    inst = models.ForeignKey(
        InstrumentBybit,
        on_delete=models.CASCADE,
        related_name='options_bybit'
    )

    symbol = models.CharField(max_length=50, unique=True)
    status = models.CharField(max_length=50)
    settleCoin = models.CharField(max_length=50)
    optionsType = models.CharField(max_length=50)
    launchTime = models.CharField(max_length=50)
    deliveryTime = models.CharField(max_length=50)
    deliveryFeeRate = models.CharField(max_length=50)
    displayName = models.CharField(max_length=50)

    priceFilter = models.JSONField()
    lotSizeFilter = models.JSONField()

    class Meta:
        indexes = [
            models.Index(fields=['symbol', 'optionsType'])
        ]

    def __str__(self):
        return f'Bybit option {self.symbol}'


class HistoricalDataByBitSpot(models.Model):
    '''
    Модель отвечает за связывания монеты с историческими данными спот, для начала используем минимальные 15 минутные свечи
    При сохранении данных на диске мы так же должны сохранить в базе данных метки времени начала и конца свечных данных
    '''

    class Meta:
        indexes = [
            models.Index(fields=['start_date', 'end_date', 'interval'])
        ]
        ordering = ['start_date']

    start_date = models.IntegerField()
    end_date = models.IntegerField()
    interval = models.CharField(max_length=50)

    coin = models.ForeignKey(
        InstrumentBybit,
        on_delete=models.CASCADE,
        related_name='historical_spot_data'
    )

    data = models.FileField(upload_to=historical_data_spot_dir_path)


class HistoricalDataByBitFutures(models.Model):
    '''
    Модель отвечает за связывания монеты с историческими данными фьючерсов, для начала используем минимальные 15 минутные свечи
    При сохранении данных на диске мы так же должны сохранить в базе данных метки времени начала и конца свечных данных

    '''

    class Meta:
        indexes = [
            models.Index(fields=['start_date', 'end_date', 'interval'])
        ]
        ordering = ['start_date']

    start_date = models.IntegerField()
    end_date = models.IntegerField()
    interval = models.CharField(max_length=50)

    coin = models.ForeignKey(
        InstrumentBybit,
        on_delete=models.CASCADE,
        related_name='historical_futures_data'
    )

    data = models.FileField(upload_to=historical_data_futures_dir_path)
