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
from api.InfrastructurePersistence.ScheduledActRepository import ScheduledActRepository
from api.AppServices.InstallationService import InstallationService
from api.InfrastructurePersistence.InstallationRepository import InstallationRepository
from django.core.exceptions import ObjectDoesNotExist

# vista para crear o listar todos los recursos
class RecursoView(generics.ListCreateAPIView):
    serializer_class = RecursoSerializer
    permission_classes = [IsAdmin]

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.resource_service = ResourceService(ResourceRepository(ScheduledActRepository(),InstallationRepository()))

    @swagger_auto_schema(
        operation_description="Listar todos los recursos",
        responses={200: RecursoSerializer(many=True)},
    )
    def get_queryset(self):
        return self.resource_service.get_all()

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


class ResourceInUseView(generics.ListAPIView):
    serializer_class = RecursoSerializer
    permission_classes = [IsAdmin|IsEducador|IsPadre]

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.resource_service = ResourceService(ResourceRepository(ScheduledActRepository(),InstallationRepository()))

    def get_queryset(self):
        return self.resource_service.get_resource_in_use()


class ResourceAvailableView(generics.ListAPIView):
    serializer_class = RecursoSerializer
    permission_classes = [IsAdmin | IsPadre]

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.resource_service = ResourceService(ResourceRepository(ScheduledActRepository(),InstallationRepository()))

    def get_queryset(self):
        return self.resource_service.get_resource_disponibles()
        
   


# vista para ver, actualizar o eliminar un recurso
class RecursoDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = RecursoSerializer
    permission_classes = [IsAdmin]

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.resource_service = ResourceService(ResourceRepository(ScheduledActRepository(),InstallationRepository()))

    @swagger_auto_schema(
        operation_description="Obtener los detalles de un recurso",
        responses={200: RecursoSerializer},
    )
    def retrieve(self, request, *args, **kwargs):
        try:
            activity = self.resource_service.get_by_id(self.kwargs["pk"])
            serializer = self.get_serializer(activity)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ObjectDoesNotExist as e:
            return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": "An unexpected error occurred."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    

    @swagger_auto_schema(
        operation_description="Actualizar un recurso existente",
        request_body=RecursoSerializer,
        responses={200: RecursoSerializer},
    )
    def update(self, request, *args, **kwargs):
        try:
           resource = self.resource_service.get_by_id(self.kwargs["pk"])
           serializer = self.get_serializer(resource, data=request.data)
           serializer.is_valid(raise_exception=True)
           self.resource_service.update(resource.idR, serializer.validated_data)
           return Response(serializer.data,status=status.HTTP_200_OK)
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except ObjectDoesNotExist as e:
            return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)

    @swagger_auto_schema(
        operation_description="Eliminar un recurso",
        responses={204: "No Content"},
    )
    def destroy(self, request, *args, **kwargs):
        try:
         self.resource_service.delete(self.kwargs["pk"])
         return Response(status=status.HTTP_204_NO_CONTENT)
        except ObjectDoesNotExist as e:
            return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)

