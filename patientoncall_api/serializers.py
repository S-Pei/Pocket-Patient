from rest_framework import serializers

from .models import (
    PatientUser,
    MedicalHistory,
    LabHistory,
    Medication,
    Diary
)

class PatientUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientUser
        fields = ['patientBirthdate', 'patientAddress']

class MedicalHistorySerializer(serializers.ModelSerializer):
    letter = serializers.FileField(max_length=None, allow_empty_file=True, use_url=True)
    class Meta:
        model = MedicalHistory
        fields = ['id', 'admissionDate', 'dischargeDate', 'consultant', 
                  'summary', 'visitType', 'letter', 'addToMedicalHistory']

class LabHistorySerializer(serializers.ModelSerializer):
    report = serializers.ImageField(max_length=None, use_url=True, 
                                        allow_null=False, required=True)
    class Meta:
        model = LabHistory
        fields = ('date', 'report')

class MedicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medication
        fields = ('id', 'drug', 'dosage', 'startDate', 'endDate', 'duration', 'route', 'status', 'comments')


class DiarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Diary
        fields = ('date', 'content')
