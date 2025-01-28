from django.http import Http404
from rest_framework.response import Response
from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from ..serializers.ReservationSerializer import ReservacionSerializer
from api.AppServices.ReservationService import ReservationService
from api.InfrastructurePersistence.ReservationRepository import ReservationRepository
from .permissions.permissions_by_roles import IsAdmin, IsPadre, IsEducador


# vista para crear o listar todas las reservaciones
class ReservacionView(generics.ListCreateAPIView):
    serializer_class = ReservacionSerializer

    # Constructor de la clase ReservacionView
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.reservation_service = ReservationService(ReservationRepository())

    # Método para obtener el conjunto de todas las reservaciones
    def get_queryset(self):
        # Logica para verificar que el usuario es Admin
        return self.reservation_service.get_all()

    @swagger_auto_schema(
        operation_description="Crear una nueva reservación. Puede ser creada por un Admin o un Padre que esten anteriormente logueados",
        request_body=ReservacionSerializer,
        responses={201: ReservacionSerializer},
    )
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        # Logica para verificar que el usuario es Admin o Padre
        self.reservation_service.create(serializer.validated_data)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ReservacionDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ReservacionSerializer

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
            reservation = self.reservation_service.get_by_id(kwargs["pk"])
        except Http404:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(reservation, data=request.data)
        serializer.is_valid(raise_exception=True)
        # Logica para verificar que el usuario es Admin o Padre
        self.reservation_service.update(kwargs["pk"], serializer.validated_data)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_description="Eliminar una reservación existente. Puede ser eliminada por un Admin o un Padre que esten anteriormente logueados",
        responses={204: "No Content"},
    )
    def destroy(self, request, *args, **kwargs):
        try:
            reservation = self.reservation_service.get_by_id(kwargs["pk"])
        except Http404:
            return Response(status=status.HTTP_404_NOT_FOUND)

        # Logica para verificar que el usuario es Admin o Padre
        self.reservation_service.delete(kwargs["pk"])
        return Response(status=status.HTTP_204_NO_CONTENT)

    @swagger_auto_schema(
        operation_description="Obtener una reservación existente. Puede ser obtenida por un Admin o Padre que esten anteriormente logueados",
        responses={200: ReservacionSerializer},
    )
    def retrieve(self, request, *args, **kwargs):
        try:
            reservation = self.reservation_service.get_by_id(kwargs["pk"])
        except Http404:
            return Response(status=status.HTTP_404_NOT_FOUND)

        # Logica para verificar que el usuario es Admin o Padre
        serializer = self.get_serializer(reservation)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ReservacionesPorPadreView(generics.ListAPIView):
    serializer_class = ReservacionSerializer
    permission_classes = [IsPadre]

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.reservation_service = ReservationService(ReservationRepository())

    def get_queryset(self):
        padre_id = self.kwargs.get("idP")
        return self.reservation_service.get_reservations_by_user(padre_id)

    @swagger_auto_schema(
        operation_description="Listar todas las reservaciones asociadas a un Padre específico. Solo puede ser accedido por un Padre logueado",
        responses={200: ReservacionSerializer(many=True)},
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)


class UnconfirmedReservationsView(generics.ListAPIView):
    serializer_class = ReservacionSerializer
    # permission_classes = [IsAdmin]

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.reservation_service = ReservationService(ReservationRepository())

    def get_queryset(self):
        return self.reservation_service.get_unconfirmed_reservations()
