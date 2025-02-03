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
    edadmin_recomendada = models.PositiveSmallIntegerField()  # Edad recomendada
    edadmax_recomendada = models.PositiveSmallIntegerField()
    num_participantes = models.PositiveIntegerField()  # Número de participantes
    duracion = models.DurationField()  # Duración en formato de tiempo
    descripcion = models.CharField(max_length=100,blank=True)  # Descripción de la actividad
    imagen = models.CharField(max_length=200,blank=True,null=True)  # URL de la imagen
    
    def __str__(self):
        return self.idA.__str__()
