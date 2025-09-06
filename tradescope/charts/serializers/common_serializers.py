from rest_framework import serializers


class CategorySerializer(serializers.Serializer):
    title = serializers.CharField(read_only=True)
    system_mark = serializers.CharField(read_only=True)
    description = serializers.CharField(read_only=True)


class BaseInstrumentSerializer(serializers.Serializer):
    selected = serializers.SerializerMethodField()
    category = serializers.SerializerMethodField()
    exchange = serializers.SerializerMethodField()
    isBase = serializers.SerializerMethodField()

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
