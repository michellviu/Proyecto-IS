from rest_framework import serializers
from api.models.actividad_programada import Actividad_programada

class ScheduledActSerializer(serializers.ModelSerializer):
    nombre = serializers.CharField(source='idA.nombre')
    duracion = serializers.DurationField(source='idA.duracion')
    descripcion = serializers.CharField(source='idA.descripcion')
    instalacion = serializers.CharField(source='idA.idI.nombre')
    educador = serializers.CharField(source='idE.idE.username')
    class Meta:
        model = Actividad_programada
        fields = ['idAP','nombre', 'educador','instalacion', 'duracion', 'fecha_hora', 'descripcion']