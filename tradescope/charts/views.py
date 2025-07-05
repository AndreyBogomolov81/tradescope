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
)

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
    exchange_default = exchanges.get(title='Bybit')
    instruments = InstrumentByBitSpot.objects.all()
    instr_sym_for_spot = instruments.values('symbol')
    return render(
        request,
        'charts/test_chart.html',
        {
            'intervals': tf,
            'exchanges': exchanges,
            'exchange_default': exchange_default,
            'instruments': instr_sym_for_spot
        }
    )

class KlineDataView(APIView):
    count = 0
    l = 15
    def get(self, request: Request):
        # f = HistoricalDataByBitLinear.objects.first()
        # df = pd.read_json(f.data.path)
        KlineDataView.count += 1
        print(id(KlineDataView.count))
        print(id(KlineDataView.l))
        print(id(self))
        # return Response(
        #     df.to_dict(orient='records'),
        #     status=status.HTTP_200_OK,
        #     content_type='application/json'
        # )
        return Response(
            {'ok': KlineDataView.count}
        )
