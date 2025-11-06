from django.urls import path
from django.conf.urls.static import static
from django.conf import settings

from . import views

app_name = 'traders_blog'

urlpatterns = [
    path('', views.get_home, name='home'),
    path('theory/<slug:slug>/', views.get_theory, name='theory'),
    path('levels/', views.levels_list, name='levels_list'),
    path('levels/<int:id>', views.level_detail, name='level_details'),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
