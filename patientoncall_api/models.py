from datetime import datetime
import uuid

from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class PatientUser(models.Model):
  patientId = models.IntegerField(primary_key=True, default=None, editable=True)
  patient = models.ForeignKey(User, on_delete=models.CASCADE)
  patientBirthdate = models.DateField(blank=True, null=True)
  patientAddress = models.CharField(max_length=1024, default="", blank=True, null=True)

VISIT_TYPE = (
   ('GP Consultation', 'GP Consultation'),
   ('Hospital Visit', 'Hospital Visit')
)
class MedicalHistory(models.Model):
  id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  patient = models.ForeignKey(User, on_delete=models.CASCADE)
  admissionDate = models.DateField(default=datetime.today, blank=True, null=True)
  dischargeDate = models.DateField(default=datetime.today, blank=True, null=True)
  summary = models.CharField(max_length=1024, default="", blank=True, null=True)
  consultant =models.CharField(max_length=64, default="", blank=True, null=True)
  visitType = models.CharField(max_length=20, choices=VISIT_TYPE, default='Hospital Visit')
  letter = models.FileField(upload_to='letterattachments/', blank=True, null=True, default=True)


class LabHistory(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    patient = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField()
    report = models.ImageField(blank=True, null=True)


class Prescription(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    patient = models.ForeignKey(User, on_delete=models.CASCADE)
    drug = models.CharField(max_length=256)
    dosage = models.CharField(max_length=1024)
    startDate = models.DateField()
    endDate = models.DateField()
    duration = models.CharField(max_length=1024)
    route = models.CharField(max_length=1024)
    status = models.CharField(max_length=32, default="current")