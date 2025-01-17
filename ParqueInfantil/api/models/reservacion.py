from django.db import models
from django.db.models import SET_NULL
import uuid
from actividad_programada import Actividad_programada
from usuario import *


class Reservacion(models.Model):
    cod_uni = models.UUIDField(
        primary_key=True,  # Define el campo como clave primaria
        default=uuid.uuid4,  # Genera automáticamente un UUID(implentación de GUID) único
        editable=False,  # No se puede editar manualmente
    )
    idP = models.OneToOneField(
        Padre,
        on_delete=models.CASCADE,
    )
    idAP = models.OneToOneField(
        Actividad_programada,
        on_delete=models.CASCADE,
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["idP", "idAP"], name="unique_reservacion")
        ]

    def __str__(self):
        return f"{self.idP} : {self.idAP}"

    fecha_hora = models.DateField()
    estado = models.CharField(max_length=10)
    num_ninos = models.PositiveIntegerField()  # Número de niños
    comentarios = models.CharField(max_length=100)
