from django.urls import path
from . import views
from patientoncall_api.views import addVisit, addImaging

urlpatterns = [
    path('', views.index, name='index'),
    path('main/', views.displayInfo, name='patient-info'),
    path('medication/', views.displayMedication, name='patient-medication'),
    path('visit/', views.displayVisit, name='patient-hospital-visit'),
    path('add-visit/', addVisit, name='patient-add-visit'),
    path('edit-visit/<str:id>/', views.displayEditVisit, name='patient-edit-visit'),
    path('edit-medication/', views.newMedication, name='edit-medication'),
    path('add-medication/', views.addMedication, name='add-medication'),
    path('lab-history/', views.displayHistory, name='lab-history'),
    path('patient-diary/', views.patientDiary, name='patient-diary'),
    path('patient-diary/entry/', views.readDiaryEntry, name='patient-diary-read'),
    path('imaging/', views.displayImaging, name='imaging'),
    path('add-imaging/', addImaging, name='patient-add-imaging'),
    path('scan-type/<str:id>/', views.displayScanType, name='patient-scan-type'),
    path('edit-scan/<str:scanType>/<str:id>/', views.displayEditScan, name='patient-edit-scan'),
]