from django.db import models
from django.utils.text import slugify
from django.urls import reverse
from googletrans import Translator


def image_article_path(instance: "ArticleImage", filename: str):
    return 'theory/{article}/{filename}'.format(
        article=instance.article.slug,
        filename=filename
    )


class CategoryTheory(models.Model):
    title = models.CharField(max_length=250, unique=True)
    slug = models.SlugField(max_length=250)

    class Status(models.TextChoices):
        ACTIVE = 'A', 'Active'
        INACTIVE = 'I', 'Inactive'

    status = models.CharField(
        max_length=1,
        choices=Status,
        default=Status.INACTIVE
    )

    class Meta:
        indexes = [
            models.Index(fields=['slug'])
        ]

    def __str__(self):
        return f'{self.title}'

    def save(self, *args, **kwargs):
        if not self.slug:
            translator = Translator()
            res = translator.translate(self.title)
            self.slug = slugify(res.text)
        super().save(*args, **kwargs)


class Article(models.Model):
    title = models.CharField(max_length=250, unique=True)
    slug = models.SlugField(max_length=250)
    description = models.TextField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    category = models.ForeignKey(
        CategoryTheory,
        on_delete=models.CASCADE,
        blank=True,
        null=True,
        related_name='records'
    )

    class Meta:
        ordering = ['created_at']
        indexes = [
            models.Index(fields=['slug'])
        ]

    def __str__(self):
        return f'{self.title}'

    def save(self, *args, **kwargs):
        if not self.slug:
            translator = Translator()
            res = translator.translate(self.title)
            self.slug = slugify(res.text)
        super().save(*args, **kwargs)


class ArticlePart(models.Model):
    title = models.CharField(max_length=250, null=True, blank=True)
    slug = models.SlugField(max_length=250)

    description = models.TextField()

    article = models.ForeignKey(
        Article,
        on_delete=models.CASCADE,
        related_name='parts'
    )

    class Meta:
        ordering = ['pk']

    def __str__(self):
        return f'{self.title}'

    def save(self, *args, **kwargs):
        if not self.slug:
            translator = Translator()
            res = translator.translate(self.title)
            self.slug = slugify(res.text)
        super().save(*args, **kwargs)


class ArticleImage(models.Model):
    article = models.ForeignKey(
        ArticlePart,
        on_delete=models.CASCADE,
        related_name='images'
    )

    image = models.ImageField(
        null=True,
        blank=True,
        upload_to=image_article_path
    )
    description = models.TextField(null=True, blank=True)
