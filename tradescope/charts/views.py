from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from charts.exceptions import BadRequestException


class CategoriesAPIView(APIView):
    '''
    Представление для работы с символами категорий
    '''

    def get(self, request: Request, exchange: str):
        exchanges = {
            'bybit': [
                {'title': 'spot', 'description': 'Спот'},
                {'title': 'futures', 'description': 'Фьючерсы'},
                {'title':'options', 'description': 'Опционы'}
            ],
            'okx': [
                {'title': 'spot', 'description': 'Спот'},
                {'title': 'futures', 'description': 'Фьючерсы'},
                {'title':'options', 'description': 'Опционы'}
            ],
        }
        try:
            categories = exchanges.get(exchange.lower())
            if categories is None:
                raise BadRequestException('The exchange is not registered')

            context = {
                'result': True,
                'data': {'categories': categories, 'baseCategory': 'spot'}
            }
            return Response(
                context
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
