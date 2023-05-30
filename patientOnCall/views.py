from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    return HttpResponse("SHOULD NOT SHOW THIS Hello GROUP39!")

def displayDoctor(request):
    return HttpResponse("DOCTOR ON CALLLLLLLLL!")