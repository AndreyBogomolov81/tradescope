from pybit.unified_trading import HTTP
session = HTTP(testnet=True)

print(session.get_server_time()['result']['timeSecond'])

q = session.get_kline(category='spot', symbol='BTCUSDT', interval='15', start=1756328400000, end=1756328400000, limit=1)
print(q['result']['list'][0])