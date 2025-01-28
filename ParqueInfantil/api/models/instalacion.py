from django.db import models
from django.db.models import SET_NULL


class Instalacion(models.Model):
    idI = models.BigAutoField(
        primary_key=True,
    )  # Define el campo como clave primaria

    nombre = models.CharField(max_length=30)
    tipo = models.CharField(max_length=50)
    ubicacion = models.CharField(max_length=50)
    capacidad = models.IntegerField()

    def __str__(self):
        return self.idI.__str__()
