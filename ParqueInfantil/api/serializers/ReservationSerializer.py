from rest_framework import serializers
from api.models.reservacion import Reservacion

# from api.AppServices.ReservationService import ReservationService
# from api.InfrastructurePersistence.ReservationRepository import ReservationRepository


class ReservacionSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(source="cod_uni", required=False)
    # reservation_service = ReservationService(ReservationRepository())

    class Meta:
        model = Reservacion
        fields = ['id', 'idP', 'idAP', 'fecha_hora', 'estado', 'num_ninos', 'comentarios']

    # def create(self, validated_data):
    #     return self.reservation_service.create(validated_data)

    # def update(self, instance, validated_data):
    #     return self.reservation_service.update(instance.cod_uni, validated_data)

    # def delete(self, instance):
    #     return self.reservation_service.delete(instance.cod_uni)

    # def list(self):
    #     return self.reservation_service.list()

    # def retrieve(self, cod_uni):
    #     return self.reservation_service.retrieve(cod_uni)
