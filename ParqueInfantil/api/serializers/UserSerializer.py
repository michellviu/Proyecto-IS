from rest_framework import serializers
from api.models.usuario import Usuario

class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    username = serializers.CharField()
    idU = serializers.IntegerField(required=False)
    rol = serializers.CharField(required=False)

    class Meta:
        model = Usuario
        fields = ['idU', 'email', 'username','rol']