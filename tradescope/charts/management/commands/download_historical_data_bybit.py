from datetime import datetime as dt
import asyncio

from django.core.management import BaseCommand
from django.core.files.base import ContentFile

from charts.utils import get_klines, get_cleared_dataset
from charts.models import InstrumentByBitLinear, HistoricalDataByBitLinear, InstrumentBybit


class Command(BaseCommand):
    help = 'Получения исторических данных по конкретному инструменту с ByBit'

    def add_arguments(self, parser):
        parser.add_argument(
            '--category',
            type=str,
            help='категория'
        )

        parser.add_argument(
            'symbol',
            type=str,
            help='Символ инструмента'
        )

        parser.add_argument(
            'start_date',
            type=str,
            help='Начальная дата в формате dd.mm.yyyy'
        )

        parser.add_argument(
            'end_date',
            type=str,
            help='Конечная дата в формате dd.mm.yyyy'
        )

        parser.add_argument(
            '--interval',
            type=str,
            help='Интервал',
            default='15'
        )

    def handle(self, *args, **options):
        try:
            instrument = InstrumentByBitLinear.objects.get(
                symbol=options['symbol']
            )
            start_date = dt.strptime(
                options['start_date'],
                '%d.%m.%Y'
            )

            end_date = dt.strptime(
                options['end_date'],
                '%d.%m.%Y'
            )

            # # получаем набор неочищенных данных
            raw_data = asyncio.run(get_klines(
                symbol=options['symbol'],
                category=options['category'],
                interval=options['interval'],
                start_date=start_date,
                end_date=end_date
            ))
            count = 0
            for item in raw_data:
                # получаем строку json для
                start, end, cleared_data = get_cleared_dataset(item['result']['list'])
                file_name = '{symbol}_{start}_{end}.json'.format(
                    symbol=options['symbol'],
                    start=start,
                    end=end
                )
                # создаем объект
                hd = HistoricalDataByBitLinear(
                    coin=instrument,
                    start_date=start,
                    end_date=end,
                    interval=options['interval']
                )
                content = ContentFile(cleared_data, name=file_name)
                hd.data.save(file_name, content)
                count += 1
            self.stdout.write(f'Загружено файлов: {count}')

        except Exception as e:
            error_type = type(e).__name__
            error_message = str(e)
            self.stderr.write(
                f'Команда выполнена с ошибкой {error_type}: {error_message}'
            )
