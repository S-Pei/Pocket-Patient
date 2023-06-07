from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('main/', views.displayInfo, name='patient-info'),
    path('prescription/', views.displayPrescription, name='patient-prescription'),
    path('visit/', views.displayVisit, name='patient-hospital-visit'),
    path('add-visit/', views.displayAddVisit, name='patient-add-visit'),
    # path('api/getpatient', views.getPatient, name='apiGetPatient')
    path('new-prescription/', views.newPrescription, name='new-prescription'),
    path('add-prescription/', views.addPrescription, name='add-prescription')
]