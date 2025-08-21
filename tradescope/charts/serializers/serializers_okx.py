from rest_framework import serializers
from .common_serializers import BaseInstrumentSerializer


class InstrumentOKXSerializer(BaseInstrumentSerializer):
    title = serializers.CharField(source='instId', read_only=True)
