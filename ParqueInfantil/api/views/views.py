from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework import status
from ..models import (
    Instalacion,
    Actividad,
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
    InstalacionSerializer,
    ActividadSerializer,
    RecursoSerializer,
    UsuarioSerializer,
    PadreSerializer,
    EducadorSerializer,
    AdministradorSerializer,
    Actividad_programadaSerializer,
    ReservacionSerializer,
    CalificacionSerializer,
)
from api.AppServices.ActivityService import ActivityService
from api.AppServices.InstallationService import InstallationService
from api.AppServices.ResourceService import ResourceService
from api.InfrastructurePersistence.ActivityRepository import ActivityRepository
from api.InfrastructurePersistence.InstallationRepository import InstallationRepository
from api.InfrastructurePersistence.ResourceRepository import ResourceRepository

# Create your views here.


def home(request):
    return HttpResponse("Hello World")


# vista para crear o listar todas las instalaciones
class InstalacionView(generics.ListCreateAPIView):
    serializer_class = InstalacionSerializer

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.installation_service = InstallationService(InstallationRepository())

    def get_queryset(self):
        return self.installation_service.get_all()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.installation_service.create(serializer.validated_data)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


# vista para ver, actualizar o eliminar una instalacion
class InstalacionDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = InstalacionSerializer

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.installation_service = InstallationService(InstallationRepository())

    def get_object(self):
        return self.installation_service.get_by_id(self.kwargs["pk"])

    def update(self, request, *args, **kwargs):
        installation = self.get_object()
        serializer = self.get_serializer(installation, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.installation_service.update(installation.idI, serializer.validated_data)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        self.installation_service.delete(self.kwargs["pk"])
        return Response(status=status.HTTP_204_NO_CONTENT)


# vista para crear o listar todas las actividades
class ActividadView(generics.ListCreateAPIView):
    serializer_class = ActividadSerializer

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.activity_service = ActivityService(ActivityRepository())

    def get_queryset(self):
        return self.activity_service.get_all()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.activity_service.create(serializer.validated_data)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


# vista para ver, actualizar o eliminar una actividad
class ActividadDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ActividadSerializer

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.activity_service = ActivityService(ActivityRepository())

    def get_object(self):
        return self.activity_service.get_by_id(self.kwargs["pk"])

    def update(self, request, *args, **kwargs):
        activity = self.get_object()
        serializer = self.get_serializer(activity, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.activity_service.update(activity.idA, serializer.validated_data)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        self.activity_service.delete(self.kwargs["pk"])
        return Response(status=status.HTTP_204_NO_CONTENT)


# vista para crear o listar todos los recursos
class RecursoView(generics.ListCreateAPIView):
    serializer_class = RecursoSerializer

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.resource_service = ResourceService(ResourceRepository())

    def get_queryset(self):
        return self.resource_service.get_all()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.resource_service.create(serializer.validated_data)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


# vista para ver, actualizar o eliminar un recurso
class RecursoDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = RecursoSerializer

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.resource_service = ResourceService(ResourceRepository())

    def get_object(self):
        return self.resource_service.get_by_id(self.kwargs["pk"])

    def update(self, request, *args, **kwargs):
        resource = self.get_object()
        serializer = self.get_serializer(resource, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.resource_service.update(resource.idR, serializer.validated_data)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        self.resource_service.delete(self.kwargs["pk"])
        return Response(status=status.HTTP_204_NO_CONTENT)


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
