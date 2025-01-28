from django.http import Http404
from rest_framework.response import Response
from rest_framework import generics, status
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from .permissions.permissions_by_roles import IsAdmin, IsPadre, IsEducador
from rest_framework.permissions import AllowAny
from ..serializers.serializer import InstalacionSerializer
from api.AppServices.InstallationService import InstallationService
from api.InfrastructurePersistence.InstallationRepository import InstallationRepository


# vista para crear o listar todas las instalaciones
class InstalacionView(generics.ListCreateAPIView):
    permission_classes = [IsAdmin]
    serializer_class = InstalacionSerializer

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.installation_service = InstallationService(InstallationRepository())

    def get_queryset(self):
        return self.installation_service.get_all()

    @swagger_auto_schema(
        operation_description="Crear una nueva instalación",
        request_body=InstalacionSerializer,
        responses={201: InstalacionSerializer},
    )
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.installation_service.create(serializer.validated_data)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @swagger_auto_schema(
        operation_description="Listar todas las instalaciones",
        responses={200: InstalacionSerializer(many=True)},
    )
    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


# vista para ver, actualizar o eliminar una instalacion
class InstalacionDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = InstalacionSerializer
    permission_classes = [IsAdmin]

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.installation_service = InstallationService(InstallationRepository())

    def get_object(self):
        obj = self.installation_service.get_by_id(self.kwargs["pk"])
        if obj is None:
            raise Http404("Installation not found")
        return obj

    @swagger_auto_schema(
        operation_description="Obtener los detalles de una instalación",
        responses={200: InstalacionSerializer},
    )
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    @swagger_auto_schema(
        operation_description="Actualizar una instalación existente",
        request_body=InstalacionSerializer,
        responses={200: InstalacionSerializer},
    )
    def update(self, request, *args, **kwargs):
        installation = self.get_object()
        serializer = self.get_serializer(installation, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.installation_service.update(installation.idI, serializer.validated_data)
        return Response(serializer.data)

    @swagger_auto_schema(
        operation_description="Eliminar una instalación",
        responses={204: "No Content"},
    )
    def destroy(self, request, *args, **kwargs):
        self.installation_service.delete(self.kwargs["pk"])
        return Response(status=status.HTTP_204_NO_CONTENT)
