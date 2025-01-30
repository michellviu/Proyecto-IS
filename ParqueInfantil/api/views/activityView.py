from django.http import Http404
from rest_framework.response import Response
from rest_framework import generics
from .permissions.permissions_by_roles import IsAdmin, IsPadre, IsEducador
from rest_framework.permissions import AllowAny
from rest_framework import status
from ..serializers.ActivitySerializer import (
    ActividadSerializer,
    ActividadQualificationSerializer,
    ActividadParticipantesSerializer,
)
from api.AppServices.ActivityService import ActivityService
from api.InfrastructurePersistence.ActivityRepository import ActivityRepository
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi


# vista para crear o listar todas las actividades
class ActividadView(generics.ListCreateAPIView):
    serializer_class = ActividadSerializer

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.activity_service = ActivityService(ActivityRepository())

    @swagger_auto_schema(
        operation_description="Listar todas las actividades",
        responses={200: ActividadSerializer(many=True)},
    )
    def get_queryset(self):
        return self.activity_service.get_all()

    @swagger_auto_schema(
        operation_description="Crear una nueva actividad",
        request_body=ActividadSerializer,
        responses={201: ActividadSerializer},
    )
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.activity_service.create(serializer.validated_data)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def get_permissions(self):
        if self.request.method == "POST":
            return [IsAdmin()]
        elif self.request.method == "GET":
            return [AllowAny()]
        return super().get_permissions()


# vista para ver, actualizar o eliminar una actividad
class ActividadDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ActividadSerializer

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.activity_service = ActivityService(ActivityRepository())

    def get_object(self):
        obj = self.activity_service.get_by_id(self.kwargs["pk"])
        if obj is None:
            raise Http404("Activity not found")
        return obj

    def update(self, request, *args, **kwargs):
        activity = self.get_object()
        serializer = self.get_serializer(activity, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.activity_service.update(activity.idA, serializer.validated_data)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        self.activity_service.delete(self.kwargs["pk"])
        return Response(status=status.HTTP_204_NO_CONTENT)

    def get_permissions(self):
        if self.request.method == "POST":
            return [IsAdmin()]
        elif self.request.method == "GET":
            return [AllowAny()]
        elif self.request.method == "PUT":
            return [IsAdmin()]
        elif self.request.method == "DELETE":
            return [IsAdmin()]
        return super().get_permissions()


# vista para listar las calificaciones de actividades
class ActividadCalificacionesView(generics.ListAPIView):
    serializer_class = ActividadQualificationSerializer

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.activity_service = ActivityService(ActivityRepository())

    @swagger_auto_schema(
        operation_description="Listar calificaciones de actividades",
        responses={
            200: openapi.Response(
                "Calificaciones de actividades", ActividadSerializer(many=True)
            )
        },
    )
    def get_queryset(self):
        return self.activity_service.get_activities_qualifications()

    def get_permissions(self):
        return [AllowAny()]


class ActividadParticipantesView(generics.ListAPIView):
    serializer_class = ActividadParticipantesSerializer

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.activity_service = ActivityService(ActivityRepository())

    @swagger_auto_schema(
        operation_description="Listar actividades con más participantes",
        responses={
            200: openapi.Response(
                "Actividades con más participantes", ActividadSerializer(many=True)
            )
        },
    )
    def get_queryset(self):
        return self.activity_service.get_most_participated_activities()

    def get_permissions(self):
        return [AllowAny()]
