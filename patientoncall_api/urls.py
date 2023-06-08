from django.urls import path
from .views import (
    PatientApiView,
    PatientMedicalHistoryApiView
)
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('patient-data/', PatientApiView.as_view()),
    path('patient-data/medical-history/', PatientMedicalHistoryApiView.as_view()),
    path('doctor/patient-verify/', views.verifyPatientCredentials),
    path('doctor/patient-data/', views.getPatientData),
    path('doctor/patient-data/medical-history/', views.addMedicalHistory),
    path('doctor/patient-data/prescription/', views.addPrescription),
    path('doctor/patient-data/prescription/update/', views.updatePrescription),
    path('doctor/patient-data/delete-prescription/', views.pastEntry),
    path('doctor/patient-data/get-prescription/', views.getPrescription),
    # path('pageDoctor/', views.displayDoctor, name='index'),
    # path('api/getpatient', views.getPatient, name='apiGetPatient')
]