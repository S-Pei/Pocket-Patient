from django.http import HttpResponse
from django.contrib.auth.models import User

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions

from .models import (
    PatientUser,
    MedicalHistory,
    LabHistory
)

from .serializers import (
    MedicalHistorySerializer,
    LabHistorySerializer
)


class PatientApiView(APIView):
    # add permission to check if user is authenticated
    # permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        '''
        List all data for given requested patient user
        '''
        userId = request.user.id
        print(userId)
        medicalHistories = MedicalHistory.objects.filter(patient=userId)
        labHistories = LabHistory.objects.filter(patient=userId)
        print(medicalHistories)
        print(labHistories)
        medicalHistorySerializer = MedicalHistorySerializer(medicalHistories, 
                                                            many=True)
        labHistorySerializer = LabHistorySerializer(labHistories, many=True)
        
        result = {
            'medical-history': medicalHistorySerializer.data,
            'lab-history': labHistorySerializer.data
        }
        return Response(result, status=status.HTTP_200_OK)
    

def getPatientData(request):
    if request.method == "GET":
        patientUser = matchPatientUser(request.GET['patientId'])


def matchPatientUser(patientId, patientName):
    patientUser = PatientUser.objects.get(patientId=patientId)
    if patientUser != None:
        fullname = patientUser.firstName + ' ' + patientUser.lastName
        print(fullname)
