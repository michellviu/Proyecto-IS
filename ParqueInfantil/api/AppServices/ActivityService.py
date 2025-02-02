from ..DomainServices.ServicesInterfaces.IActivityService import IActivityService
from ..DomainServices.RepositoryInterfaces.IActivityRepository import (
    IActivityRepository,
)
from .GenericService import GenericService
from api.models.instalacion import Instalacion
from django.core.exceptions import ObjectDoesNotExist


class ActivityService(GenericService, IActivityService):
    def __init__(self, activity_repository: IActivityRepository):
        super().__init__(activity_repository)
        self.activity_repository = activity_repository
    

    def create(self, data):
        # Comprobar los requerimientos de cantidad de personas 
        self.check_for_consistency(data)
        # Llamar al método create del GenericService
        return super().create(data)

    def update(self,id, data):
            self.check_for_consistency(data)
            return super().update(id, data)
        
    @staticmethod
    def check_for_consistency(data):
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
        

    def get_average_calification(self, activity_id):
        return self.activity_repository.get_average_calification(activity_id)

    def get_activities_qualifications(self):
        return self.activity_repository.get_activities_qualifications()

    def get_most_participated_activities(self):
        return self.activity_repository.get_most_participated_activities()
    
    def get_cant_participantes(self,actividad_id):
        return self.activity_repository.get_cant_participantes(actividad_id)
