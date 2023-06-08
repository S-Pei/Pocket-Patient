from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('main/', views.displayInfo, name='patient-info'),
    path('medication/', views.displayMedication, name='patient-medication'),
    path('visit/', views.displayVisit, name='patient-hospital-visit'),
    path('add-visit/', views.displayAddVisit, name='patient-add-visit'),
    # path('api/getpatient', views.getPatient, name='apiGetPatient')
    path('edit-medication/', views.newMedication, name='edit-medication'),
    path('add-medication/', views.addMedication, name='add-medication')
]