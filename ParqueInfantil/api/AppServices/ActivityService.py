from ..DomainServices.ServicesInterfaces.IActivityService import IActivityService
from ..DomainServices.RepositoryInterfaces.IActivityRepository import IActivityRepository
from .GenericService import GenericService
from api.models.instalacion import Instalacion

class ActivityService(GenericService, IActivityService):
    def __init__(self, activity_repository: IActivityRepository):
        super().__init__(activity_repository)
        self.activity_repository = activity_repository
    

    def create(self, data):
        # Obtener la instalación correspondiente a la actividad
        instalacion_id = data.get('idI')
        num_participantes = data.get('num_participantes')

        if isinstance(instalacion_id, Instalacion):
            instalacion_id = instalacion_id.idI

        try:
            instalacion = Instalacion.objects.get(idI=instalacion_id)
        except Instalacion.DoesNotExist:
            raise ValueError("La instalación especificada no existe.")

        # Verificar si el número de participantes es mayor que la capacidad de la instalación
        if num_participantes > instalacion.capacidad:
            raise ValueError("El número de participantes no puede ser mayor que la capacidad de la instalación.")
        # Llamar al método create del GenericService
        return super().create(data)