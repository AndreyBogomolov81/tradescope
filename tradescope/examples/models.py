from django.db import models


class InstrumentCrypto(models.Model):
    class Meta:
        indexes = [
            models.Index(fields=['symbol', 'baseCoin', 'quoteCoin'])
        ]

    symbol = models.CharField(max_length=50, unique=True)
    baseCoin = models.CharField(max_length=50)
    quoteCoin = models.CharField(max_length=50)
    availableBybit = models.BooleanField(default=False)
    availableOKX = models.BooleanField(default=False)

    def __str__(self):
        return f'InstrumentCrypto(symbol={self.symbol}'


class InfoBybitSpot(models.Model):
    inst = models.OneToOneField(
        InstrumentCrypto,
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


class InfoBybitFutures(models.Model):
    inst = models.OneToOneField(
        InstrumentCrypto,
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
