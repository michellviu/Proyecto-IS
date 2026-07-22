from django.db import models
from django.core.exceptions import ValidationError


# Modelo para almacenar variables globales en la base de datos
class GlobalVariables(models.Model):
    # Variable para identificar una nueva calificación ingresada
    qualification_change = models.BooleanField(default=False)

    # Variable para identificar una nueva confirmación ingresada
    confirmation_change = models.BooleanField(default=False)

    # Variable para indicar que se finalizó una actividad
    new_finish_activity = models.BooleanField(default=True)

    def save(self, *args, **kwargs):
        if not self.pk and GlobalVariables.objects.exists():
            raise ValidationError("Solo puede haber una instancia de GlobalVariables")
        return super(GlobalVariables, self).save(*args, **kwargs)

    @classmethod
    def get_instance(cls):
        instance, created = cls.objects.get_or_create(pk=1)
        return instance

    @classmethod
    def update_field(cls, field_name, value):
        instance = cls.get_instance()
        if hasattr(instance, field_name):
            setattr(instance, field_name, value)
            instance.save()
        else:
            raise ValidationError(
                f"El campo '{field_name}' no existe en GlobalVariables"
            )
