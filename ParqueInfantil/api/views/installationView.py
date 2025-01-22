from django.http import Http404
from rest_framework.response import Response
from rest_framework import generics
from .permissions.permissions_by_roles import IsAdmin, IsPadre, IsEducador
from rest_framework.permissions import AllowAny
from rest_framework import status
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

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.installation_service.create(serializer.validated_data)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    # def get_permissions(self):
    #     if self.request.method == 'POST':
    #         return [IsAdmin()]
    #     elif self.request.method == 'GET':
    #         return [AllowAny()]
    #     return super().get_permissions()


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
    
    def update(self, request, *args, **kwargs):
        installation = self.get_object()
        serializer = self.get_serializer(installation, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.installation_service.update(installation.idI, serializer.validated_data)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        self.installation_service.delete(self.kwargs["pk"])
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