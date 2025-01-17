from django.db import models
from django.db.models import SET_NULL
from .instalacion import Instalacion


class Actividad(models.Model):
    idA = models.AutoField(primary_key=True)  # Clave primaria autoincremental
    idI = models.ForeignKey(
        Instalacion,
        on_delete=SET_NULL,  # Pone a NULL actividades si se elimina la instalación
        null=True,  # Acepta valores nulos
        # db_column="IdI"  # Nombre de la columna en la base de datos
    )
    nombre = models.CharField(max_length=50)
    edad_recomendada = models.PositiveSmallIntegerField()  # Edad recomendada
    num_participantes = models.PositiveIntegerField()  # Número de participantes
    duracion = models.TimeField()  # Duración en formato de tiempo
    descripcion = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre
