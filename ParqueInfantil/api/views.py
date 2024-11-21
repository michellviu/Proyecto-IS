from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import generics
from api.models import Instalacion
from api.serializers import InstalacionSerializer


# Create your views here.

class InstalacionView(generics.ListAPIView):
    queryset = Instalacion.objects.all()
    serializer_class = InstalacionSerializer

def home(request):
    return HttpResponse('HOME')
