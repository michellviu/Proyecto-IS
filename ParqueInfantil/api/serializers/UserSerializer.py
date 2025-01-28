from rest_framework import serializers
from api.models.usuario import Usuario

class UserSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='idU',required=False)

    class Meta:
        model = Usuario
        fields = ['id', 'email', 'username','rol']