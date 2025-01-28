from django.http import Http404
from rest_framework.response import Response
from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from ..serializers.QualificationSerializer import QualificationSerializer
from api.AppServices.QualificationService import QualificationService
from api.InfrastructurePersistence.QualificationRepository import (
    QualificationRepository,
)
from .permissions.permissions_by_roles import IsAdmin, IsPadre, IsEducador


class QualificationView(generics.ListCreateAPIView):
    serializer_class = QualificationSerializer

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.qualification_service = QualificationService(QualificationRepository())

    def get_queryset(self):
        return self.qualification_service.get_all()

    @swagger_auto_schema(
        operation_description="Crear una nueva calificación. Puede ser creada por un Admin o un Padre que esten anteriormente logueados",
        request_body=QualificationSerializer,
        responses={201: QualificationSerializer},
    )
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.qualification_service.create(serializer.validated_data)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class QualificationDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = QualificationSerializer

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.qualification_service = QualificationService(QualificationRepository())

    @swagger_auto_schema(
        operation_description="Actualizar una calificación existente. Puede ser actualizada por un Admin o un Padre que esten anteriormente logueados",
        request_body=QualificationSerializer,
        responses={200: QualificationSerializer},
    )
    def update(self, request, *args, **kwargs):
        try:
            qualification = self.qualification_service.get_by_id(kwargs["pk"])
        except Http404:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(qualification, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.qualification_service.update(serializer.validated_data)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_description="Eliminar una calificación existente. Puede ser eliminada por un Admin o un Padre que esten anteriormente logueados",
        responses={204: QualificationSerializer},
    )
    def destroy(self, request, *args, **kwargs):
        try:
            qualification = self.qualification_service.get_by_id(kwargs["pk"])
        except Http404:
            return Response(status=status.HTTP_404_NOT_FOUND)

        self.qualification_service.delete(qualification)
        return Response(status=status.HTTP_204_NO_CONTENT)

    @swagger_auto_schema(
        operation_description="Obtener una calificación existente. Puede ser obtenida por un Admin o un Padre que esten anteriormente logueados",
        responses={200: QualificationSerializer},
    )
    def retrieve(self, request, *args, **kwargs):
        try:
            qualification = self.qualification_service.get_by_id(kwargs["pk"])
        except Http404:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(qualification)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CalificationByActivityView(generics.ListAPIView):
    serializer_class = QualificationSerializer

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.qualification_service = QualificationService(QualificationRepository())

    def get_queryset(self):
        return self.qualification_service.get_qualifications_by_activity(
            self.kwargs["idAP"]
        )
