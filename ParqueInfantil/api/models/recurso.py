from django.db import models
from django.db.models import SET_NULL
from .instalacion import Instalacion


class Recurso(models.Model):
    idR = models.AutoField(primary_key=True)  # Clave primaria autoincremental
    idI = models.ForeignKey(
        Instalacion,
        on_delete=models.CASCADE,  # Elimina recursos si se elimina la instalación
    )
    estado = models.CharField(max_length=10)
    tipo = models.CharField(max_length=30)
    frecuencia_uso = models.PositiveIntegerField()

    def __str__(self):
        return self.tipo
