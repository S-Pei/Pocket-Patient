import uuid

from django.db import models


class Patient(models.Model):
  id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  patientId = models.IntegerField(editable=True, default=-1)
  firstname = models.CharField(max_length=500)
  lastname = models.CharField(max_length=500)