import asyncio
from typing import Any

from .factories import repository_factory_for_model
from .registry import Registry, RegistryError


class DataFacadeError(Exception):
    pass


class DataFacade:
    """Фасад — единый API для всех зарегистрированных репозиториев."""

    # передаем объект регистратор
    def __init__(self, registry: Registry):
        self.registry = registry

    # при вызове с объекта фасад
    def register_model(self, name: str, model: Any, repo_factory=None) -> None:
        if repo_factory is None:
            # возвращается объект Repository инициализированный сязанной моделью данных
            # функция подменяет переданную модель на связанный repository
            repo = repository_factory_for_model(model)
        else:
            repo = repo_factory(model)
        self.registry.register(name, repo)

    def create_instrument_by_category(self, name: str):
        """
        функция для внесения данных по торгуемым иснтрументам
        :param name: имя модели: spot_bybit,
                    linear_bybit, inverse_bybit, spot_option
        :return:
        """
        repo = self._get_repo(name)
        repo.create_instruments_by_category()

    def get_all_instruments(self, name: str):
        repo = self._get_repo(name)
        return repo.get_all_instruments()

    async def create_or_update_historical_data(self, name, **options):
        """
        Функция для добавления исторических данных в БД
        :param name:
        :return:
        """
        repo = self._get_repo(name)
        options.update({"category": repo.category})
        return await repo.get_candles_from_exchange(**options)

    def download_hist_data(self, name, symbol, interval, array):
        repo = self._get_repo(name)
        return repo.download_hist_data(symbol, interval, array)

    def get_candles_from_exchange(self, name, **options):
        repo = self._get_repo(name)
        options.update({"category": repo.category})
        return asyncio.run(repo.get_candles_from_exchange(**options))

    def _get_repo(self, name: str):
        try:
            return self.registry.get(name)
        except RegistryError as e:
            raise DataFacadeError(str(e)) from e
