from django.contrib import admin

from .models import (
    PatientUser,
    MedicalHistory,
    LabHistory,
    Medication,
    Diary
)

class PatientUserAdmin(admin.ModelAdmin):
    list_display = ('patientId', 'patient', 
                    'patientBirthdate', 'patientAddress')

class MedicalHistoryAdmin(admin.ModelAdmin):
    list_display = ('patient', 'admissionDate', 'dischargeDate', 
                    'consultant', 'summary', 'visitType', 'letter', 
                    'addToMedicalHistory')
    
class LabHistoryAdmin(admin.ModelAdmin):
    list_display = ('patient', 'date', 'report')

class MedicationAdmin(admin.ModelAdmin):
    list_display = ('patient', 'drug', 'dosage', 'startDate', 'endDate', 
                    'duration', 'route', 'status', 'comments')

class DiaryAdmin(admin.ModelAdmin):
    list_display = ('patient', 'date', 'content')

admin.site.register(MedicalHistory, MedicalHistoryAdmin)
admin.site.register(LabHistory, LabHistoryAdmin)
admin.site.register(PatientUser, PatientUserAdmin)
admin.site.register(Medication, MedicationAdmin)
admin.site.register(Diary, DiaryAdmin)