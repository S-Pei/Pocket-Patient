from django.contrib import admin

from .models import (
    MedicalHistory,
    LabHistory
)

admin.site.register(MedicalHistory)
admin.site.register(LabHistory)