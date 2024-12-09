from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from api.models import Instalacion,Actividad,Recurso,Usuario,Padre,Educador,Administrador,Actividad_programada,Reservacion,Calificacion
from api.serializer import InstalacionSerializer, ActividadSerializer, RecursoSerializer, UsuarioSerializer, PadreSerializer, EducadorSerializer, AdministradorSerializer, Actividad_programadaSerializer, ReservacionSerializer, CalificacionSerializer



# Create your views here.

def home(request):
    return HttpResponse("Hello World")

# class InstalacionView(viewsets.ModelViewSet):
#     serializer_class = InstalacionSerializer
#     queryset = Instalacion.objects.all()

class InstalacionView(generics.ListCreateAPIView):
    serializer_class = InstalacionSerializer
    queryset = Instalacion.objects.all()

class ActividadView(generics.ListCreateAPIView):
    serializer_class = ActividadSerializer
    queryset = Actividad.objects.all()

class RecursoView(generics.ListCreateAPIView):
    serializer_class = RecursoSerializer
    queryset = Recurso.objects.all()

class UsuarioView(generics.ListCreateAPIView):
    serializer_class = UsuarioSerializer
    queryset = Usuario.objects.all()

class PadreView(generics.ListCreateAPIView):    
    serializer_class = PadreSerializer
    queryset = Padre.objects.all()

class EducadorView(generics.ListCreateAPIView):
    serializer_class = EducadorSerializer
    queryset = Educador.objects.all()

class AdministradorView(generics.ListCreateAPIView):
    serializer_class = AdministradorSerializer
    queryset = Administrador.objects.all()

class Actividad_programadaView(generics.ListCreateAPIView):
    serializer_class = Actividad_programadaSerializer
    queryset = Actividad_programada.objects.all()

class ReservacionView(generics.ListCreateAPIView):
    serializer_class = ReservacionSerializer
    queryset = Reservacion.objects.all()

class CalificacionView(generics.ListCreateAPIView):
    serializer_class = CalificacionSerializer
    queryset = Calificacion.objects.all()