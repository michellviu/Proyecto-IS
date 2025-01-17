from django.db import models
from django.db.models import SET_NULL
from .models_validations import *
from .usuario import *
from .actividad_programada import Actividad_programada


class Calificacion(models.Model):
    idU = models.OneToOneField(
        Usuario,
        on_delete=models.CASCADE,
    )
    idAP = models.OneToOneField(
        Actividad_programada,
        on_delete=models.CASCADE,
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["idU", "idAP"], name="unique_calificacion")
        ]

    def __str__(self):
        return f"{self.idU} : {self.idAP}"

    puntacion = models.SmallIntegerField()
    fecha = models.DateField()
    comentario = models.CharField(
        max_length=100,
        validators=[no_offensive_language],  # Aplica el validador personalizado aquí
    )
