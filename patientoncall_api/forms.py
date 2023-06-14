from django.forms import ModelForm, FileField, ClearableFileInput     
from .models import MedicalHistory, ImagingHistory, ImagingUpload

class AddVisitForm(ModelForm):
  class Meta:
      model = MedicalHistory
      exclude = ('id', 'patient')

class AddImagingForm(ModelForm):
  class Meta:
      model = ImagingHistory
      fields = ['date', 'scanType','region', 'indication', 'report']
      # exclude = ('id', 'patient')

class ImagesUploadForm(AddImagingForm):
  image = FileField(required=False, widget=ClearableFileInput(attrs={'allow_multiple_selected': True}))
  
  class Meta(AddImagingForm.Meta):
    fields = AddImagingForm.Meta.fields + ['image',]


