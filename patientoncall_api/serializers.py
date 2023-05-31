from rest_framework import serializers

from .models import (
    MedicalHistory,
    LabHistory
)

class MedicalHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalHistory
        fields = ['date', 'summary']

class LabHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = LabHistory
        fields = ['date', 'reportUrl']