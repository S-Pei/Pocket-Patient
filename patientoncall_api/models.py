import uuid

from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class PatientUser(models.Model):
  patientId = models.IntegerField(primary_key=True, default=None, editable=True)
  patient = models.ForeignKey(User, on_delete=models.CASCADE)
  patientBirthdate = models.DateField(blank=True, null=True)
  patientAddress = models.TextField(max_length=1024, default="", blank=True, null=True)

class MedicalHistory(models.Model):
  id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  patient = models.ForeignKey(User, on_delete=models.CASCADE)
  admissionDate = models.DateField(blank=True, null=True)
  dischargeDate = models.DateField(blank=True, null=True)
  summary = models.TextField(max_length=2048, blank=True, null=True)
  consultant = models.TextField(max_length=64, blank=True, null=True)
  visitType = models.TextField(max_length=32, blank=True, null=True)

class LabHistory(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    patient = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField()
    report = models.ImageField(upload_to="labreportimages/")

class Prescription(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    patient = models.ForeignKey(User, on_delete=models.CASCADE)
    drug = models.TextField(max_length=256)
    dosage = models.TextField(max_length=1024)
    startDate = models.DateField()
    endDate = models.DateField()
    duration = models.TextField(max_length=1024)
    route = models.TextField(max_length=1024)