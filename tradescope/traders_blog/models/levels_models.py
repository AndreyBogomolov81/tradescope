from django.db import models
from django.utils import timezone
from django.utils.text import slugify
from datetime import datetime as dt
from googletrans import Translator

from charts.models import (
    InstrumentBybitSpot,
    InstrumentBybitLinear,
    InstrumentBybitInverse,
)


# Create your models here.


def image_spot_bybit_path(instance: "LevelSpotBybitImages", filename: str):
    return 'levels/bybit/spot/{symbol}/{filename}'.format(
        symbol=instance.level.instrument.symbol,
        filename=filename
    )


class LevelsTag(models.Model):
    name = models.CharField(max_length=250, unique=True)
    slug = models.SlugField(max_length=250, blank=True)

    def __str__(self):
        return f'{self.name}'

    def save(self, *args, **kwargs):
        translator = Translator()
        res = translator.translate(self.name)
        self.slug = slugify(res.text)
        super().save(*args, **kwargs)


class LevelSpotBybit(models.Model):
    # для заголовках к карточкам или статьям
    title = models.CharField(max_length=250, unique=True)
    # слаг нужен для дружел url
    slug = models.SlugField(max_length=250)
    # для описания почему мы выбрали этот уровень
    title_description = models.CharField(max_length=300, blank=True)
    description = models.TextField()
    price = models.FloatField(null=True, blank=True)

    exchange = models.CharField(max_length=100, blank=True)
    category = models.CharField(max_length=100, blank=True)

    levels_date = models.DateTimeField(null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    tags = models.ManyToManyField(
        LevelsTag,
        blank=True,
        related_name='instruments'
    )

    # теги для уровня
    # ссылки на инструменты
    instrument = models.ForeignKey(
        InstrumentBybitSpot,
        on_delete=models.CASCADE,
        related_name='levels'
    )

    class Meta:
        ordering = ['-created']
        indexes = [
            models.Index(fields=['-price'])
        ]

    def __str__(self):
        return f'{self.title}'

    def save(self, *args, **kwargs):
        t = [
            self.instrument.symbol,
            str(self.price),
            dt.strftime(self.levels_date, '%d.%m.%Y %H:%M'),
            'Bybit Spot'
        ]
        self.title = ' '.join(t)
        self.slug = slugify('-'.join(t))
        self.exchange = 'Bybit'
        self.category = 'Spot'
        self.title_description = ' '.join(
            [self.instrument.symbol, self.title_description]
        )
        super().save(*args, **kwargs)


class LevelSpotBybitImages(models.Model):
    level = models.ForeignKey(
        LevelSpotBybit,
        on_delete=models.CASCADE,
        related_name='images'
    )

    image = models.ImageField(
        null=True,
        blank=True,
        upload_to=image_spot_bybit_path
    )
