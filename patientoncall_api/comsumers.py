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


        # Join room group
        async_to_sync(self.channel_layer.group_add)(self.room_group_name,
                                                    self.channel_name)

        self.accept()

    def disconnect(self, close_code):
        print('consumer disconnected in %s' % self.room_group_name)
        
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(self.room_group_name,
                                                        self.channel_name)