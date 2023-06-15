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
    context = {}
    if ("created" in request.session and request.session["created"] == True):
        context = {'created': True, 
                    'id': request.session["id"],
                    'admissionDate': request.session["admissionDate"],
                    'dischargeDate': request.session["dischargeDate"],
                    'summary': request.session["summary"],
                    'visitType': request.session["visitType"], 
                    'letter': request.session["letter"], 
                    'addToMedicalHistory': request.session["addToMedicalHistory"] }
        request.session["created"] = False
        request.session["id"] = ""
        request.session["admissionDate"] = None
        request.session["dischargeDate"] = None
        request.session["summary"] = None
        request.session["visitType"] = None
        request.session["letter"] = None
        request.session["addToMedicalHistory"] = None
    return render(request, 'patientOnCall/visit.html', context=context)

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

def patientDiary(request):
    return render(request, 'patientOnCall/patient-diary.html')

def readDiaryEntry(request):
    print(request)
    return render(request, 'patientOnCall/patient-diary-entry.html')
def displayImaging(request):
    return render(request, 'patientOnCall/imaging.html')

def displayScanType(request, id):
    context = {}
    # print(request.session)
    if ("created" in request.session and request.session["created"] == True):
        context = {'created': True, 
                    'id': request.session["id"],
                    'date': request.session["date"],
                    'scanType': request.session["scanType"],
                    'region': request.session["region"],
                    'indication': request.session["indication"], 
                    'report': request.session["report"]}
        print(context)
        request.session["created"] = False
        request.session["id"] = ""
        request.session["date"] = None
        request.session["scanType"] = None
        request.session["region"] = None
        request.session["indication"] = None
        request.session["report"] = None
    return render(request, 'patientOnCall/scan-type.html', context=context)

def displayEditScan(request, scanType, id):
    return render(request, 'patientOnCall/edit-scan.html')
