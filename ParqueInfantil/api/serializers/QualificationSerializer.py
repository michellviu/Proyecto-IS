from rest_framework import serializers
from api.models.calificacion import Calificacion


class QualificationSerializer(serializers.ModelSerializer):
    nombre_actividad = serializers.CharField(source='idAP.idA.nombre', read_only=True)
    class Meta:
        model = Calificacion
        fields = [
            "id",
            "idU",
            "idAP",
            "nombre_actividad",
            "puntuacion",
            "fecha",
            "comentario",
        ]

class QualificationByUserSerializer(serializers.ModelSerializer):
    nombre_actividad = serializers.CharField(source='idAP.idA.nombre', read_only=True)
    
    class Meta:
        model = Calificacion
        fields = [
            "idU",
            "idAP",
            "nombre_actividad",
            "puntuacion",
            "fecha",
            "comentario",
        ]
        read_only_fields = ['idU']