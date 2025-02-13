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
)


from api.AppServices.ResourceService import ResourceService

from api.InfrastructurePersistence.ResourceRepository import ResourceRepository
from .permissions.permissions_by_roles import IsAdmin, IsPadre, IsEducador
from rest_framework.permissions import AllowAny
from api.serializers.UserSerializer import UserSerializer
from api.AppServices.UserService import UserService
from api.InfrastructurePersistence.UserRepository import UserRepository
from .permissions.permissions_by_roles import IsAdmin, IsAdminOrSelf
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

# Create your views here.


def home(request):
    return HttpResponse("This is the PlayHub Project API")


# class PadreView(generics.ListCreateAPIView):
#     serializer_class = PadreSerializer
#     queryset = Padre.objects.all()


# class EducadorView(generics.ListCreateAPIView):
#     serializer_class = EducadorSerializer
#     queryset = Educador.objects.all()


# class AdministradorView(generics.ListCreateAPIView):
#     serializer_class = AdministradorSerializer
#     queryset = Administrador.objects.all()
