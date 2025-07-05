from django.urls import path

from . import views

app_name = 'charts'

urlpatterns = [
    path('', views.test_view),
    path('api/v1/klines/', views.KlineDataView.as_view(), name='klines_data'),
]