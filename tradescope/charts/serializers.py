from rest_framework import serializers


class CategorySerializer(serializers.Serializer):
    title = serializers.CharField()
    system_mark = serializers.CharField()
    description = serializers.CharField()


class InstrumentSerializer(serializers.Serializer):
    symbol = serializers.CharField()
    hasFutures = serializers.BooleanField()
    hasSpot = serializers.BooleanField()
    hasOption = serializers.BooleanField()

    selected = serializers.SerializerMethodField()
    isBase = serializers.SerializerMethodField()

    def get_selected(self, obj):
        # возвращаем нужное значение, например, из другого источника
        return False

    def get_isBase(self, obj):
        # возвращаем нужное значение, например, из другого источника
        return False