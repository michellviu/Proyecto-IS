from django.http import Http404
from rest_framework.response import Response
from rest_framework import generics, status
from .permissions.permissions_by_roles import IsAdmin, IsPadre, IsEducador
from rest_framework.permissions import AllowAny
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from ..serializers.serializer import RecursoSerializer
from api.AppServices.ResourceService import ResourceService
from api.InfrastructurePersistence.ResourceRepository import ResourceRepository


# vista para crear o listar todos los recursos
class RecursoView(generics.ListCreateAPIView):
    serializer_class = RecursoSerializer
    permission_classes = [IsAdmin]

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.resource_service = ResourceService(ResourceRepository())

    @swagger_auto_schema(
        operation_description="Listar todos los recursos",
        responses={200: RecursoSerializer(many=True)},
    )
    def get_queryset(self):
        obj = self.resource_service.get_all()
        if obj is None:
            raise Http404("Resource not found")
        return obj

    @swagger_auto_schema(
        operation_description="Crear un nuevo recurso",
        request_body=RecursoSerializer,
        responses={201: RecursoSerializer},
    )
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.resource_service.create(serializer.validated_data)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


   


# vista para ver, actualizar o eliminar un recurso
class RecursoDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = RecursoSerializer
    permission_classes = [IsAdmin]

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.resource_service = ResourceService(ResourceRepository())

    @swagger_auto_schema(
        operation_description="Obtener los detalles de un recurso",
        responses={200: RecursoSerializer},
    )
    def get_object(self):
        return self.resource_service.get_by_id(self.kwargs["pk"])

   

    @swagger_auto_schema(
        operation_description="Actualizar un recurso existente",
        request_body=RecursoSerializer,
        responses={200: RecursoSerializer},
    )
    def update(self, request, *args, **kwargs):
        resource = self.get_object()
        serializer = self.get_serializer(resource, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.resource_service.update(resource.idR, serializer.validated_data)
        return Response(serializer.data)

    @swagger_auto_schema(
        operation_description="Eliminar un recurso",
        responses={204: "No Content"},
    )
    def destroy(self, request, *args, **kwargs):
        self.resource_service.delete(self.kwargs["pk"])
        return Response(status=status.HTTP_204_NO_CONTENT)
