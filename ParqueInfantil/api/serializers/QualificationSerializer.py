from rest_framework import serializers
from api.models.calificacion import Calificacion


class QualificationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Calificacion
        fields = "__all__"
