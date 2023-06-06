# patientoncall_api/consumers.py
import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer


class EditConsumer(WebsocketConsumer):

    def connect(self):
        print("consumer connected")

        # Join room group
        async_to_sync(self.channel_layer.group_add)('eDCR',
                                                    self.channel_name)

        self.accept()

    def disconnect(self, close_code):
        print("consumer disconnected")
        
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)('eDCR',
                                                        self.channel_name)