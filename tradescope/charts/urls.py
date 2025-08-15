from django.urls import path

from . import views

app_name = 'charts'

urlpatterns = [
    path(
        'categories-bybit/',
        views.CategoriesBybitAPIView.as_view(),
        name='categories_bybit'
    ),
    path(
        'instruments-bybit/',
        views.InstrumentBybitAPIView.as_view(),
        name='instruments_bybit'
    )
]