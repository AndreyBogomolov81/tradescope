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
    list_of_ts_for_excludes = []
    times = []
    current_endpoint_opt = {
        'exchange': None,
        'symbol': None,
        'interval': None,
        'category': None
    }

    def get(self, request: Request):
        '''
        Функция для получения исторических данных об инструменте, подгрузка данных ведется из
        сохраненных данных в БД
        :param request:
        :return:
        '''
        step = {
            '15t': 2,
            '30t': 2,
            '1h': 3,
            '4h': 6,
            '1DD': 30
        }
        try:
            context = {}

            # получаем параметры запроса
            temp_endpoint_opt = {
                k: v for k, v in request.GET.items()
                if k in HistoricalDataView.current_endpoint_opt.keys()
            }

            # get_bybit_historical_data(
            #     symbol=temp_endpoint_opt.get('symbol')
            # )
            # получаем записи связанные с инструментом (15 минутные)
            instr = InstrumentByBitLinear.objects.get(symbol=temp_endpoint_opt.get('symbol'))

            # если предыдущий запрос отличался хотя бы по одному параметру то иниц записи сначала
            if temp_endpoint_opt != HistoricalDataView.current_endpoint_opt:
                # обновляем старый словарь параметров
                HistoricalDataView.current_endpoint_opt.update(temp_endpoint_opt)
                # обнуляем список временных меток
                HistoricalDataView.list_of_ts_for_excludes = []
                # запрашиваем из БД все записи
                records = instr.historical_data.all().order_by('-end_date')
            else:
                # получаем записи за исключением уже ранее обработанных
                records = (instr.historical_data.all().order_by('-end_date')
                .exclude(
                    end_date__in=HistoricalDataView.list_of_ts_for_excludes)
                )

            # если записи существуют то извлекаем их добавляя в список новые временные метки
            if records.exists():
                chunk = records[:step[temp_endpoint_opt['interval']]]
                HistoricalDataView.list_of_ts_for_excludes.extend(
                    [i.end_date for i in chunk]
                )

                # context['end_date'] = record.end_date
                context['start_date'], context['data'] = get_klines_for_instrument(
                    record=chunk,
                    interval=temp_endpoint_opt.get('interval')
                )
                HistoricalDataView.times.append(dt.fromtimestamp(context['start_date']))
                context['result'] = True

                return Response(
                    context
                )
            else:
                context['result'] = False
                context['message'] = 'All data is downloaded'
                HistoricalDataView.list_of_ts_for_excludes = []
                for item in HistoricalDataView.times:
                    print(item)
                return Response(
                    context
                )
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
