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
from api.serializers.UserSerializer import UserSerializer
from api.AppServices.UserService import UserService
from api.InfrastructurePersistence.UserRepository import UserRepository
from .permissions.permissions_by_roles import IsAdmin, IsAdminOrSelf
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

# Create your views here.


def home(request):
    return HttpResponse("This is the PlayHub Project API")


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


class UserView(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAdmin]

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.user_service = UserService(UserRepository())

    def get_queryset(self):
        return self.user_service.get_all()

    @swagger_auto_schema(
        operation_description="Listar todos los usuarios",
        responses={200: UserSerializer(many=True)},
    )
    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class UnconfirmedUsersView(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAdmin]

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.user_service = UserService(UserRepository())

    def get_queryset(self):
        return self.user_service.get_unconfirmed_users()

    @swagger_auto_schema(
        operation_description="Listar todos los usuarios no confirmados",
        responses={200: UserSerializer(many=True)},
    )
    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAdminOrSelf]

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.user_service = UserService(UserRepository())

    def get_object(self):
        obj = self.user_service.get_by_id(self.kwargs["pk"])
        if obj is None:
            raise Http404("User not found")
        return obj

    @swagger_auto_schema(
        operation_description="Obtener los detalles de un usuario",
        responses={200: UserSerializer},
    )
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    @swagger_auto_schema(
        operation_description="Actualizar un usuario existente",
        request_body=UserSerializer,
        responses={200: UserSerializer},
    )
    def update(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(user, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.user_service.update(user.idU, serializer.validated_data)
        return Response(serializer.data)

    @swagger_auto_schema(
        operation_description="Eliminar un usuario",
        responses={204: "No Content"},
    )
    def destroy(self, request, *args, **kwargs):
        self.user_service.delete(self.kwargs["pk"])
        return Response(status=status.HTTP_204_NO_CONTENT)


class UserByRoleView(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAdmin]

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.user_service = UserService(UserRepository())

    def get_queryset(self):
        role = self.kwargs["role"]
        return self.user_service.get_by_role(role)

    @swagger_auto_schema(
        operation_description="Listar usuarios por rol",
        responses={200: UserSerializer(many=True)},
    )
    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
