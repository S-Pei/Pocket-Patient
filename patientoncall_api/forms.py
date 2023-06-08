from django import forms
from django.forms import ModelForm      
from .models import MedicalHistory

class AddVisitForm(ModelForm):
  class Meta:
      model = MedicalHistory
      exclude = ('id', 'patient')

  # def clean(self):
  #   cleaned_data = super().clean()
  #   start_date = cleaned_data.get("admissionDate")
  #   end_date = cleaned_data.get("dischargeDate")
  #   if end_date < start_date:
  #       raise forms.ValidationError("End date should be greater than start date.")

