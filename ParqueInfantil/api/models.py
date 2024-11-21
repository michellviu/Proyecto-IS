from django.db import models

# Create your models here.

class Instalacion(models.Model):
    nombre = models.CharField(max_length=30)
    tipo = models.CharField(max_length=50)
    ubicacion = models.CharField(max_length=50)
    capacidad = models.IntegerField()
