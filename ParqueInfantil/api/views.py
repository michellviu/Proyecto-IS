from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from api.models import Instalacion
from api.serializer import InstalacionSerializer



# Create your views here.

def home(request):
    return HttpResponse("Hello World")

# class InstalacionView(viewsets.ModelViewSet):
#     serializer_class = InstalacionSerializer
#     queryset = Instalacion.objects.all()

class InstalacionView(generics.CreateAPIView):
    serializer_class = InstalacionSerializer
    queryset = Instalacion.objects.all()