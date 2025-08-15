# app/core/facade.py
from typing import Any
from .registry import Registry, RegistryError
from .factories import repository_factory_for_model

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


    def create_instrument(self, name: str):
        '''
        функция для внесения данных по торгуемым иснтрументам
        :param name: имя модели: spot_bybit,
                    linear_bybit, inverse_bybit, spot_option
        :return:
        '''
        repo = self._get_repo(name)
        repo.create_instrument()

    def list(self, name: str, **filters):
        repo = self._get_repo(name)
        return repo.list(**filters)

    def get(self, name: str, pk):
        repo = self._get_repo(name)
        return repo.get(pk)

    def get_by_symbol(self, name: str, symbol: str):
        repo = self._get_repo(name)
        if hasattr(repo, "get_by_symbol"):
            return repo.get_by_symbol(symbol)
        # fall back
        return repo.get_by(symbol=symbol)

    def create(self, name: str, **data):
        repo = self._get_repo(name)
        return repo.create(**data)

    def update(self, name: str, pk, **data):
        repo = self._get_repo(name)
        return repo.update(pk, **data)

    def delete(self, name: str, pk):
        repo = self._get_repo(name)
        return repo.delete(pk)

    def _get_repo(self, name: str):
        try:
            return self.registry.get(name)
        except RegistryError as e:
            raise DataFacadeError(str(e)) from e