from rest_framework import serializers
from api.models.reservacion import Reservacion

# from api.AppServices.ReservationService import ReservationService
# from api.InfrastructurePersistence.ReservationRepository import ReservationRepository


class ReservacionSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(source="cod_uni", required=False)
    nombre_actividad = serializers.CharField(source="idAP.idA.nombre", required=False)
    comentarios = serializers.CharField(required=False)
    # reservation_service = ReservationService(ReservationRepository())

    class Meta:
        model = Reservacion
        fields = ['id', 'idP', 'idAP','nombre_actividad', 'fecha_hora', 'estado', 'num_ninos', 'comentarios']


class ReservacionByFatherSerializer(serializers.ModelSerializer):
    nombre_actividad = serializers.CharField(source="idAP.idA.nombre", required=False)
    comentarios = serializers.CharField(required=False)
    class Meta:
        model = Reservacion
        fields = ['idP','idAP','nombre_actividad', 'fecha_hora', 'estado', 'num_ninos', 'comentarios']
        read_only_fields = ['idP','fecha_hora']  # El campo 'padre' será asignado automáticamente