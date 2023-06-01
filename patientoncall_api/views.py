from django.http import JsonResponse

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
        result = getAllPatientDataById(request, userId)
        return Response(result, status=status.HTTP_200_OK)
    

def getPatientData(request):
    if request.method == "GET":
        user = matchPatientUser(request.GET['patientId'], request.GET['patientName'])
        if user:
            data = getAllPatientDataById(request, user.id)
            return JsonResponse(data, status=status.HTTP_200_OK)


def matchPatientUser(patientId, patientName):
    patientUser = PatientUser.objects.get(patientId=patientId)
    if patientUser != None:
        user = patientUser.patient
        fullname = user.first_name + ' ' + user.last_name
        if patientName.lower().replace(" ", "") == fullname.lower().replace(" ", ""):
            return user
    return None

def getAllPatientDataById(request, userId):
    medicalHistories = MedicalHistory.objects.filter(patient=userId)
    labHistories = LabHistory.objects.filter(patient=userId)
    medicalHistorySerializer = MedicalHistorySerializer(medicalHistories, 
                                                        many=True)
    labHistorySerializer = LabHistorySerializer(labHistories, 
                        context={"request": request}, many=True)
    return {
        "ok": True,
        'medical-history': medicalHistorySerializer.data,
        'lab-history': labHistorySerializer.data
    }