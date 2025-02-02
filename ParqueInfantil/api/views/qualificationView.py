from django.http import Http404
from rest_framework.exceptions import ValidationError as Http400
from rest_framework.response import Response
from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from drf_yasg.utils import swagger_auto_schema
from django.core.exceptions import ObjectDoesNotExist
from django.core.exceptions import ValidationError
from drf_yasg import openapi
from api.InfrastructurePersistence.ScheduledActRepository import ScheduledActRepository
from ..serializers.QualificationSerializer import QualificationSerializer
from ..serializers.QualificationSerializer import QualificationByUserSerializer
from api.AppServices.QualificationService import QualificationService
from api.AppServices.UserService import UserService
from api.InfrastructurePersistence.UserRepository import UserRepository
from api.InfrastructurePersistence.QualificationRepository import (
    QualificationRepository,
)
from .permissions.permissions_by_roles import (
    IsAdmin,
    MySelf,
)


class QualificationView(generics.ListCreateAPIView):
    serializer_class = QualificationSerializer

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.qualification_service = QualificationService(QualificationRepository(),ScheduledActRepository())

    def get_queryset(self):
        return self.qualification_service.get_all()

    @swagger_auto_schema(
        operation_description="Crear una nueva calificación. Puede ser creada por cualquier usuario logueado",
        request_body=QualificationSerializer,
        responses={201: QualificationSerializer},
    )
    def create(self, request, *args, **kwargs):
      try:    
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.qualification_service.create(serializer.validated_data)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
      except Http400 as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def get_permissions(self):
        if self.request.method == "POST":
            return [AllowAny()]
        elif self.request.method == "GET":
            return [IsAdmin()]
        return super().get_permissions()


class QualificationDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = QualificationSerializer

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.qualification_service = QualificationService(QualificationRepository(),ScheduledActRepository())

    @swagger_auto_schema(
        operation_description="Actualizar una calificación existente. Puede ser actualizada por un Admin o un Padre que esten anteriormente logueados",
        request_body=QualificationSerializer,
        responses={200: QualificationSerializer},
    )
    def update(self, request, *args, **kwargs):
        try:
            qualification = self.qualification_service.get_by_id(kwargs["pk"])
            serializer = self.get_serializer(qualification, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            self.qualification_service.update(kwargs["pk"], serializer.validated_data)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except ObjectDoesNotExist as e:
            return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)

        

    @swagger_auto_schema(
        operation_description="Eliminar una calificación existente. Puede ser eliminada por un Admin o un Padre que esten anteriormente logueados",
        responses={204: QualificationSerializer},
    )
    def destroy(self, request, *args, **kwargs):
        try:
            self.qualification_service.delete(kwargs["pk"])
            return Response(status=status.HTTP_204_NO_CONTENT)
        except ObjectDoesNotExist as e:
            return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)

        

    @swagger_auto_schema(
        operation_description="Obtener una calificación existente. Puede ser obtenida por un Admin o un Padre que esten anteriormente logueados",
        responses={200: QualificationSerializer},
    )
    def retrieve(self, request, *args, **kwargs):
        try:
            qualification = self.qualification_service.get_by_id(kwargs["pk"])
        except ObjectDoesNotExist as e:
            return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(qualification)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def get_permissions(self):
        """
        Determine the permissions required for different HTTP methods.

        - GET: Allows any user to access.
        - PUT, PATCH: Allows only the user themselves to access.
        - DELETE: Allows either an admin or the user themselves to access.

        Returns:
            list: A list of permission instances based on the request method.
        """
        if self.request.method == "GET":
            return [AllowAny()]
        elif self.request.method in ["PUT", "PATCH"]:
            return [MySelf()]
        elif self.request.method == "DELETE":
            return [IsAdmin() or MySelf()]
        return super().get_permissions()


class QualificationByActivityView(generics.ListAPIView):
    """
    View to list qualifications by activity.
    This view inherits from `generics.ListAPIView` and provides a list of qualifications
    for a specific activity identified by `idAP` in the URL parameters.
    Attributes:
        serializer_class (QualificationSerializer): The serializer class used to serialize the qualification data.
        permission_classes (list): List of permission classes that determine access to this view.
        qualification_service (QualificationService): Service used to interact with the qualification repository.
    Methods:
        get_queryset(): Retrieves the queryset of qualifications for the specified activity.
    """

    serializer_class = QualificationSerializer
    permission_classes = [AllowAny]

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.qualification_service = QualificationService(QualificationRepository(),ScheduledActRepository())

    def get_queryset(self):
        return self.qualification_service.get_qualifications_by_activity(
            self.kwargs["pk"]
        )
    

class QualificationByUserView(generics.ListCreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = QualificationByUserSerializer
    

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.qualification_service = QualificationService(QualificationRepository(),ScheduledActRepository())
        self.user_service = UserService(UserRepository())
    
    def get_queryset(self):
        user = self.request.user
        return self.qualification_service.get_qualifications_by_user(user.idU)
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Obtener el usuario autenticado desde el token
        user = request.user
        user_instance = self.user_service.get_by_id(user.idU)
        serializer.validated_data['idU'] = user_instance
       
        try:
            self.qualification_service.create(serializer.validated_data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except ValidationError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

