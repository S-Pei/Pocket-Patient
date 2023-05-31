from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    return render(request, 'patientOnCall/index.html')

# @csrf_exempt
# def getPatient(request):
#     if request.method == "POST":
#         patientId = request.POST['patientId']
#         print(request.POST['patientName'])

#         patient = Patient.objects.get(patientId=patientId)
#         print(patient)

#         return JsonResponse(
#             {
#                 "ok": True,
#                 "patientId": request.POST['patientId'],
#                 "patientName": request.POST['patientName']
#             },
#             status=201)

def displayDoctor(request):
    return HttpResponse("DOCTOR ON CALLLLLLLLL!")