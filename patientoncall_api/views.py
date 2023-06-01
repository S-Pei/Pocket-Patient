from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.parsers import JSONParser 

from datetime import datetime

from .models import (
    PatientUser,
    MedicalHistory,
    LabHistory
)

from .serializers import (
    MedicalHistorySerializer,
    LabHistorySerializer
)


# @permission_classes([IsAuthenticated])
class PatientApiView(APIView):
    # add permission to check if user is authenticated
    # permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        '''
        List all data for given requested patient user
        '''
        # userId = request.user.id
        user = matchPatientUser(12345, 'Bob Choy')

        result = getAllPatientDataById(request, user)
        return Response(result, status=status.HTTP_200_OK)
    

# @permission_classes([IsAuthenticated])
class PatientMedicalHistoryApiView(APIView):
    # add permission to check if user is authenticated

    @csrf_exempt    
    def post(self, request, *args, **kwargs):
        '''
        List all data for given requested patient user
        '''
        
        user = matchPatientUser(12345, 'Bob Choy')
        request_data = JSONParser().parse(request)
        print(request_data)
        date_str = request_data['date']
        summary = request_data['summary']
        if not date_str or not summary:
            return Response({'ok': False}, status=status.HTTP_404_NOT_FOUND)
        
        date = datetime.strptime(date_str, '%Y-%m-%d').date()

        MedicalHistory.objects.create(patient=user, date=date, summary=summary)
        return Response({'ok': True}, status=status.HTTP_201_CREATED)
    

@csrf_exempt
def getPatientData(request):
    if request.method == "POST":
        user = matchPatientUser(request.POST['patientId'], request.POST['patientName'])
        if user:
            data = getAllPatientDataById(request, user)
            return JsonResponse(data, status=status.HTTP_200_OK)


def matchPatientUser(patientId, patientName):
    patientUser = PatientUser.objects.get(patientId=patientId)
    if patientUser != None:
        user = patientUser.patient
        fullname = user.first_name + ' ' + user.last_name
        if patientName.lower().replace(" ", "") == fullname.lower().replace(" ", ""):
            return user
    return None

def getAllPatientDataById(request, user):
    medicalHistories = MedicalHistory.objects.filter(patient=user.id)
    labHistories = LabHistory.objects.filter(patient=user.id)
    medicalHistorySerializer = MedicalHistorySerializer(medicalHistories, 
                                                        many=True)
    labHistorySerializer = LabHistorySerializer(labHistories, 
                        context={"request": request}, many=True)
    return {
        'ok': True,
        'patient-first-name': user.first_name,
        'patient-last-name': user.last_name,
        'medical-history': medicalHistorySerializer.data,
        'lab-history': labHistorySerializer.data
    }