from django.contrib import admin

from .models import (
    PatientUser,
    MedicalHistory,
    LabHistory,
    Medication,
    ImagingHistory,
    ImagingUpload
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

class ImagingHistoryAdmin(admin.ModelAdmin):
    list_display = ('patient','date','region','indication','report',
                    'visitEntry')

class ImagingUploadAdmin(admin.ModelAdmin):
    list_display = ('image', 'imagingEntry')
    
admin.site.register(MedicalHistory, MedicalHistoryAdmin)
admin.site.register(LabHistory, LabHistoryAdmin)
admin.site.register(PatientUser, PatientUserAdmin)
admin.site.register(Medication, MedicationAdmin)
admin.site.register(ImagingHistory, ImagingHistoryAdmin)
admin.site.register(ImagingUpload, ImagingUploadAdmin)