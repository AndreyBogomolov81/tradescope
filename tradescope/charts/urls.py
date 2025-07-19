from django.urls import path

from . import views

app_name = 'charts'

urlpatterns = [
    path('', views.test_view),
    path(
        'api/v1/categories/<str:exchange>/',
        views.CategoriesAPIView.as_view(),
        name='exchange_categories'
    ),
    path(
        'api/v1/instrument-symbol-list/<str:exchange>/<str:category>/',
        views.InstrumentSymbolsAPIView.as_view(),
        name='instrument_symbols'
    ),
    path(
        'api/v1/historical-data/',
        views.HistoricalDataView.as_view(),
        name='historical_data'
    ),
]