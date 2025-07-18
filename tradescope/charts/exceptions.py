from rest_framework.exceptions import APIException

class HistoricalDataNotFoundException(APIException):
    status_code = 404
    default_detail = 'Запись не найдена.'
    default_code = 'not_found'

