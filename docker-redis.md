# команды docker для запуска redis

+ Установка и запуск контейнера
```commandline
docker run -d --name redis-local -p 6379:6379 redis:7
```
+ Проверить, что Redis запущен:
```commandline
# список контейнеров
docker ps

# зайти в контейнер (имя/ид можно узнать из docker ps)
docker exec -it redis redis-cli

# внутри контейнера можно выполнять те же команды:
> PING
PONG
> INFO

```

+ Посмотреть ключи и значения Внимание: KEYS * опасно на проде (блокирует при миллионах ключей). Используйте SCAN
```commandline
# быстрый просмотр небольшого количества ключей (dev)
redis-cli KEYS '*'

# безопаснее — итеративный SCAN
redis-cli SCAN 0 MATCH '*' COUNT 100

# узнать TTL ключа (в секундах)
redis-cli TTL mykey

# получить значение
redis-cli GET mykey

# для списков, множества, хэшей
redis-cli LRANGE mylist 0 100
redis-cli SMEMBERS myset
redis-cli HGETALL myhash

```
+ Pub/Sub и подписки
```commandline
# список активных pubsub каналов
redis-cli PUBSUB CHANNELS

# сколько подписчиков на канал
redis-cli PUBSUB NUMSUB mychannel

# мониторинг сообщений (подписчик)
redis-cli SUBSCRIBE mychannel

```

+ Живой монитор команд (только для отладки, нагрузочный)
```commandline
redis-cli MONITOR
# покажет все команды, которые приходят на сервер в реальном времени

```

+ Список клиентов (кто подключён)
```commandline
redis-cli CLIENT LIST
# выведет IP:порт, idle, db, name и т.д.

```
+ 