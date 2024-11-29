from django.db import models
from django.db.models import SET_NULL


# Create your models here.

class Instalacion(models.Model):
    idI = models.BigAutoField(primary_key=True,)  # Define el campo como clave primaria

    nombre = models.CharField(max_length=30)
    tipo = models.CharField(max_length=50)
    ubicacion = models.CharField(max_length=50)
    capacidad = models.IntegerField()

    def __str__(self):
        return self.nombre

class Actividad(models.Model):
    idA = models.AutoField(primary_key=True)  # Clave primaria autoincremental
    idI = models.ForeignKey(
        Instalacion,
        on_delete=SET_NULL,  # Pone a NULL actividades si se elimina la instalación
        null=True,  # Acepta valores nulos
        #db_column="IdI"  # Nombre de la columna en la base de datos
    )
    nombre = models.CharField(max_length=50)
    edad_recomendada = models.PositiveSmallIntegerField()  # Edad recomendada
    num_participantes = models.PositiveIntegerField()  # Número de participantes
    duracion = models.TimeField()  # Duración en formato de tiempo
    descripcion = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre

class Recurso(models.Model):
    idR = models.AutoField(primary_key=True)  # Clave primaria autoincremental
    idI = models.ForeignKey(
        Instalacion,
        on_delete= models.CASCADE,  # Elimina recursos si se elimina la instalación
    )
    estado = models.CharField(max_length=10)
    tipo = models.CharField(max_length=30)
    frecuencia_uso = models.PositiveIntegerField()

    def __str__(self):
        return self.tipo

class Usuario(models.Model):
    idU = models.AutoField(primary_key=True)  # Clave primaria autoincremental
    nombre = models.CharField(max_length=30)

    def __str__(self):
        return self.nombre

class Padre(models.Model):
    idP = models.OneToOneField(
        Usuario,
        on_delete=models.CASCADE,  # Elimina el padre si se elimina el usuario
        primary_key=True,
    )
    def __str__(self):
        return self.idP.nombre

class Educador(models.Model):
    idE = models.OneToOneField(
        Usuario,
        on_delete=models.CASCADE,  # Elimina el educador si se elimina el usuario
        primary_key=True,
    )
    def __str__(self):
        return self.idE.nombre

class Administrador(models.Model):
    idA = models.OneToOneField(
        Usuario,
        on_delete=models.CASCADE,  # Elimina el Administrador si se elimina el usuario
        primary_key=True,
    )
    def __str__(self):
        return self.idA.nombre

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

class Reservacion(models.Model):
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
            models.UniqueConstraint(fields=['idP', 'idAP'], name='unique_reservacion')
        ]

    def __str__(self):
        return f"{self.idP} : {self.idAP}"

    fecha_hora = models.DateField()
    estado = models.CharField(max_length=10)
    num_ninos = models.PositiveIntegerField() # Número de niños
    comentarios = models.CharField(max_length=100)

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
            models.UniqueConstraint(fields=['idU', 'idAP'], name='unique_calificacion')
        ]

    def __str__(self):
        return f"{self.idU} : {self.idAP}"

    puntacion = models.SmallIntegerField()
    fecha = models.DateField()
    comentario = models.CharField(max_length=100)