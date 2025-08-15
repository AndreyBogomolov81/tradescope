from django.core.management import BaseCommand

class Command(BaseCommand):
    '''
    Команда создания инструментов при инициализации приложения
    ключи для категорий:
    '''
    help = 'Команда для инициализации данными об инструментах с ByBit'


    def add_arguments(self, parser):
        parser.add_argument(
            '--name-model',
            type=str,
            help='имя модели: spot_bybit, linear_bybit, inverse_bybit, option_bybit'
        )

    def handle(self, *args, **options):
        # создаем фасад и регистрируем модели
        from charts.core import facade

        try:
            name_model = options['name_model']
            self.stdout.write(f'Модель: {name_model}')
            facade.create_instrument_by_category(name_model)
            self.stdout.write(f'Данные внесены')
        except Exception as e:
            error_type = type(e).__name__
            error_message = str(e)
            self.stderr.write(
                f'Команда выполнена с ошибкой {error_type}: {error_message}'
            )

