from rest_framework import serializers


class InstrumentOKXSerializer(serializers.Serializer):
    title = serializers.CharField(source='instId', read_only=True)

    selected = serializers.SerializerMethodField()
    category = serializers.SerializerMethodField()
    isBase = serializers.SerializerMethodField()
    data = serializers.SerializerMethodField()

    def get_selected(self, obj):
        # возвращаем нужное значение, например, из другого источника
        return False

    def get_isBase(self, obj):
        # возвращаем нужное значение, например, из другого источника
        return False

    def get_data(self, obj):
        # возвращаем нужное значение, например, из другого источника
        return

    def get_category(self, obj):
        return self.context.get('category')
