from django.db import models
from django.db.models import SET_NULL
from django.contrib.auth.models import AbstractUser


class Usuario(AbstractUser):
    idU = models.AutoField(primary_key=True)  # Clave primaria autoincremental
    nombre = models.CharField(max_length=30)
    imagen = models.ImageField(upload_to="media/images/usuarios", null=True, blank=True)

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
