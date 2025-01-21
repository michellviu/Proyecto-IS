from django.shortcuts import render
from django.http import HttpResponse
from django.http import Http404
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework import status
from ..models import (
    Recurso,
    Usuario,
    Padre,
    Educador,
    Administrador,
    Actividad_programada,
    Reservacion,
    Calificacion,
)
from ..serializers.serializer import (
    RecursoSerializer,
    PadreSerializer,
    EducadorSerializer,
    AdministradorSerializer,
    Actividad_programadaSerializer,
    ReservacionSerializer,
    CalificacionSerializer,
)


from api.AppServices.ResourceService import ResourceService

from api.InfrastructurePersistence.ResourceRepository import ResourceRepository
from .permissions.permissions_by_roles import IsAdmin, IsPadre, IsEducador
from rest_framework.permissions import AllowAny
# Create your views here.


def home(request):
    return HttpResponse("Hello World")



# class UsuarioView(generics.ListCreateAPIView):
#     serializer_class = UsuarioSerializer
#     queryset = Usuario.objects.all()


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
