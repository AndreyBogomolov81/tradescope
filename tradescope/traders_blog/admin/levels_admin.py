from django.contrib import admin
from traders_blog.models import LevelSpotBybit, LevelSpotBybitImages, LevelsTag


# Register your models here.
class LevelSpotBybitImagesInline(admin.TabularInline):
    model = LevelSpotBybitImages
    extra = 1

@admin.register(LevelsTag)
class LevelsTagAdmin(admin.ModelAdmin):
    fields = ['name']


@admin.register(LevelSpotBybit)
class LevelPostBybitAdmin(admin.ModelAdmin):
    fields = ['description', 'title_description', 'instrument', 'levels_date', 'price', 'tags']
    list_display = ['title', 'price', 'levels_date', 'exchange', 'category']
    inlines = [LevelSpotBybitImagesInline]


@admin.register(LevelSpotBybitImages)
class LevelSpotBybitImagesAdmin(admin.ModelAdmin):
    fields = ['level', 'image']
