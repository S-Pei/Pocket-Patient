from django.urls import path
from . import views
from patientoncall_api.views import addVisit

urlpatterns = [
    path('', views.index, name='index'),
    path('main/', views.displayInfo, name='patient-info'),
    path('medication/', views.displayMedication, name='patient-medication'),
    path('visit/', views.displayVisit, name='patient-hospital-visit'),
    path('add-visit/', addVisit, name='patient-add-visit'),
    path('edit-visit/<str:id>/', views.displayEditVisit, name='patient-edit-visit'),
    # path('api/getpatient', views.getPatient, name='apiGetPatient')
    path('edit-medication/', views.newMedication, name='edit-medication'),
    path('add-medication/', views.addMedication, name='add-medication'),
    path('lab-history/', views.displayHistory, name='lab-history'),
    path('imaging/', views.displayImaging, name='imaging')
]