from django.core.management import BaseCommand
from pybit.unified_trading import HTTP

from charts.models import (
    InstrumentByBitLinear,
    InstrumentByBitSpot,
    InstrumentByBitOption
)


class Command(BaseCommand):
    '''
    Команда создания инструментов при инициализации приложения
    '''
    help = 'Команда для инициализации данными об инструментах с ByBit'

    def _create_objects(self, model, instruments):
        count = 0
        for item in instruments:
            count += 1
            model.objects.create(**item)

        return count


    def add_arguments(self, parser):
        parser.add_argument(
            '--category',
            type=str,
            help='категория'
        )

    def handle(self, *args, **options):
        category = options['category']
        session = HTTP()
        count = 0
        try:
            if category is None:
                raise ValueError('значение категория не передано')
            elif not category in ['linear', 'spot', 'option']:
                raise ValueError('неверно указана категория')

            instruments = session.get_instruments_info(
                category=category
            )['result']['list']

            if category == 'linear':
                count = self._create_objects(InstrumentByBitLinear, instruments)
            elif category == 'spot':
                count = self._create_objects(InstrumentByBitSpot, instruments)
            elif category == 'option':
                count = self._create_objects(InstrumentByBitOption, instruments)

            self.stdout.write(
                f'Команда выполнена успешно, загружено инструментов: {count}'
            )
        except Exception as e:
            error_type = type(e).__name__
            error_message = str(e)
            self.stderr.write(
                f'Команда выполнена с ошибкой {error_type}: {error_message}'
            )
