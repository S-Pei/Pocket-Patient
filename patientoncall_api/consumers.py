# patientoncall_api/consumers.py
import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from datetime import datetime
from dateutil.relativedelta import relativedelta
from .models import (
    PatientUser,
    Medication,
    Diary,
    MedicalHistory
)
from .serializers import (
    MedicalHistorySerializer,
)
from .serializers import (
    MedicationSerializer,
    DiarySerializer
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
        elif event == "NEW_MEDICATION_ENTRY":
            print("NEW_MEDICATION_ENTRY")
            new_medication_data = self.add_medication_entry(response)
            async_to_sync(self.channel_layer.group_send)(self.room_group_name, {
                'type': 'send_current_medication_data',
                'event': "NEW_MEDICATION_ENTRY",
                'currentMedication': json.dumps(self.get_updated_medication(response.get("patientId"))),
                'newMedicationData': new_medication_data
            })
        elif event == "REMOVE_MEDICATION_ENTRY":
            print("REMOVE_MEDICATION_ENTRY")
            self.remove_medication_entry(response)
            async_to_sync(self.channel_layer.group_send)(self.room_group_name, {
                'type': 'send_current_medication_data',
                'event': "REMOVE_MEDICATION_ENTRY",
                'currentMedication': json.dumps(self.get_updated_medication(response.get("patientId"))),
                'removedID': response.get("id")
            })
        elif event == "NEW_DIARY_ENTRY":
            new_diary_data = self.add_diary_entry(response)
            async_to_sync(self.channel_layer.group_send)(self.room_group_name, {
                'type': 'send_new_diary_information',
                'event': "NEW_DIARY_ENTRY",
                'newDiaryData': new_diary_data
            })
        elif event == "NEW_HOSP_VISIT_ENTRY":
            medicalHistories = MedicalHistory.objects.filter(patient=response.get('patientId'))
            medicalHistorySerializer = MedicalHistorySerializer(medicalHistories, 
                                                        many=True)
            async_to_sync(self.channel_layer.group_send)(self.room_group_name, {
                'type': 'send_new_diary_information',
                'event': "NEW_HOSP_VISIT_ENTRY",
                'hospital_visit_history': medicalHistorySerializer
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
            "currentMedication": res["currentMedication"],
            "newMedicationData": res["newMedicationData"] if "newMedicationData" in res else None,
            "removedID": res["removedID"] if "removedID" in res else None
        }))
    
    def send_new_diary_information(self, res):
        self.send(text_data=json.dumps({
            "event": res["event"],
            "newDiaryData": res["newDiaryData"],
        }))

    def patient_data_access_authentication(self, res):
        self.send(text_data=json.dumps({
            "event": res["event"],
            "ids": res["ids"] if "ids" in res else []
        }))

    def add_medication_entry(self, res):
        user = self.get_user_by_patientId(res.get("patientId"))
        startDateTime = res.get("startDate")
        startDate = startDateTime.split(" ")[0]
        duration = res.get("duration")
        new_medication =  Medication.objects.create(patient=user, 
                            drug=res.get("drug"), 
                            dosage=res.get("dosage"), 
                            startDate=startDate, 
                            endDate=add_time(startDate, duration), 
                            duration=duration, 
                            route=res.get("route"),
                            comments=res.get("comments"),
                            byPatient=True)
        return MedicationSerializer(new_medication, many=False).data
        
    def remove_medication_entry(self, res):
        print(res['id'])
        Medication.objects.get(id=res['id']).delete()

    def add_diary_entry(self, res):
        print(res.get("patientId"))
        user = self.get_user_by_patientId(res.get("patientId"))
        print(user)
        date = res.get("date").split(" ")[0]
        new_diary_entry = Diary.objects.create(patient=user, date=date, content=res.get("content"))
        return DiarySerializer(new_diary_entry, many=False).data

    def get_user_by_patientId(self, patientId):
        patientUser = PatientUser.objects.get(patientId=patientId)
        user = patientUser.patient
        return user
    
    def get_updated_medication(self, id):
        user = self.get_user_by_patientId(id)
        currentMedication = Medication.objects.filter(patient=user.id, status="current")
        return MedicationSerializer(currentMedication, many=True).data
    
    
def add_time(date_str, duration):
    durationInfo = duration.split(' ')
    num = int(durationInfo[0])
    unit = durationInfo[1]
    date_parts = date_str.split('-')
    day = int(date_parts[2])
    month = int(date_parts[1])
    year = int(date_parts[0])

    date = datetime(year, month, day)
    newDate = datetime(year, month, day)

    if unit == 'Day':
        newDate = date + relativedelta(days=num)
    elif unit == 'Week':
        newDate = date + relativedelta(weeks=num)
    elif unit == 'Month':
        newDate = date + relativedelta(months=num)
    elif unit == 'Year':
        newDate = date + relativedelta(years=num)
    else:
        print("error 404")

    day = str(newDate.day).zfill(2)
    month = str(newDate.month).zfill(2)
    year = newDate.year

    print(f'{year}-{month}-{day}')

    print(f'{num}-{unit}')

    print(newDate)

    return f'{year}-{month}-{day}'