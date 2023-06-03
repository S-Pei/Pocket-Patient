from rest_framework import serializers

from .models import (
    PatientUser,
    MedicalHistory,
    LabHistory,
    Prescription
)

class PatientUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientUser
        fields = ['patientBirthdate', 'patientAddress']

class MedicalHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalHistory
        fields = ['date', 'summary']

class LabHistorySerializer(serializers.ModelSerializer):
    report = serializers.ImageField(max_length=None, use_url=True, 
                                        allow_null=False, required=True)
    class Meta:
        model = LabHistory
        fields = ('date', 'report')

class PrescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prescription
        fields = ('drug', 'dosage', 'startDate', 'endDate', 'duration', 'route')