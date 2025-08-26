from rest_framework import serializers
from .common_serializers import BaseInstrumentSerializer


class InstrumentBybitSerializer(BaseInstrumentSerializer):
    title = serializers.CharField(source='symbol', read_only=True)


class CandleBybitSerializer(serializers.Serializer):
   time = serializers.FloatField(source='startTime')
   open = serializers.FloatField(source='openPrice')
   high = serializers.FloatField(source='highPrice')
   low = serializers.FloatField(source='lowPrice')
   close = serializers.FloatField(source='closePrice')