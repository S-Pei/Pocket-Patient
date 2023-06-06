# patientoncall_api/consumers.py
import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer


class EditConsumer(WebsocketConsumer):

    async def connect(self):
        # self.patient_id = self.scope['url_route']['kwargs']['patient_id']
        # self.patient_name = self.scope['url_route']['kwargs']['patient_name']
        # self.room_group_name = 'connection_%s' % (self.patient_id + '_' + self.patient_name)
        # print('consumer connected to %s' % self.room_group_name)
        print('consumer connected')


        # Join room group
        await self.channel_layer.group_add('patientoncall',
                                            self.channel_name)

        await self.accept()

        await self.channel_layer.group_send(self.room_group_name, {
                'type': 'send_data',
                'status': 'success',
                'event': "websocket-connect"
            })

    async def disconnect(self, close_code):
        # print('consumer disconnected in %s' % self.room_group_name)
        print('consumer disconnected')
        
        # Leave room group
        await self.channel_layer.group_discard('patientoncall',
                                                self.channel_name)
        
    async def receive(self, data):
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
    async def send_data(self, res):
        await self.send(text_data=json.dumps({
            "payload": res
        }))
    
    async def patient_data_access_authentication(self, res):
        await self.send(text_data=json.dumps({
            "event": res["event"]
        }))
    
    
    # Helpers
    async def request_patient_data_access(self):
        await self.channel_layer.group_send(self.room_group_name, {
                'type': 'patient_data_access_authentication',
                'event': "REQUEST_PATIENT_DATA_ACCESS"
            })

    async def accept_patient_data_access(self):
        await self.channel_layer.group_send(self.room_group_name, {
                'type': 'patient_data_access_authentication',
                'event': "ACCESS_PATIENT_DATA_ACCESS"
            })