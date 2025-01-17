from django.db import models
from django.db.models import SET_NULL
from actividad import Actividad
from usuario import *


class Actividad_programada(models.Model):
    idAP = models.AutoField(primary_key=True)
    idA = models.ForeignKey(
        Actividad,
        on_delete=models.CASCADE,  # Elimina recursos si se elimina la instalación
    )
    idE = models.ForeignKey(
        Educador,
        on_delete=models.CASCADE,  # Elimina recursos si se elimina la instalación
    )
    fecha_hora = models.DateTimeField()

    def __str__(self):
        return f"{self.idA}:{self.idE}"
