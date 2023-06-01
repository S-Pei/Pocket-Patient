from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    return render(request, 'patientOnCall/index.html')

def displayDoctor(request):
    return HttpResponse("DOCTOR ON CALLLLLLLLL!")

def displayInfo(request):
    return HttpResponse("Do sth later!")