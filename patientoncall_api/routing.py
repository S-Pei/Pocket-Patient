# patientoncall_api/routing.py

from django.urls import path
from . import consumers

websocket_urlpatterns = [
    path(r'ws/patientoncall/(P<patient_id>^[0-9]+)_(P<patient_name>\w+)/$', consumers.EditConsumer.as_asgi()),
]
