from django.http import HttpResponse

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions

from .models import Patient
from .serializers import PatientSerializer


class PatientApiView(APIView):
    # add permission to check if user is authenticated
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, patientId, *args, **kwargs):
        '''
        List all data for given requested patient user
        '''
        patient = Patient.objects.get(patientId = patientId)
        serializer = PatientSerializer(patient, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)