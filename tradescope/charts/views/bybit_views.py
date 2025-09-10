import time
from datetime import datetime as dt

from charts.exceptions import BadRequestException
from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from ..core import facade
from ..models import (
    CategoryBybit,
    InstrumentBybitInverse,
    InstrumentBybitLinear,
    InstrumentBybitOption,
    InstrumentBybitSpot,
)
from ..serializers import CategorySerializer, InstrumentBybitSerializer


class CategoriesBybitAPIView(APIView):
    """
    Представление для работы с символами категорий
    """

    def get(self, request: Request):

        try:
            categories = CategoryBybit.objects.all()
            serializer = CategorySerializer(categories, many=True)
            context = {"result": True, "data": serializer.data}
            return Response(context, status=status.HTTP_200_OK)
        except BadRequestException as exc:
            return Response(
                {
                    "result": False,
                    "error_type": type(exc).__name__,
                    "error_message": str(exc),
                },
                status=status.HTTP_404_NOT_FOUND,
            )
        except Exception as exc:
            return Response(
                {
                    "result": False,
                    "error_type": type(exc).__name__,
                    "error_message": str(exc),
                },
                status=status.HTTP_404_NOT_FOUND,
            )


#
class InstrumentBybitAPIView(APIView):
    """
    Класс представление для выдачи всех занесенных в БД
    инструментов
    """

    def get(self, request: Request):
        context = {"result": True, "data": []}
        categories = CategoryBybit.objects.all()
        for cat in categories:
            qs = facade.get_all_instruments(cat.title)
            serializer = InstrumentBybitSerializer(
                qs,
                context={"category": cat.description, "exchange": "Bybit"},
                many=True,
            )
            data = serializer.data
            if cat.title == "spot_bybit":
                for i in data:
                    if i["title"] == "BTCUSDT":
                        i["selected"] = i["isBase"] = True
                        break
            context["data"].append(
                {
                    "category": cat.description,
                    "instruments": data
                }
            )

        return Response(context)


class CandlesDataBybitAPIView(APIView):
    """
    Класс для получения свечных данных
    """
    historical_data = {}

    def get(self, request: Request):
        try:
            start_t1: float = time.time()

            symbol = request.GET.get("symbol")
            name_model = request.GET.get("category")
            interval = request.GET.get('interval')
            count = int(request.GET.get('count'))

            if not (symbol and name_model and interval):
                raise BadRequestException('bad request')

            key = '_'.join([name_model, symbol])
            d: dict = CandlesDataBybitAPIView.historical_data
            temp: list = d.get(key, {}).get(interval)
            if temp:
                candles = temp[count] if count < len(temp) else None
                max_value = d.get(key, {}).get('max_value')
            else:
                max_value, result = facade.get_candles(
                    name=name_model,
                    symbol=symbol,
                    interval=interval
                )
                d.setdefault(key, {})[interval] = result
                d.setdefault(key, {})['max_value'] = max_value
                candles = d[key][interval][0]

            context = {
                'result': True,
                'data': {
                    'symbol': symbol,
                    'category': name_model,
                    'interval': interval,
                    'candles': candles,
                    'max_value': max_value
                }
            }
            return Response(context)
        except BadRequestException as exc:
            return Response(
                {
                    "result": False,
                    "error_type": type(exc).__name__,
                    "error_message": str(exc),
                },
                status=status.HTTP_404_NOT_FOUND,
            )
        except Exception as exc:
            return Response(
                {
                    "result": False,
                    "error_type": type(exc).__name__,
                    "error_message": str(exc),
                },
                status=status.HTTP_404_NOT_FOUND,
            )
