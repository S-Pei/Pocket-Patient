# patientoncall_api/consumers.py
import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer


class EditConsumer(WebsocketConsumer):

    def connect(self):
        # self.patient_id = self.scope['url_route']['kwargs']['patient_id']
        # self.patient_name = self.scope['url_route']['kwargs']['patient_name']
        # self.room_group_name = 'connection_%s' % (self.patient_id + '_' + self.patient_name)
        # print('consumer connected to %s' % self.room_group_name)
        print('consumer connected')


        # Join room group
        async_to_sync(self.channel_layer.group_add)('patientoncall',
                                            self.channel_name)

        self.accept()

        async_to_sync(self.channel_layer.group_send)(self.room_group_name, {
                'type': 'send_data',
                'status': 'success',
                'event': "websocket-connect"
            })

    def disconnect(self, close_code):
        # print('consumer disconnected in %s' % self.room_group_name)
        print('consumer disconnected')
        
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)('patientoncall',
                                                self.channel_name)
        
    def receive(self, data):
        """
        Receive message from WebSocket.
        Get the event and send the appropriate event
        """
        response = json.loads(data)
        event = response.get("event", None)
        if event == "REQUEST_PATIENT_DATA_ACCESS":
            self.request_patient_data_access()
        if event == "ACCEPT_PATIENT_DATA_ACCESS":
            self.accept_patient_data_access()


    # Send data to Websocket functions
    def send_data(self, res):
        async_to_sync(self.send)(text_data=json.dumps({
            "payload": res
        }))
    
    def patient_data_access_authentication(self, res):
        async_to_sync(self.send)(text_data=json.dumps({
            "event": res["event"]
        }))
    
    
    # Helpers
    def request_patient_data_access(self):
        async_to_sync(self.channel_layer.group_send)(self.room_group_name, {
                'type': 'patient_data_access_authentication',
                'event': "REQUEST_PATIENT_DATA_ACCESS"
            })

    async def accept_patient_data_access(self):
        async_to_sync(self.channel_layer.group_send)(self.room_group_name, {
                'type': 'patient_data_access_authentication',
                'event': "ACCESS_PATIENT_DATA_ACCESS"
            })