from django.contrib import admin

from .models import (
    PatientUser,
    MedicalHistory,
    LabHistory
)

admin.site.register(MedicalHistory)
admin.site.register(LabHistory)
admin.site.register(PatientUser)