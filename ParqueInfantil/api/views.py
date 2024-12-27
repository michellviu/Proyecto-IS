from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework import status
from .models import Instalacion,Actividad,Recurso,Usuario,Padre,Educador,Administrador,Actividad_programada,Reservacion,Calificacion
from .serializer import InstalacionSerializer, ActividadSerializer, RecursoSerializer, UsuarioSerializer, PadreSerializer, EducadorSerializer, AdministradorSerializer, Actividad_programadaSerializer, ReservacionSerializer, CalificacionSerializer
from api.AppServices.ActivityService import ActivityService
from api.InfrastructurePersistence.ActivityRepository import ActivityRepository

# Create your views here.

def home(request):
    return HttpResponse("Hello World")

# class InstalacionView(viewsets.ModelViewSet):
#     serializer_class = InstalacionSerializer
#     queryset = Instalacion.objects.all()

class InstalacionView(generics.ListCreateAPIView):
    serializer_class = InstalacionSerializer
    queryset = Instalacion.objects.all()

class InstalacionList(APIView):
    """
    List all snippets, or create a new snippet.
    """
    def get(self, request, format=None):
        instalaciones = Instalacion.objects.all()
        serializer = InstalacionSerializer(instalaciones, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = InstalacionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
        return self.activity_service.get_by_id(self.kwargs['pk'])

    def update(self, request, *args, **kwargs):
        activity = self.get_object()
        serializer = self.get_serializer(activity, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.activity_service.update(activity.idA, serializer.validated_data)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        activity = self.get_object()
        self.activity_service.delete(activity.idA)
        return Response(status=status.HTTP_204_NO_CONTENT)

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