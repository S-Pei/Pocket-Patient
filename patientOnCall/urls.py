from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('pageDoctor/', views.displayDoctor, name='index'),
    path('api/getpatient', views.getPatient, name='apiGetPatient')
]