from django.contrib import admin
from traders_blog.models import Article, ArticleImage, CategoryTheory, ArticlePart


class ArticleImageInline(admin.TabularInline):
    model = ArticleImage
    extra = 1


class ArticlePartInline(admin.TabularInline):
    model = ArticlePart
    extra = 1


@admin.register(CategoryTheory)
class CategoryTheoryAdmin(admin.ModelAdmin):
    fields = ['title', 'status']
    list_display = ['title', 'slug', 'status']


@admin.register(ArticlePart)
class ArticlePartAdmin(admin.ModelAdmin):
    fields = ['title', 'description', 'article']
    list_display = ['title', 'slug']
    inlines = [ArticleImageInline]


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    fields = ['title', 'category', 'description']
    list_display = ['title', 'slug']
    list_filter = ['category']
    inlines = [ArticlePartInline]


@admin.register(ArticleImage)
class ArticleImageAdmin(admin.ModelAdmin):
    fields = ['article', 'image', 'description']
