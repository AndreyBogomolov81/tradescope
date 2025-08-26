import asyncio
import time
from datetime import datetime as dt

from django.core.files.base import ContentFile
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

        parser.add_argument("symbol", type=str, help="Символ инструмента")

        parser.add_argument(
            "start_date", type=str, help="Начальная дата в формате dd.mm.yyyy"
        )

        parser.add_argument(
            "end_date", type=str, help="Конечная дата в формате dd.mm.yyyy"
        )

        parser.add_argument("--interval", type=str, help="Интервал", default="15")

    def handle(self, *args, **options):
        start: float = time.time()

        from charts.core import facade

        name_model = options["name_model"]
        data = {
            k: v
            for k, v in options.items()
            if k in ["symbol", "start_date", "end_date", "interval"]
        }
        results = facade.get_candles_from_exchange(name=name_model, **data)
        self.stdout.write(
            "data is ready to be written, time {:.4}".format(time.time() - start)
        )
        facade.download_hist_data(
            name=name_model,
            symbol=data.get("symbol"),
            interval=data.get("interval"),
            array=results,
        )
        self.stdout.write("data recorded, time {:.4}".format(time.time() - start))
