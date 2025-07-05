from django.db import models


def historical_data_linear_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    return "historical_data_bybit/coin_linear_{0}/{1}".format(instance.coin.symbol, filename)


# Create your models here.
class InstrumentByBitLinear(models.Model):
    symbol = models.CharField(max_length=50, unique=True)
    contractType = models.CharField(max_length=100)
    status = models.CharField(max_length=50)
    baseCoin = models.CharField(max_length=50)
    quoteCoin = models.CharField(max_length=50)
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

    class Meta:
        indexes = [
            models.Index(fields=['symbol', 'baseCoin', 'quoteCoin'])
        ]

    def __str__(self):
        return self.symbol


class HistoricalDataByBitLinear(models.Model):
    '''
    Модель отвечает за связывания монеты с историческими данными, для начала используем минимальные 15 минутные свечи
    При сохранении данных на диске мы так же должны сохранить в базе данных метки времени начала и конца свечных данных

    '''

    class Meta:
        indexes = [
            models.Index(fields=['start_date', 'end_date', 'interval'])
        ]

    coin = models.ForeignKey(
        InstrumentByBitLinear,
        on_delete=models.CASCADE,
        related_name='historical_data'
    )

    start_date = models.IntegerField(unique=True)
    end_date = models.IntegerField(unique=True)
    interval = models.CharField(max_length=50)

    data = models.FileField(upload_to=historical_data_linear_directory_path)


class InstrumentByBitSpot(models.Model):
    symbol = models.CharField(max_length=50, unique=True)
    baseCoin = models.CharField(max_length=50)
    quoteCoin = models.CharField(max_length=50)
    innovation = models.CharField(max_length=50)
    status = models.CharField(max_length=50)
    marginTrading = models.CharField(max_length=50)
    stTag = models.CharField(max_length=50)

    lotSizeFilter = models.JSONField()
    priceFilter = models.JSONField()
    riskParameters = models.JSONField()

    class Meta:
        indexes = [
            models.Index(fields=['symbol', 'baseCoin', 'quoteCoin'])
        ]

    def __str__(self):
        return self.symbol


class InstrumentByBitOption(models.Model):
    symbol = models.CharField(max_length=50, unique=True)
    status = models.CharField(max_length=50)
    baseCoin = models.CharField(max_length=50)
    quoteCoin = models.CharField(max_length=50)
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
            models.Index(fields=['symbol', 'baseCoin', 'quoteCoin'])
        ]

    def __str__(self):
        return self.symbol


class Exchange(models.Model):
    '''
    Модель описывает доступные биржи MOEX OKX, Bybit...
    '''
    title = models.CharField(max_length=50)

    def __str__(self):
        return f'Exchanges(id={self.pk}, title={self.title})'


class Category(models.Model):
    '''
    Модель описывает доступные для каждой биржи инструменты:
    '''
    exchanges = models.ManyToManyField(
        Exchange,
        related_name='categories'
    )
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=100)

    def __str__(self):
        return f'Category(id={self.pk}, title={self.title})'
