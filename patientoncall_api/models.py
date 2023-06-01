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
  date = models.DateField()
  summary = models.TextField(max_length=2048)

class LabHistory(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    patient = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField()
    report = models.ImageField(upload_to="labreportimages/")
