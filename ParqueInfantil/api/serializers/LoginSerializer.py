from rest_framework import serializers
from api.models  import Instalacion, Recurso, Usuario, Padre, Educador, Administrador, Actividad_programada, Actividad,Reservacion,Calificacion
from django.contrib.auth import get_user_model

User = get_user_model()

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(write_only=True, required=True)