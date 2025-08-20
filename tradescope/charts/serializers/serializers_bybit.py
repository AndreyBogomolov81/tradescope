from rest_framework import serializers
from .common_serializers import BaseInstrumentSerializer


class InstrumentBybitSerializer(BaseInstrumentSerializer):
    title = serializers.CharField(source='symbol', read_only=True)
