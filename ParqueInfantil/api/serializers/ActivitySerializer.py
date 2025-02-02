from rest_framework import serializers
from api.models.actividad import Actividad
from api.AppServices.ActivityService import ActivityService
from api.InfrastructurePersistence.ActivityRepository import ActivityRepository


class ActividadSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source="idA", required=False)
    puntuacion = serializers.SerializerMethodField()


    def get_puntuacion(self, obj):
        return ActivityService(ActivityRepository).get_average_calification(obj.idA)

    class Meta:
        model = Actividad
        fields = [
            "id",
            "idI",
            "nombre",
            "edadmin_recomendada",
            "edadmax_recomendada",
            "puntuacion",
            "duracion",
            "num_participantes",
            "descripcion",
        ]


class ActividadQualificationSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source="idA", required=False)
    puntuacion = serializers.FloatField()

    # def get_puntuacion(self, obj):
    #     return ActivityService(ActivityRepository).get_activities_qualifications()

    class Meta:
        model = Actividad
        fields = ["id", "nombre", "puntuacion"]


class ActividadParticipantesSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source="idA", required=False)
    participantes = serializers.SerializerMethodField()

    # def get_participantes(self, obj):
    #     return ActivityService(ActivityRepository).get_cant_participantes(obj.idA)

    class Meta:
        model = Actividad
        fields = ["id", "nombre", "participantes"]
