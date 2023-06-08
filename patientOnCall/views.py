from django.shortcuts import render
from django.http import HttpResponse
from patientoncall_api.forms import AddVisitForm

def index(request):
    return render(request, 'patientOnCall/index.html')

def displayInfo(request):
    return render(request, 'patientOnCall/info.html')

def displayPrescription(request):
    return render(request, 'patientOnCall/prescription.html')

def displayVisit(request):
    return render(request, 'patientOnCall/visit.html')

def displayAddVisit(request):
    return render(request, 'patientOnCall/add-visit.html')

def newPrescription(request):
    return render(request, 'patientOnCall/new-prescription.html')

def addPrescription(request):
    return render(request, 'patientOnCall/add-prescription.html')
