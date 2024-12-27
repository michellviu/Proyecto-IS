from api.models import Actividad
from api.DomainServices.RepositoryInterfaces.IActivityRepository import IActivityRepository

class ActivityRepository(IActivityRepository):
    def get_all(self):
        # Devuelve todos los registros del modelo Actividad
        return Actividad.objects.all()

    def get_by_id(self, idA):
        # Devuelve un único registro del modelo Actividad que coincide con el id proporcionado
        return Actividad.objects.get(idA=idA)

    def create(self, data):
        # Crea un nuevo registro en el modelo Actividad utilizando los datos proporcionados en el diccionario data
        # El operador ** descompone el diccionario en argumentos de palabra clave
        return Actividad.objects.create(**data)

    def update(self, instance, data):
         # Actualiza un registro existente del modelo Actividad
        # Itera sobre los pares clave-valor en el diccionario data
        for key, value in data.items():
             # Establece el atributo key de instance con el valor value
            setattr(instance, key, value)
        # Guarda los cambios en la base de datos
        instance.save()
        return instance

    def delete(self, instance):
         # Elimina un registro existente del modelo Actividad
        instance.delete()