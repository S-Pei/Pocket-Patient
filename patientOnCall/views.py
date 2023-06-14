from django.shortcuts import render
from django.http import HttpResponse
from patientoncall_api.forms import AddVisitForm

def index(request):
    return render(request, 'patientOnCall/index.html')

def displayInfo(request):
    return render(request, 'patientOnCall/info.html')

def displayMedication(request):
    return render(request, 'patientOnCall/medication.html')

def displayVisit(request):
    return render(request, 'patientOnCall/visit.html')

def displayAddVisit(request):
    return render(request, 'patientOnCall/add-visit.html')

def displayEditVisit(request, id):
    return render(request, 'patientOnCall/edit-visit.html')

def newMedication(request):
    return render(request, 'patientOnCall/edit-medication.html')

def addMedication(request):
    return render(request, 'patientOnCall/add-medication.html')

def displayHistory(request):
    return render(request, 'patientOnCall/lab-history.html')

def displayImaging(request):
    return render(request, 'patientOnCall/imaging.html')

def displayScanType(request, id):
    return render(request, 'patientOnCall/scan-type.html')

def displayEditScan(request, scanType, id):
    return render(request, 'patientOnCall/edit-scan.html')