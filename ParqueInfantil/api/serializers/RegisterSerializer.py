from rest_framework import serializers
from api.models  import Instalacion, Recurso, Usuario, Padre, Educador, Administrador, Actividad_programada, Actividad,Reservacion,Calificacion
from django.contrib.auth import get_user_model

User = get_user_model()

class RegistroSerializer(serializers.ModelSerializer):
    
    username = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, required=True)
    rol = serializers.ChoiceField(choices=Usuario.ROL_CHOICES, required=True)

    class Meta:
        model = Usuario
        fields = ['username', 'email', 'password','rol','role_confirmation']

    def create(self, validated_data):
        user = Usuario.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            rol=validated_data['rol']
        )
        return user
