from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from charts.exceptions import BadRequestException
from ..models import (
    CategoryOKX
)
from ..serializers import CategorySerializer, InstrumentOKXSerializer
from ..core import facade


class CategoriesOKXAPIView(APIView):
    '''
    Представление для работы с символами категорий
    '''

    def get(self, request: Request):

        try:
            categories = CategoryOKX.objects.all()
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


class InstrumentOKXAPIView(APIView):
    '''
    Класс представление для выдачи всех занесенных в БД
    инструментов
    '''

    def get(self, request: Request):
        context = {'result': True, 'data': []}
        categories = CategoryOKX.objects.all()
        for cat in categories:
            qs = facade.get_all_instruments(cat.title)
            serializer = InstrumentOKXSerializer(
                qs,
                context={
                    'category': cat.description,
                    'exchange': 'OKX'
                }, many=True
            )

            context['data'].append(
                {
                    'category': cat.description,
                    'instruments': serializer.data
                }
            )

        return Response(context)
