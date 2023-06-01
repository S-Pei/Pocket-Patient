from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    return render(request, 'patientOnCall/index.html')

def displayInfo(request):
    return render(request, 'patientOnCall/info.html')