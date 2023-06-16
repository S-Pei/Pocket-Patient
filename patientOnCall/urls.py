from django.urls import path
from . import views
from patientoncall_api.views import addVisit, addImaging, uploadLetter, uploadReport, uploadImages, addLab, uploadLab

urlpatterns = [
    path('', views.index, name='index'),
    path('main/', views.displayInfo, name='patient-info'),
    path('medication/', views.displayMedication, name='patient-medication'),
    path('visit/', views.displayVisit, name='hospital-visit'),
    path('add-visit/', addVisit, name='add-visit'),
    path('edit-visit/<str:id>/', views.displayEditVisit, name='edit-visit'),
    path('edit-medication/', views.newMedication, name='edit-medication'),
    path('add-medication/', views.addMedication, name='add-medication'),
    path('lab-history/', views.displayLabHistory, name='lab-history'),
    path('patient-diary/', views.patientDiary, name='patient-diary'),
    path('patient-diary-categories/', views.patientDiaryCategories, name='patient-diary-caegories'),
    path('patient-diary/entry/', views.readDiaryEntry, name='patient-diary-read'),
    path('imaging/', views.displayImaging, name='imaging'),
    path('add-imaging/', addImaging, name='add-imaging'),
    path('scan-type/<str:id>/', views.displayScanType, name='scan-type'),
    path('edit-scan/<str:scanType>/<str:id>/', views.displayEditScan, name='patient-edit-scan'),
    path('edit-visit/<str:id>/upload-letter/<str:visitID>', uploadLetter, name='upload-letter'),
    path('edit-scan/<str:scanType>/<str:id>/upload-report/<str:imagingID>', uploadReport, name='upload-report'),
    path('edit-scan/<str:scanType>/<str:id>/upload-images/<str:imagingID>', uploadImages, name='upload-images'),
    path('lab-type/<str:id>/', views.displayLabType, name='lab-type'),
    path('add-lab/', addLab, name='add-lab'),
    path('edit-lab/<str:labType>/<str:id>/', views.displayEditLab, name='patient-edit-lab'),
    path('edit-lab/<str:labType>/<str:id>/upload-lab/<str:labID>', uploadLab, name='upload-lab'),
]
