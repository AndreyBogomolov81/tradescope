# tradescope/asgi.py
import os
import django
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.urls import re_path

# импорт consumer
from charts.consumers import ProxyConsumer   # <- скорректируйте путь

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "tradescope.settings")
django.setup()

django_asgi_app = get_asgi_application()

application = ProtocolTypeRouter({
    "http": django_asgi_app,   # обрабатывает обычные HTTP запросы
    "websocket": AuthMiddlewareStack(
        URLRouter([
            re_path(r"ws/proxy/$", ProxyConsumer.as_asgi()),  # ваш ws маршрут
            # добавьте другие маршруты при необходимости
        ])
    ),
})

# команда для запуска daphne -b 127.0.0.1 -p 8000 tradescope.asgi:application