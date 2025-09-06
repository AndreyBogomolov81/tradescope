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
        'categories-okx/',
        views.CategoriesOKXAPIView.as_view(),
        name='categories_okx'
    ),
    path(
        'instruments-bybit/',
        views.InstrumentBybitAPIView.as_view(),
        name='instruments_bybit'
    ),
    path(
        'instruments-okx/',
        views.InstrumentOKXAPIView.as_view(),
        name='instruments_okx'
    ),
    path(
        'candles-data-bybit/',
        views.CandlesDataBybitAPIView.as_view(),
        name='candles_data_bybit'
    )
]