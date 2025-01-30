from rest_framework import serializers
from api.models  import Instalacion, Recurso, Usuario, Padre, Educador, Administrador, Actividad_programada, Actividad,Reservacion,Calificacion
from django.contrib.auth import get_user_model


class InstalacionSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='idI',required=False)
    class Meta:
        model = Instalacion
        fields =[ 'id','nombre', 'tipo', 'ubicacion', 'capacidad']

class ActividadSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='idA',required=False)
    class Meta:
        model = Actividad
        fields = ['id','idI', 'nombre', 'edadmin_recomendada', 'edadmax_recomendada', 'duracion', 'num_participantes', 'descripcion']

class RecursoSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='idR',required=False)
    class Meta:
        model = Recurso
        fields = ['id','estado', 'tipo', 'idI']

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
    id = serializers.IntegerField(source='idAP',required=False)
    class Meta:
        model = Actividad_programada
        fields = ['id','idA','idE', 'fecha_hora']

class ReservacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservacion
        fields = '__all__'

class CalificacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Calificacion
        fields = '__all__'


class ModelNameSerializer(serializers.Serializer):
    models = serializers.ListField(
        child=serializers.CharField()
    )