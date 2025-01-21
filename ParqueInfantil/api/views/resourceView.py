from django.http import Http404
from rest_framework.response import Response
from rest_framework import generics
from .permissions.permissions_by_roles import IsAdmin, IsPadre, IsEducador
from rest_framework.permissions import AllowAny
from rest_framework import status
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

    def get_queryset(self):
        obj = self.resource_service.get_all()
        if obj is None:
            raise Http404("Resource not found")
        return obj

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.resource_service.create(serializer.validated_data)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    # def get_permissions(self):
    #     if self.request.method == 'POST':
    #         return [IsAdmin()]
    #     elif self.request.method == 'GET':
    #         return [AllowAny()]
    #     return super().get_permissions()


# vista para ver, actualizar o eliminar un recurso
class RecursoDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = RecursoSerializer
    permission_classes = [IsAdmin]

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
    
    # def get_permissions(self):
    #     if self.request.method == 'POST':
    #         return [IsAdmin()]
    #     elif self.request.method == 'GET':
    #         return [AllowAny()]
    #     elif self.request.method == 'PUT':
    #         return [IsAdmin()]
    #     elif self.request.method == 'DELETE':
    #         return [IsAdmin()]
    #     return super().get_permissions()