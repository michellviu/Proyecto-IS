from django.db import models
from django.db.models import SET_NULL
from django.contrib.auth.models import AbstractUser


class Usuario(AbstractUser):
    idU = models.AutoField(primary_key=True)  # Clave primaria autoincremental

    # Definir los roles posibles
    ADMIN = "admin"
    PADRE = "padre"
    EDUCADOR = "educador"
    ROL_CHOICES = [
        (ADMIN, "admin"),
        (PADRE, "padre"),
        (EDUCADOR, "educador"),
    ]

    rol = models.CharField(max_length=10, choices=ROL_CHOICES, default=PADRE)
    role_confirmation = models.BooleanField(default=False)
    imagen = models.ImageField(upload_to="media/images/usuarios", null=True, blank=True)

    def __str__(self):
        return self.username


class Padre(models.Model):
    idP = models.OneToOneField(
        Usuario,
        on_delete=models.CASCADE,  # Elimina el padre si se elimina el usuario
        primary_key=True,
    )

    def __str__(self):
        return self.idP.username


class Educador(models.Model):
    idE = models.OneToOneField(
        Usuario,
        on_delete=models.CASCADE,  # Elimina el educador si se elimina el usuario
        primary_key=True,
    )

    def __str__(self):
        return self.idE.username


class Administrador(models.Model):
    idA = models.OneToOneField(
        Usuario,
        on_delete=models.CASCADE,  # Elimina el Administrador si se elimina el usuario
        primary_key=True,
    )

    def __str__(self):
        return self.idA.username
