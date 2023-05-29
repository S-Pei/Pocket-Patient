from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    return HttpResponse("Hello world!")

def displayDoctor(request):
    return HttpResponse("DOCTOR ON CALLLLLLLLL!")