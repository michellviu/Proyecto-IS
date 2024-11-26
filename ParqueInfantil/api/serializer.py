from rest_framework import serializers
from api.models import Instalacion


class InstalacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instalacion
        # fields = ('id','nombre')
        fields = '__all__'