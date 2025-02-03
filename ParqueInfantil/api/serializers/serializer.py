from rest_framework import serializers
from api.AppServices.InstallationService import InstallationService
from api.InfrastructurePersistence.InstallationRepository import InstallationRepository
from api.InfrastructurePersistence.ScheduledActRepository import ScheduledActRepository
from api.AppServices.ResourceService import ResourceService
from api.InfrastructurePersistence.ResourceRepository import ResourceRepository
from api.models import (
    Instalacion,
    Recurso,
    Padre,
    Educador,
    Administrador,
    Actividad_programada,
)
from django.contrib.auth import get_user_model


class InstalacionSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source="idI", required=False)
    # numero_actividades_realizadas = serializers.IntegerField(read_only=True)
    class Meta:
        model = Instalacion
        fields = ["id", "nombre", "tipo", "ubicacion", "capacidad"]


# class InstalacionNumActividadesSerializer(serializers.ModelSerializer):
#     id = serializers.IntegerField(source="idI", required=False)
#     numero_actividades_realizadas = serializers.SerializerMethodField()

#     def get_numero_actividades_realizadas(self, obj):
#         return InstallationService(InstallationRepository()).get_numactividades(obj.idI)

#     class Meta:
#         model = Instalacion
#         fields = ["id", "nombre","numero_actividades_realizadas"]




class RecursoSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source="idR", required=False)
    numero_actividades = serializers.SerializerMethodField()

    def get_numero_actividades(self, obj):
        return ResourceService(ResourceRepository(ScheduledActRepository(),InstallationRepository())).get_frecuencia_uso(obj.idR)

    class Meta:
        model = Recurso
        fields = ["id", "estado", "tipo", "numero_actividades", "idI"]


class PadreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Padre
        fields = "__all__"


class EducadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Educador
        fields = "__all__"


class AdministradorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Administrador
        fields = "__all__"


class Actividad_programadaSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source="idAP", required=False)

    class Meta:
        model = Actividad_programada
        fields = ["id", "idA", "idE", "fecha_hora"]


class ModelNameSerializer(serializers.Serializer):
    models = serializers.ListField(child=serializers.CharField())
