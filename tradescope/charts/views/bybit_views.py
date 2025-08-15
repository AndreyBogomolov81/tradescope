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
from ..serializers import CategorySerializer
from ..core import facade

class CategoriesBybitAPIView(APIView):
    '''
    Представление для работы с символами категорий
    '''

    def get(self, request: Request):
        instrument_models = {
            'spot': InstrumentBybitSpot,
            'linear': InstrumentBybitLinear,
            'inverse': InstrumentBybitInverse,
            'option': InstrumentBybitOption
        }
        try:
            categories = CategoryBybit.objects.all()
            # выполняем проверку если есть хотя бы одна запись то отправляем ее клиенту
            categories = [
                i for i in categories
                if instrument_models[i.system_mark].objects.exists()
            ]
            serialize = CategorySerializer(categories, many=True)
            context = {
                'result': True,
                'data': serialize.data
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

    def get(self, request: Request):

        # функции CRUD работают через фасад с объектом repository, таким образом
        # фасад должен реализовывать все методы которые есть у repository
        spot_qs = facade.get_data_from_exchange('spot_bybit')

        return Response({'mg': 'Ok'})

