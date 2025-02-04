from rest_framework import serializers
from api.models.actividad_programada import Actividad_programada
from api.AppServices.ActivityService import ActivityService
from api.InfrastructurePersistence.ActivityRepository import ActivityRepository

class ScheduledActSerializer(serializers.ModelSerializer):
    nombre = serializers.CharField(source='idA.nombre')
    duracion = serializers.DurationField(source='idA.duracion')
    descripcion = serializers.CharField(source='idA.descripcion')
    instalacion = serializers.CharField(source='idA.idI.nombre')
    educador = serializers.CharField(source='idE.idE.username')
    puntuacion = serializers.SerializerMethodField()


    def get_puntuacion(self, obj):
        return ActivityService(ActivityRepository).get_average_calification(obj.idA)

    class Meta:
        model = Actividad_programada
        fields = ['idAP','nombre', 'educador','instalacion', 'duracion', 'fecha_hora','puntuacion', 'descripcion']