from django.http import HttpResponse
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import mixins, generics, status
import json
import pandas as pd
from datetime import datetime as dt

from .models import (
    HistoricalDataByBitLinear,
    Exchange,
    InstrumentByBitSpot,
    InstrumentByBitOption,
    InstrumentByBitLinear,
    Category,
    get_bybit_historical_data
)
from .utils import get_klines_for_instrument
from .exceptions import BadRequestException


# Create your views here.
def test_view(request):
    '''
    Функция представление для инициализации графика
    по умолчанию принимается на данный
    :param request:
    :return:
    '''
    tf = ['1h', '4h', '1D', '1W']
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
    request_keys = ['exchange', 'symbol', 'interval', 'category', 'part_data']

    def get(self, request: Request):
        '''
        Функция для получения исторических данных об инструменте, подгрузка данных ведется из
        сохраненных данных в БД
        :param request:
        :return:
        '''
        try:
            context = {}
            # получаем параметры запроса
            temp_endpoint_opt = {
                k: v for k, v in request.GET.items()
                if k in HistoricalDataView.request_keys
            }
            # get_bybit_historical_data(
            #     symbol=temp_endpoint_opt.get('symbol')
            # )
            # получаем записи связанные с инструментом (15 минутные)
            instr = InstrumentByBitLinear.objects.get(
                symbol=temp_endpoint_opt.get('symbol')
            )
            records = instr.historical_data.all().order_by('-end_date')

            # если записи существуют то извлекаем их добавляя в список новые временные метки
            if records.exists():
                # получим параметр part
                part_data = temp_endpoint_opt['part_data']
                if part_data.isdigit():
                    chunk = records[:int(part_data)]
                else:
                    chunk = records

                context['start_date'], context['data'] = get_klines_for_instrument(
                    record=chunk,
                    interval=temp_endpoint_opt.get('interval')
                )
                context['result'] = True

                return Response(
                    context
                )
            else:
                raise BadRequestException('No data yet')
        except Exception as exc:
            return Response(
                {
                    'result': False,
                    'error_type': type(exc).__name__,
                    'error_message': str(exc)
                },
                status=status.HTTP_404_NOT_FOUND
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
            'Bybit': {
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
