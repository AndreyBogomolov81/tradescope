# Разработка web приложения для анализа рынков


1 по графикам:
+ вывести из БД инструменты в dropdown (или удалить dropdown и настроит диалоговое окно для выбора инструментов)
+ использовать функцию fetch для загрузки котировок для графика
+ отображать полную информацию на временной шкале (точность в минутах)
+ реализовать отмену рисования горизонтальной линии клавишей esc
+ настроит шкалу объемов
+ реализовать сворачиваемость окна графика с размещением под ним окна уровней
+ реализовать окно выбора индикаторов с нанесением их на график

+ получить основные инструменты по byBit занести в БД (инструменты по рынкам: опционы, спот, фьючерсы)

2 по функционалу сервера:
+ настроить БД postgres: сделано
+ создать в приложении команды для добавления инструментов: сделано
+ создать в приложении команды для обновления инструментов

2.1 получение котировок
+ сохранять исторические данные для тестирования: сделана команда
+ учитывается то что данные дял передачи доолжны быть огрнаичены размером сделано
```python
#пример сохранения файла в модели
file_to_save = '/home/andrey/PycharmProjects/Django_projects/tradescope.ru/tradescope/quotes/btc.json'

# получим имя файла
file_name = file_to_save.rsplit('/',1)[1] #btc.json

#получим контент файла
from django.core.files import File

with open(file_to_save, 'rb') as f:
    django_file = File(f)
```