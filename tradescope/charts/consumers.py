# app/consumers.py
import asyncio
import json
import logging
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.layers import get_channel_layer
import websockets

# logger = logging.getLogger(__name__)

# Примерный endpoint (проверьте актуальность у биржи)
BYBIT_WS_URL = "wss://stream.bybit.com/v5/public/spot"

# глобальные объекты для единственной фон.таски
_background_task = None
_background_task_lock = asyncio.Lock()

async def bybit_background_task():
    """
    Фоновая задача: подключается к Bybit и шлёт все сообщения в группу 'bybit'.
    Переподключается при ошибке с паузой.
    """
    channel_layer = get_channel_layer()
    while True:
        try:
            async with websockets.connect(BYBIT_WS_URL) as ws:
                # Если нужно, подпишитесь на конкретный топик:
                await ws.send(json.dumps({"op":"subscribe","args":["tickers.BTCUSDT"]}))

                async for raw in ws:
                    try:
                        msg = json.loads(raw)
                    except Exception:
                        msg = { "raw": raw }

                    # разослать во все подключения в группе 'bybit'
                    await channel_layer.group_send("bybit", {
                        "type": "bybit.message",
                        "message": msg,
                    })
        except Exception as exc:
            # logger.exception("Bybit background error: %s", exc)
            # пауза перед попыткой reconnect
            await asyncio.sleep(3)

class ProxyConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        # добавить в группу 'bybit'
        await self.channel_layer.group_add("bybit", self.channel_name)

        # запуск фоновой задачи однажды
        global _background_task
        async with _background_task_lock:
            if _background_task is None or _background_task.done():
                _background_task = asyncio.create_task(bybit_background_task())

        # отправка приветственного сообщения
        await self.send(text_data=json.dumps({"info": "connected"}))

    async def disconnect(self, close_code):
        # убрать из группы
        await self.channel_layer.group_discard("bybit", self.channel_name)

    async def bybit_message(self, event):
        # event: {"type":"bybit.message","message": {...}}
        await self.send(text_data=json.dumps(event["message"]))

    async def receive(self, text_data=None, bytes_data=None):
        # опция: клиент может отправлять команды (subscribe/unsubscribe)
        if text_data:
            data = json.loads(text_data)
            # можно обработать commands от клиента здесь
            await self.send(text_data=json.dumps({"echo": data}))
