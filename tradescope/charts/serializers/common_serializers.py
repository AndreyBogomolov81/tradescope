from datetime import datetime as dt

from rest_framework import serializers
from django.db.models import Min, Max


class CategorySerializer(serializers.Serializer):
    title = serializers.CharField(read_only=True)
    system_mark = serializers.CharField(read_only=True)
    description = serializers.CharField(read_only=True)


class BaseInstrumentSerializer(serializers.Serializer):
    selected = serializers.SerializerMethodField()
    category = serializers.SerializerMethodField()
    exchange = serializers.SerializerMethodField()
    isBase = serializers.SerializerMethodField()
    update_date = serializers.SerializerMethodField()

    def get_selected(self, obj):
        # возвращаем нужное значение, например, из другого источника
        return False

    def get_isBase(self, obj):
        # возвращаем нужное значение, например, из другого источника
        return False

    def get_category(self, obj):
        return self.context.get('category')

    def get_exchange(self, obj):
        return self.context.get('exchange')

    def get_update_date(self, obj):
        try:
            hd = obj.hist_data.all()
            if hd.exists():
                min_date = dt.strftime(
                    dt.fromtimestamp(hd.aggregate(
                        min_date=Min('start_date'))['min_date']),
                    '%d.%m.%Y %H:%M'
                )
                max_date = dt.strftime(
                    dt.fromtimestamp(hd.aggregate(
                        max_date=Max('end_date'))['max_date']),
                    '%d.%m.%Y %H:%M'
                )
                return f'{min_date} - {max_date}'
            return 'Нет данных'
        except AttributeError as e:
            return 'Нет данных'
