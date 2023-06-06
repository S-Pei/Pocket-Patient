from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('main/', views.displayInfo, name='patient-info'),
    path('prescription/', views.displayPrescription, name='patient-prescription'),
    path('visit/', views.displayVisit, name='patient-hospital-visit'),
    path('new-prescription/', views.newPrescription, name='new-prescription'),
    path('add-prescription/', views.addPrescription, name='add-prescription')
]