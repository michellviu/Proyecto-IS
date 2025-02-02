from django.db import models
from django.db.models import SET_NULL
from .models_validations import *
from .usuario import *
from .actividad_programada import Actividad_programada


class Calificacion(models.Model):
    idU = models.ForeignKey(
        Usuario,
        on_delete=models.CASCADE,
    )
    idAP = models.ForeignKey(
        Actividad_programada,
        on_delete=models.CASCADE,
    )

    puntuacion = models.SmallIntegerField()
    fecha = models.DateField()
    comentario = models.CharField(
        max_length=100,
        validators=[no_offensive_language],
    )

    def __str__(self):
        return f"{self.idU} : {self.idAP}"

    class Meta:
        # Enforce unique combination of idU and idAP
        constraints = [
            models.UniqueConstraint(
                fields=["idU", "idAP"], name="unique_user_activity_combination"
            )
        ]
