import time
from datetime import datetime as dt

from django.core.management import BaseCommand


class Command(BaseCommand):
    help = "Получения исторических данных по конкретному инструменту с ByBit"

    def add_arguments(self, parser):
        parser.add_argument(
            "--name-model",
            type=str,
            help="имя модели: "
                 "spot_bybit, linear_bybit, inverse_bybit, option_bybit, "
                 "spot_okx, margin_okx, swap_okx, futures_okx",
        )

        parser.add_argument(
            "symbol",
            type=str,
            help="Символ инструмента"
        )

        parser.add_argument(
            "start_date",
            type=str,
            help="Начальная дата в формате dd.mm.yyyy"
        )

        parser.add_argument(
            "end_date",
            type=str,
            help="Конечная дата в формате dd.mm.yyyy"
        )


    def handle(self, *args, **options):
        start_foo: float = time.time()

        from charts.core import facade
        name_model = options["name_model"]
        symbol = options['symbol']
        start_date = dt.strptime(options['start_date'], '%d.%m.%Y')
        end_date = dt.strptime(options['end_date'], '%d.%m.%Y')
        self.stdout.write(
            f'Загрузка данных для инструмента {symbol}, модель {name_model}'
        )

        facade.create_or_update_hist_data(
            name=name_model,
            symbol=symbol,
            start_date=start_date,
            end_date=end_date
        )
        self.stdout.write(
            'Загрузка завершена: {:.4}'.format(time.time() - start_foo)
        )
