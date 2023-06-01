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
    path('doctor/patient-data/', views.getPatientData),
    # path('pageDoctor/', views.displayDoctor, name='index'),
    # path('api/getpatient', views.getPatient, name='apiGetPatient')
]