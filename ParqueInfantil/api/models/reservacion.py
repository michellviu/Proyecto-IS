from django.db import models
from django.db.models import SET_NULL
import uuid
from .actividad_programada import Actividad_programada
from .usuario import *
import pytz


class Reservacion(models.Model):
    cod_uni = models.UUIDField(
        primary_key=True,  # Define el campo como clave primaria
        default=uuid.uuid4,  # Genera automáticamente un UUID(implentación de GUID) único
        editable=False,  # No se puede editar manualmente
    )
    idP = models.ForeignKey(
        Padre,
        on_delete=models.CASCADE,
    )
    idAP = models.ForeignKey(
        Actividad_programada,
        on_delete=models.CASCADE,
    )

    # class Meta:
    #     constraints = [
    #         models.UniqueConstraint(fields=["idP", "idAP"], name="unique_reservacion")
    #     ]

    def __str__(self):
        return f"{self.idP} : {self.idAP}"
    
     # Definir los estados posibles
    PENDIENTE = "Pendiente"
    CONFIRMADO = "Confirmado"
    CANCELADO = "Cancelado"
    ESTADO_CHOICES = [
        (PENDIENTE, "Pendiente"),
        (CONFIRMADO, "Confirmado"),
        (CANCELADO, "Cancelado"),
    ]

    fecha_hora = models.DateTimeField(auto_now_add=True)
    estado = models.CharField(max_length=10, choices=ESTADO_CHOICES, default=PENDIENTE)
    num_ninos = models.PositiveIntegerField()  # Número de niños
    comentarios = models.CharField(max_length=100)
