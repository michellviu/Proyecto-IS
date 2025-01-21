from rest_framework import serializers
from api.models  import Instalacion, Recurso, Usuario, Padre, Educador, Administrador, Actividad_programada, Actividad,Reservacion,Calificacion
from django.contrib.auth import get_user_model


class InstalacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instalacion
        fields = '__all__'

class ActividadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actividad
        fields = '__all__'

class RecursoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recurso
        fields = '__all__'

class PadreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Padre
        fields = '__all__'      

class EducadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Educador
        fields = '__all__'    

class AdministradorSerializer(serializers.ModelSerializer):   
    class Meta:
        model = Administrador
        fields = '__all__'

class Actividad_programadaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actividad_programada
        fields = '__all__'

class ReservacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservacion
        fields = '__all__'

class CalificacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Calificacion
        fields = '__all__'