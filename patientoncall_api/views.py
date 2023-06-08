from django.shortcuts import render
from django.http import JsonResponse, HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.parsers import JSONParser 

from datetime import datetime, date

from .models import (
    PatientUser,
    MedicalHistory,
    LabHistory,
    Prescription
)

from .serializers import (
    PatientUserSerializer,
    MedicalHistorySerializer,
    LabHistorySerializer,
    PrescriptionSerializer
)

from .forms import AddVisitForm

# @permission_classes([IsAuthenticated])
class PatientApiView(APIView):
    # add permission to check if user is authenticated
    # permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        '''
        List all data for given requested patient user
        '''
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
        # print(request_data)
        date_str = request_data['date']
        summary = request_data['summary']
        if not date_str or not summary:
            return Response({'ok': False}, status=status.HTTP_400_BAD_REQUEST)
        
        date = datetime.strptime(date_str, '%Y-%m-%d').date()

        MedicalHistory.objects.create(patient=user, date=date, summary=summary)
        return Response({'ok': True}, status=status.HTTP_201_CREATED)
    

@csrf_exempt
def verifyPatientCredentials(request):
    if request.method == "POST":
        user = matchPatientUser(request.POST['patientId'], request.POST['patientName'])
        if not user:
            return JsonResponse({'ok': False}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return JsonResponse({'ok': True}, status=status.HTTP_200_OK)

@csrf_exempt
def getPatientData(request):
    if request.method == "POST":
        user = matchPatientUser(request.POST['patientId'], request.POST['patientName'])
        if not user:
            return JsonResponse({'ok': False}, status=status.HTTP_400_BAD_REQUEST)
        if user:
            data = getAllPatientDataById(request, user)
            return JsonResponse(data, status=status.HTTP_200_OK)


def matchPatientUser(patientId, patientName):
    try:
        patientUser = PatientUser.objects.get(patientId=patientId)
        if patientUser != None:
            user = patientUser.patient
            fullname = user.first_name + ' ' + user.last_name
            if patientName.lower().replace(" ", "") == fullname.lower().replace(" ", ""):
                return user
    except:
        return None

def getAllPatientDataById(request, user):
    patientUser = PatientUser.objects.get(patient=user.id)
    medicalHistories = MedicalHistory.objects.filter(patient=user.id)
    labHistories = LabHistory.objects.filter(patient=user.id)
    prescription = Prescription.objects.filter(patient=user.id)
    patientUserSerializer = PatientUserSerializer(patientUser, many=False)
    medicalHistorySerializer = MedicalHistorySerializer(medicalHistories, 
                                                        many=True)
    labHistorySerializer = LabHistorySerializer(labHistories, 
                        context={"request": request}, many=True)
    prescriptionSerializer = PrescriptionSerializer(prescription, many=True)
    sessionID = request.session.session_key
    # print(sessionID)
    # patientAge = calculate_age(date.fromisoformat(patientUserSerializer.data["patientBirthdate"]))
    # print(patientUserSerializer.data["patientBirthdate"])
    return {
        'ok': True,
        'sessionId': sessionID,
        'patient-first-name': user.first_name,
        'patient-last-name': user.last_name,
        'patient-dob': patientUserSerializer.data["patientBirthdate"],
        'patient-address': patientUserSerializer.data["patientAddress"],
        'medical-history': medicalHistorySerializer.data,
        'lab-history': labHistorySerializer.data,
        'prescription': prescriptionSerializer.data
    }

@csrf_exempt
def addMedicalHistory(request):
    if request.method == "POST":
        user = matchPatientUser(request.POST['patientID'], request.POST['patientName']) 
        MedicalHistory.objects.create(patient=user, 
                                      admissionDate=request.POST['entryAdmissionDate'], 
                                      dischargeDate=request.POST['entryDischargeDate'], 
                                      summary=request.POST['entrySummary'],
                                      consultant=request.POST['entryConsultant'],
                                      visitType=request.POST['entryVisitType'],
                                      letter=request.POST['entryLetter'])
        medicalHistories = MedicalHistory.objects.filter(patient=user.id)
        medicalHistorySerializer = MedicalHistorySerializer(medicalHistories, 
                                                        many=True)
        return JsonResponse({'ok': True,
                             'medical-history': medicalHistorySerializer.data},
                               status=status.HTTP_201_CREATED)
    
@csrf_exempt
def addPrescription(request):
    if request.method == "POST":
        user = matchPatientUser(request.POST['patientID'], request.POST['patientName'])
        Prescription.objects.create(patient=user, 
                                    drug=request.POST['prescriptionDrug'], 
                                    dosage=request.POST['prescriptionDosage'], 
                                    startDate=request.POST['prescriptionStartDate'], 
                                    endDate=request.POST['prescriptionEndDate'], 
                                    duration=request.POST['prescriptionDuration'], 
                                    route=request.POST['prescriptionRoute'])
        prescription = Prescription.objects.filter(patient=user.id)
        prescriptionSerializer = PrescriptionSerializer(prescription, 
                                                        many=True)
        return JsonResponse({'ok': True,
                             'prescription': prescriptionSerializer.data},
                               status=status.HTTP_201_CREATED)

def calculate_age(birthdate):
    # Get the current date
    current_date = date.today()

    # Calculate the age
    age = current_date.year - birthdate.year

    # Adjust the age if the birthday hasn't occurred yet this year
    if (current_date.month, current_date.day) < (birthdate.month, birthdate.day):
        age -= 1

    return age

@csrf_exempt
def addVisit(request):
    if request.method == "POST":
        form = AddVisitForm(request.POST, request.FILES or None)
        if form.is_valid():
            patientId = request.POST.get("patientId");
            patientName = request.POST.get("patientName");
            user = matchPatientUser(patientId, patientName)
            MedicalHistory.objects.create(
                patient=user,
                admissionDate=request.POST.get("admissionDate"),
                dischargeDate=request.POST.get("dischargeDate"),
                summary = request.POST.get("summary"),
                consultant = request.POST.get("consultant"),
                visitType = request.POST.get("visitType"),
                letter=request.FILES["letter"] if 'letter' in request.FILES else False
            )
            # print("is valid")
            return render(request, "patientOnCall/visit.html", {'created': True})
    else:
        form = AddVisitForm()
        # print("add visit")
        return render(request, "patientOnCall/add-visit.html", {'form': form})

