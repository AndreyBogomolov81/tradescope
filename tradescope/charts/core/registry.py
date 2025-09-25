from typing import Any


class RegistryError(Exception):
    pass


class Registry:
    """
    Класс для регистрации модели
    """

    # при первой инициализации пустой
    def __init__(self):
        self._map: dict[str, Any] = {}

    def register(self, name: str, service: Any) -> None:
        if name in self._map:
            raise RegistryError(f"Service with name: {name} already registered")
        self._map[name] = service

    def get(self, name: str) -> Any:
        try:
            return self._map[name]
        except KeyError as e:
            raise RegistryError(f"Service with name {name} is not registered") from e

    def exists(self, name: str) -> bool:
        return name is self._map

    def list_keys(self) -> list[str]:
        return list(self._map.keys())
