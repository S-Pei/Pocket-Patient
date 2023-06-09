from django.forms import ModelForm      
from .models import MedicalHistory

class AddVisitForm(ModelForm):
  class Meta:
      model = MedicalHistory
      exclude = ('id', 'patient')

