from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions

from datetime import date

from .models import (
    PatientUser,
    MedicalHistory,
    LabHistory
)

from .serializers import (
    PatientUserSerializer,
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
    patientUser = PatientUser.objects.get(patient=user.id)
    medicalHistories = MedicalHistory.objects.filter(patient=user.id)
    labHistories = LabHistory.objects.filter(patient=user.id)
    patientUserSerializer = PatientUserSerializer(patientUser, many=False)
    medicalHistorySerializer = MedicalHistorySerializer(medicalHistories, 
                                                        many=True)
    labHistorySerializer = LabHistorySerializer(labHistories, 
                        context={"request": request}, many=True)
    
    patientAge = calculate_age(date.fromisoformat(patientUserSerializer.data["patientBirthdate"]))
    return {
        'ok': True,
        'patient-first-name': user.first_name,
        'patient-last-name': user.last_name,
        'patient-age': patientAge,
        'patient-address': patientUserSerializer.data["patientAddress"],
        'medical-history': medicalHistorySerializer.data,
        'lab-history': labHistorySerializer.data
    }

@csrf_exempt
def addMedicalHistory(request):
    if request.method == "POST":
        user = matchPatientUser(request.POST['patientID'], request.POST['patientName'])
        MedicalHistory.objects.create(patient=user, 
                                      date=request.POST['entryDate'], 
                                      summary=request.POST['entrySummary'])
        return JsonResponse({'ok': True}, status=status.HTTP_201_CREATED)

def calculate_age(birthdate):
    # Get the current date
    current_date = date.today()

    # Calculate the age
    age = current_date.year - birthdate.year

    # Adjust the age if the birthday hasn't occurred yet this year
    if (current_date.month, current_date.day) < (birthdate.month, birthdate.day):
        age -= 1

    return age