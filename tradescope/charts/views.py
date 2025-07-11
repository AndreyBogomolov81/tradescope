from django.http import HttpResponse
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import mixins, generics, status
import json
import pandas as pd

from .models import (
    HistoricalDataByBitLinear,
    Exchange,
    InstrumentByBitSpot,
    InstrumentByBitOption,
    InstrumentByBitLinear,
    Category
)
from .utils import get_klines_for_instrument

# Create your views here.
def test_view(request):
    '''
    Функция представление для инициализации графика
    по умолчанию принимается на данный
    :param request:
    :return:
    '''
    tf = ['1ч', '4ч', '1Д', '1Н']
    exchanges = Exchange.objects.all()
    return render(
        request,
        'charts/test_chart.html',
        {
            'intervals': tf,
            'exchanges': exchanges,
        }
    )

class HistoricalDataView(APIView):
    count = 0
    l = 15
    def get(self, request: Request, exchange: str, symbol: str, interval: str):
        '''
        Функция для получения исторических данных об инструменте, подгрузка данных ведется из
        сохраненных данных в БД
        :param request:
        :param exchange: имя биржи выделенной в списке выбора бирж
        :param symbol: выбранный инструмент
        :param interval: интервал получения данных
        :return:
        '''

        # получаем записи связанные с инструментом (15 минутные)
        instr = InstrumentByBitLinear.objects.get(symbol='BTCUSDT')
        query = HistoricalDataByBitLinear.objects.filter(coin_id=instr.pk)
        data = get_klines_for_instrument(
            queryset=query,
            interval='1'
        )

        # f = HistoricalDataByBitLinear.objects.first()
        # df = pd.read_json(f.data.path)
        HistoricalDataView.count += 1
        print(id(HistoricalDataView.count))
        print(id(HistoricalDataView.l))
        print(id(self))
        # return Response(
        #     df.to_dict(orient='records'),
        #     status=status.HTTP_200_OK,
        #     content_type='application/json'
        # )
        return Response(
            {'ok': data}
        )

class CategoriesAPIView(APIView):
    '''
    Представление для работы с символами категорий
    '''

    def get(self, request: Request, exchange: str):
        cats = (Exchange.objects.get(title=exchange)
                .categories.all()
                .values('title', 'description'))

        return Response(
            {'categories': cats}
        )

class InstrumentSymbolsAPIView(APIView):
    '''
    Класс для работы с символами инструментов
    '''
    def get(self, request: Request, exchange: str, category: str):
        '''
        При запросе возвращается список доступных инструментов для биржи и категории
        :param request:
        :param exchange:
        :param category:
        :return:
        '''
        data = {
            'Bybit' : {
                'futures': InstrumentByBitLinear,
                'option': InstrumentByBitOption,
                'spot': InstrumentByBitSpot
            },
            'MOEX': {
                'futures': None,
                'option': None,
                'share': None,
                'bond': None,
            },
            'OKX': {
                'futures': None,
                'option': None,
                'spot': None
            },
        }
        model = data.get(exchange, {}).get(category)
        if model:
            symbols = model.objects.all().values('symbol')
            return Response(
                {'symbols': symbols}
            )
        return Response(
            {'symbols': [{'symbol': 'TEST'}]}
        )

