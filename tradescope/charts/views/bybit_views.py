from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from charts.exceptions import BadRequestException

from ..models import (
    CategoryBybit,
    InstrumentBybitSpot,
    InstrumentBybitLinear,
    InstrumentBybitInverse,
    InstrumentBybitOption
)
from ..serializers import (
    CategorySerializer,
    InstrumentBybitSerializer
)
from ..core import facade


class CategoriesBybitAPIView(APIView):
    '''
    Представление для работы с символами категорий
    '''

    def get(self, request: Request):

        try:
            categories = CategoryBybit.objects.all()
            serializer = CategorySerializer(categories, many=True)
            context = {
                'result': True,
                'data': serializer.data
            }
            return Response(
                context,
                status=status.HTTP_200_OK
            )
        except BadRequestException as exc:
            return Response(
                {
                    'result': False,
                    'error_type': type(exc).__name__,
                    'error_message': str(exc)
                },
                status=status.HTTP_404_NOT_FOUND
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


#
class InstrumentBybitAPIView(APIView):
    '''
    Класс представление для выдачи всех занесенных в БД
    инструментов
    '''

    def get(self, request: Request):
        context = {'result': True, 'data': []}
        categories = CategoryBybit.objects.all()
        for cat in categories:
            qs = facade.get_all_instruments(cat.title)
            serializer = InstrumentBybitSerializer(
                qs,
                context={
                    'category': cat.description,
                    'exchange': 'Bybit'
                }, many=True
            )
            data = serializer.data
            if cat.title == 'spot_bybit':
                for i in data:
                    if i['title'] == 'BTCUSDT':
                        i['selected'] = i['isBase'] = True
                        break
            context['data'].append(
                {
                    'category': cat.description,
                    'instruments': data
                }
            )

        return Response(context)
