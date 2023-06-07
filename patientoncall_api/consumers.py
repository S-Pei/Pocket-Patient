# patientoncall_api/consumers.py
import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer


class EditConsumer(WebsocketConsumer):

    def connect(self):
        self.patient_id = self.scope['url_route']['kwargs']['patient_id']
        self.patient_name = self.scope['url_route']['kwargs']['patient_name']
        self.room_group_name = 'connection_%s' % (self.patient_id + '_' + self.patient_name)
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
        else:
            print("UNKNOWN EVENT")
            async_to_sync(self.channel_layer.group_send)(self.room_group_name, {
                'type': 'send_data',
                'event': "UNKNOWN_EVENT"
            })


    # Send data to Websocket functions
    def send_data(self, res):
        self.send(text_data=json.dumps({
            "payload": res
        }))
    
    def patient_data_access_authentication(self, res):
        self.send(text_data=json.dumps({
            "event": res["event"],
            "ids": res["ids"] if "ids" in res else []
        }))