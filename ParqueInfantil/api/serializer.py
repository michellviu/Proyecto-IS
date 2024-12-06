from rest_framework import serializers
from api.models  import Instalacion, Recurso, Usuario, Padre, Educador, Administrador, Actividad_programada, Actividad


class InstalacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instalacion
        # fields = ('id','nombre')
        fields = '__all__'

class ActividadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actividad
        fields = '__all__'