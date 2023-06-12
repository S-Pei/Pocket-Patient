from django.forms import ModelForm      
from .models import MedicalHistory, ImagingHistory

class AddVisitForm(ModelForm):
  class Meta:
      model = MedicalHistory
      exclude = ('id', 'patient')

class AddImagingForm(ModelForm):
  class Meta:
      model = ImagingHistory
      exclude = ('id', 'patient')

