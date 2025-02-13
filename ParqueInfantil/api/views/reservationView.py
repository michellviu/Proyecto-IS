from django.http import Http404
from rest_framework.response import Response
from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from drf_yasg.utils import swagger_auto_schema
from django.core.exceptions import ObjectDoesNotExist
from drf_yasg import openapi
from ..serializers.ReservationSerializer import ReservacionSerializer
from ..serializers.ReservationSerializer import ReservacionByFatherSerializer
from api.AppServices.ReservationService import ReservationService
from api.AppServices.FatherService import FatherService
from api.InfrastructurePersistence.FatherRepository import FatherRepository
from api.InfrastructurePersistence.ReservationRepository import ReservationRepository
from .permissions.permissions_by_roles import (
    IsAdmin,
    IsPadre,
    MySelf,
)
import uuid


# vista para crear o listar todas las reservaciones
class ReservacionView(generics.ListCreateAPIView):
    serializer_class = ReservacionSerializer
    permission_classes = [IsAdmin]
    # Constructor de la clase ReservacionView
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.reservation_service = ReservationService(ReservationRepository())

    # Método para obtener el conjunto de todas las reservaciones
    def get_queryset(self):
        return self.reservation_service.get_all()

    @swagger_auto_schema(
        operation_description="Crear una nueva reservación. Puede ser creada por un Admin o un Padre que esten anteriormente logueados",
        request_body=ReservacionSerializer,
        responses={201: ReservacionSerializer},
    )
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            self.reservation_service.create(serializer.validated_data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def get_permissions(self):
        """
        Determine the permissions required for different HTTP methods.

        - For POST requests, the user must be either an admin or a parent modifiying his own reservation.
        - For GET requests, the user must be an admin.
        - For other requests, use the default permissions.

        Returns:
            list: A list of permission instances.
        """
        if self.request.method == "POST":
            return [IsAdmin()]
        elif self.request.method == "GET":
            return [IsAdmin()]
        return super().get_permissions()


class ReservacionDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ReservacionSerializer
    permission_classes = [IsAdmin or (IsPadre and MySelf)]

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.reservation_service = ReservationService(ReservationRepository())

    @swagger_auto_schema(
        operation_description="Actualizar una reservación existente. Puede ser actualizada por un Admin o un Padre que esten anteriormente logueados",
        request_body=ReservacionSerializer,
        responses={200: ReservacionSerializer},
    )
    def update(self, request, *args, **kwargs):
        try:
            reservation_id = uuid.UUID(kwargs["pk"])
            reservation = self.reservation_service.get_by_id(reservation_id)
            serializer = self.get_serializer(reservation, data=request.data)
            serializer.is_valid(raise_exception=True)
            self.reservation_service.update(reservation_id, serializer.validated_data)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except ObjectDoesNotExist as e:
            return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)
        

    @swagger_auto_schema(
        operation_description="Eliminar una reservación existente. Puede ser eliminada por un Admin o un Padre que esten anteriormente logueados",
        responses={204: "No Content"},
    )
    def destroy(self, request, *args, **kwargs):
        try:
            reservation_id = uuid.UUID(kwargs["pk"])
            self.reservation_service.delete(reservation_id)
            return Response(status=status.HTTP_204_NO_CONTENT)
        except ObjectDoesNotExist as e:
            return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)

        

    @swagger_auto_schema(
        operation_description="Obtener una reservación existente. Puede ser obtenida por un Admin o Padre que esten anteriormente logueados",
        responses={200: ReservacionSerializer},
    )
    def retrieve(self, request, *args, **kwargs):
        try:
            reservation = self.reservation_service.get_by_id(kwargs["pk"])
        except ObjectDoesNotExist as e:
            return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(reservation)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ReservacionesPorPadreView(generics.ListCreateAPIView):
    permission_classes = [IsPadre]
    serializer_class = ReservacionByFatherSerializer
    

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.reservation_service = ReservationService(ReservationRepository())
        self.father_service = FatherService(FatherRepository())

    def get_queryset(self):
        user = self.request.user
        return self.reservation_service.get_reservations_by_user(user.idU)
    
 
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Obtener el usuario autenticado desde el token
        user = request.user

        # Establecer el idP al usuario autenticado
       
        padre_instance = self.father_service.get_by_id(user.idU)
        serializer.validated_data['idP'] = padre_instance
       
        try:
            self.reservation_service.create(serializer.validated_data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except ValidationError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)



class UnconfirmedReservationsView(generics.ListAPIView):
    serializer_class = ReservacionSerializer
    permission_classes = [IsAdmin]

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.reservation_service = ReservationService(ReservationRepository())

    def get_queryset(self):
        return self.reservation_service.get_unconfirmed_reservations()
