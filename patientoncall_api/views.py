from django.http import JsonResponse, HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.parsers import JSONParser 
from django.views.generic.edit import FormView

from datetime import datetime, date

import json

from .models import (
    PatientUser,
    MedicalHistory,
    LabHistory,
    Medication,
    ImagingHistory,
    ImagingUpload,
    Diary
)

from .serializers import (
    PatientUserSerializer,
    MedicalHistorySerializer,
    LabHistorySerializer,
    MedicationSerializer,
    ImagingHistorySerializer,
    ImagingUploadSerializer,
    DiarySerializer
)

from .forms import AddVisitForm, AddImagingForm, ImagesUploadForm

@permission_classes([IsAuthenticated])
class PatientApiView(APIView):
    # add permission to check if user is authenticated
    # permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        '''
        List all data for given requested patient user
        '''
        user = request.user
        result = getAllPatientDataById(request, user)
        return Response(result, status=status.HTTP_200_OK)
    

@permission_classes([IsAuthenticated])
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
            return JsonResponse({'ok': True, 'username': user.username}, status=status.HTTP_200_OK)

@csrf_exempt
def getPatientData(request):
    if request.method == "POST":
        user = matchPatientUser(request.POST['patientId'], request.POST['patientName'])
        if not user:
            return JsonResponse({'ok': False}, status=status.HTTP_400_BAD_REQUEST)
        if user:
            toHideIds = request.POST.getlist('toHideIds[]')
            data = getAllPatientDataById(request, user, toHideIds)
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

def getAllPatientDataById(request, user, toHideIds=[]):
    patientUser = PatientUser.objects.get(patient=user.id)
    medicalHistories = MedicalHistory.objects.filter(patient=user.id).exclude(id__in=toHideIds)
    labHistories = LabHistory.objects.filter(patient=user.id)
    imagingHistories = ImagingHistory.objects.filter(patient=user.id)
    imagingUploads = ImagingUpload.objects
    currentMedication = Medication.objects.filter(patient=user.id, status="current")
    previousMedication = Medication.objects.filter(patient=user.id, status="past")
    diary = Diary.objects.filter(patient=user.id)
    patientUserSerializer = PatientUserSerializer(patientUser, many=False)
    medicalHistorySerializer = MedicalHistorySerializer(medicalHistories, 
                                                        many=True)
    labHistorySerializer = LabHistorySerializer(labHistories, 
                        context={"request": request}, many=True)
    imagingHistorySerializer = ImagingHistorySerializer(imagingHistories, 
                        context={"request": request}, many=True)
    imagingUploadSerializer = ImagingUploadSerializer(imagingUploads, 
                        context={"request": request}, many=True)
    currentMedicationSerializer = MedicationSerializer(currentMedication, many=True)
    previousMedicationSerializer = MedicationSerializer(previousMedication, many=True)
    diarySerializer = DiarySerializer(diary, many=True)
    sessionID = request.session.session_key
    return {
        'ok': True,
        'sessionId': sessionID,
        'patient-id': patientUser.patientId,
        'patient-name-small': user.first_name.lower().replace(" ", "") + user.last_name.lower().replace(" ", ""),
        'patient-first-name': user.first_name,
        'patient-last-name': user.last_name,
        'patient-dob': patientUserSerializer.data["patientBirthdate"],
        'patient-address': patientUserSerializer.data["patientAddress"],
        'medical-history': medicalHistorySerializer.data,
        'lab-history': labHistorySerializer.data,
        'imaging-history': imagingHistorySerializer.data,
        'imaging-uploads': imagingUploadSerializer.data,
        'current-medication': currentMedicationSerializer.data,
        'previous-medication': previousMedicationSerializer.data,
        'diary': diarySerializer.data
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
def addMedication(request):
    if request.method == "POST":
        user = matchPatientUser(request.POST['patientID'], request.POST['patientName'])
        # obj = Medication.objects.create(patient=user, 
        #                             drug=request.POST['medicationDrug'], 
        #                             dosage=request.POST['medicationDosage'], 
        #                             startDate=request.POST['medicationStartDate'], 
        #                             endDate=request.POST['medicationEndDate'], 
        #                             duration=request.POST['medicationDuration'], 
        #                             route=request.POST['medicationRoute'],
        #                             comments=request.POST['medicationComment'])
        currentMedication = Medication.objects.filter(patient=user.id, status="current")
        currentMedicationSerializer = MedicationSerializer(currentMedication, 
                                                        many=True)
        return JsonResponse({'ok': True,
                            #  'objID': obj.id,
                             'medication': currentMedicationSerializer.data},
                               status=status.HTTP_201_CREATED)


@csrf_exempt
def updateMedication(request):
    if request.method == "POST":
        json_data = json.loads(request.body)
        user = matchPatientUser(json_data['patientId'], json_data['patientName'])
        for deleted_medication in json_data["deleteIds"]:
            my_object = Medication.objects.get(id=deleted_medication['medicationID'])
            my_object.status = "past"
            my_object.comments = deleted_medication['medicationComments']
            my_object.save()

        for added_medication in json_data["addedItems"]:
            obj = Medication.objects.create(patient=user, 
                            drug=added_medication['medicationDrug'], 
                            dosage=added_medication['medicationDosage'], 
                            startDate=added_medication['medicationStartDate'], 
                            endDate=added_medication['medicationEndDate'], 
                            duration=added_medication['medicationDuration'], 
                            route=added_medication['medicationRoute'],
                            comments=added_medication['medicationComments'])

        
        for new_medication in json_data["editItems"]:
            my_object = Medication.objects.get(id=new_medication['medicationID'])
            my_object.status = "past"
            my_object.save()
            Medication.objects.create(patient=user, 
                                        drug=new_medication['medicationDrug'], 
                                        dosage=new_medication['medicationDosage'], 
                                        startDate=new_medication['medicationStartDate'], 
                                        endDate=new_medication['medicationEndDate'], 
                                        duration=new_medication['medicationDuration'], 
                                        route=new_medication['medicationRoute'],
                                        comments=new_medication['medicationComments'])
        currentMedication = Medication.objects.filter(patient=user.id, status="current")
        currentMedicationSerializer = MedicationSerializer(currentMedication, 
                                                        many=True)
        previousMedication = Medication.objects.filter(patient=user.id, status="past")
        previousMedicationSerializer = MedicationSerializer(previousMedication, 
                                                        many=True)
        return JsonResponse({'ok': True,
                             'current-medication': currentMedicationSerializer.data,
                             'previous-medication': previousMedicationSerializer.data},
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
            print(request.POST)
            print(user)
            MedicalHistory.objects.create(
                patient=user,
                admissionDate=request.POST.get("admissionDate"),
                dischargeDate=request.POST.get("dischargeDate"),
                summary = request.POST.get("summary"),
                consultant = request.POST.get("consultant"),
                visitType = request.POST.get("visitType"),
                letter=request.FILES["letter"] if 'letter' in request.FILES else False,
                addToMedicalHistory= request.POST.get("addToMedicalHistory")=="on"
            )
            # print("is valid")
            return render(request, "patientOnCall/visit.html", {'created': True})
    else:
        form = AddVisitForm()
        # print("add visit")
        return render(request, "patientOnCall/add-visit.html", {'form': form})



@csrf_exempt
def addImaging(request):
    if request.method == "POST":
        # form = AddImagingForm(request.POST, request.FILES or None)
        form = ImagesUploadForm(request.POST, request.FILES or None)
        images = request.FILES.getlist('image')
        scanName = request.POST.get("scanType")
        if form.is_valid():
            patientId = request.POST.get("patientId");
            patientName = request.POST.get("patientName");
            user = matchPatientUser(patientId, patientName)
            imagingEntry = ImagingHistory.objects.create(
                patient=user,
                date=request.POST.get("date"),
                scanType=scanName,
                region = request.POST.get("region"),
                indication = request.POST.get("indication"),
                # visitType = request.POST.get("visitType"),
                report=request.FILES["report"] if 'report' in request.FILES else False,
                # visitEntry=request.POST.get("visitEntry")
            )
            for i in images:
                ImagingUpload.objects.create(
                    imagingEntry=imagingEntry,
                    image=i
                )
            # print("is valid")
            tableURL = request.META.get('HTTP_ORIGIN') + '/scan-type/' + scanName
            return HttpResponseRedirect(tableURL)
            # return render(request, "patientOnCall/scan-type/mri.html",{'scanType': scanName})
    else:
        # form = AddImagingForm()
        form = ImagesUploadForm()
        # print("add visit")
        return render(request, "patientOnCall/add-imaging.html", {'form': form})

@csrf_exempt
def addImagingHistory(request):
    if request.method == "POST":
        user = matchPatientUser(request.POST['patientID'], request.POST['patientName']) 
        entry = ImagingHistory.objects.create(patient=user, 
                                      date=request.POST.get("date"),
                                      scanType=request.POST.get("scanType"),
                                      region = request.POST.get("region"),
                                      indication = request.POST.get("indication"),
                                      # visitType = request.POST.get("visitType"),
                                      report=request.FILES["report"] if 'report' in request.FILES else False)
                                      # visitEntry=request.POST.get("visitEntry"))
        imageList = addImagingUploads(request, entry)
        imagingHistories = ImagingHistory.objects.filter(patient=user.id)
        imagingHistorySerializer = ImagingHistorySerializer(imagingHistories, 
                                                        many=True)
        return JsonResponse({'ok': True,
                             'imaging-history': imagingHistorySerializer.data,
                             'imaging-uploads': imageList},
                               status=status.HTTP_201_CREATED)
    
@csrf_exempt
def addImagingUploads(request, entry):
    if request.method == "POST":
        images = request.FILES.getlist('image')
        imageList = []
        for i in images:
            ImagingUpload.objects.create(
                                        image=i,
                                        imagingEntry=entry
                                        )
                                        # visitEntry=request.POST.get("visitEntry"))
            imagingUploads = ImagingUpload.objects.filter(imagingEntry=entry)
            imagingUploadSerializer = ImagingUploadSerializer(imagingUploads, 
                                                            many=True)
            imageList.append(imagingUploadSerializer.data)
        return imageList
    
@csrf_exempt
def uploadLetter(request, id, visitID):
    visitEntry = MedicalHistory.objects.get(id=visitID)
    letterUpload = request.FILES["letter"] if 'letter' in request.FILES else False
    visitEntry.letter = letterUpload
    visitEntry.save()
    return render(request, 'patientOnCall/visit.html', {'visit':visitEntry})
    