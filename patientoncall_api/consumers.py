# patientoncall_api/consumers.py
import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from .models import (
    PatientUser,
    Medication,
    Diary,
    MedicalHistory
)
from .serializers import (
    MedicalHistorySerializer,
)

import jwt

class EditConsumer(WebsocketConsumer):

    def connect(self):
        self.username = self.scope['url_route']['kwargs']['username']
        self.room_group_name = 'connection_%s' % (self.username)
        print('consumer connected to %s' % self.room_group_name)
        # print('consumer connected')

        # Join room group
        async_to_sync(self.channel_layer.group_add)(self.room_group_name,
                                            self.channel_name)

        self.accept()

    def disconnect(self, close_code):
        print('consumer disconnected in %s' % self.room_group_name)
        # print('consumer disconnected')
        
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(self.room_group_name,
                                                self.channel_name)
        
    def receive(self, text_data):
        """
        Receive message from WebSocket.
        Get the event and send the appropriate event
        """
        response = json.loads(text_data)
        event = response.get("event", None)

        if event == "REQUEST_PATIENT_DATA_ACCESS":
            print("DOCTOR REQUESTED ACCESS")
            async_to_sync(self.channel_layer.group_send)(self.room_group_name, {
                'type': 'patient_data_access_authentication',
                'event': "REQUEST_PATIENT_DATA_ACCESS"
            })
        elif event == "GRANT_PATIENT_DATA_ACCESS":
            print("PATIENT GRANTED ACCESS")
            ids = response.get("ids", None)
            async_to_sync(self.channel_layer.group_send)(self.room_group_name, {
                'type': 'patient_data_access_authentication',
                'event': "GRANT_PATIENT_DATA_ACCESS",
                'ids': ids
            })
        elif event == "CHANGE-IN-MEDICATION":
            print("CHANGE-IN-MEDICATION")
            async_to_sync(self.channel_layer.group_send)(self.room_group_name, {
                'type': 'send_current_medication_data',
                'event': "CHANGE-IN-MEDICATION",
                'currentMedication': response.get("currentMedication"),
                # 'currentMedication': response.get("pastMedication")
            })
        elif event == "NEW_DIARY_ENTRY":
            self.add_diary_entry(response)
            async_to_sync(self.channel_layer.group_send)(self.room_group_name, {
                'type': 'send_new_diary_information',
                'event': "NEW_DIARY_ENTRY",
                'patientId': response.get("patientId"),
                'date': response.get("date"),
                'content': response.get("content")
            })
        elif event == "NEW_HOSP_VISIT_ENTRY":
            print('receive new hosp notification')
            user = self.get_user_by_patientId(response.get('patientId'))
            medicalHistories = MedicalHistory.objects.filter(patient=user)
            medicalHistorySerializer = MedicalHistorySerializer(medicalHistories, 
                                                        many=True)
            async_to_sync(self.channel_layer.group_send)(self.room_group_name, {
                'type': 'send_update_hosp_visit_information',
                'event': "NEW_HOSP_VISIT_ENTRY",
                'hospital_visit_history': medicalHistorySerializer.data
            })
        else:
            print("UNKNOWN EVENT")
            async_to_sync(self.channel_layer.group_send)(self.room_group_name, {
                'type': 'send_data',
                'event': "UNKNOWN_EVENT"
            })


    # Send data to Websocket functions
    def send_current_medication_data(self, res):
        self.send(text_data=json.dumps({
            "event": res["event"],
            "currentMedication": res["currentMedication"]
        }))
    
    def send_new_diary_information(self, res):
        self.send(text_data=json.dumps({
            "event": res["event"],
            "patientId": res["patientId"],
            "date": res["date"],
            "content": res["content"]
        }))
    
    def send_update_hosp_visit_information(self, res):
        self.send(text_data=json.dumps({
            "event": res["event"],
            "hospital_visit_history": res["hospital_visit_history"]
        }))
    
    def patient_data_access_authentication(self, res):
        self.send(text_data=json.dumps({
            "event": res["event"],
            "ids": res["ids"] if "ids" in res else []
        }))


    def add_diary_entry(self, res):
        print(res.get("patientId"))
        user = self.get_user_by_patientId(res.get("patientId"))
        print(user)
        date = res.get("date").split(" ")[0]
        diary = Diary.objects.create(patient=user, date=date, content=res.get("content"))
        diary.save()

    def get_user_by_patientId(self, patientId):
        patientUser = PatientUser.objects.get(patientId=patientId)
        user = patientUser.patient
        return user