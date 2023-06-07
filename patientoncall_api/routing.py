# patientoncall_api/routing.py

from django.urls import path
from . import consumers

websocket_urlpatterns = [
    path(r'ws/patientoncall/<patient_id>/<patient_name>/', consumers.EditConsumer.as_asgi()),
]
