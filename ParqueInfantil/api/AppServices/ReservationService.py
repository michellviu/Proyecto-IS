from ..DomainServices.ServicesInterfaces.IReservationService import IReservationService
from ..DomainServices.RepositoryInterfaces.IReservationRepository import (
    IReservationRepository,
)
from .GenericService import GenericService
from ..DomainServices.RepositoryInterfaces.IScheduledActRepository import IScheduledActRepository
from ..DomainServices.RepositoryInterfaces.IActivityRepository import IActivityRepository
from api.models.actividad_programada import Actividad_programada
from api.models.actividad import Actividad
from api.InfrastructurePersistence.ScheduledActRepository import ScheduledActRepository
from api.InfrastructurePersistence.ActivityRepository import ActivityRepository
from .ScheduledActService import ScheduledActService
from .ActivityService import ActivityService
from django.core.exceptions import ObjectDoesNotExist


class ReservationService(GenericService, IReservationService):
    def __init__(self, reservation_repository: IReservationRepository):
        super().__init__(reservation_repository)
        self.reservation_repository = reservation_repository
        self.scheduledActService = ScheduledActService(ScheduledActRepository())
        self.activityService = ActivityService(ActivityRepository())
    


    def create(self, data):
        # Obtener la instalación correspondiente a la actividad
        self.check_for_consistency(data)
        # Llamar al método create del GenericService
        return super().create(data)
    
    def update(self, id, data):
            # Comprobar los requerimientos de cantidad de personas 
            self.check_for_consistency(data)
            return super().update(id, data)
    
    @staticmethod
    def check_for_consistency(data):
        # Obtener la actividad correspondiente a la reservación
        actividad_programada = data.get('idAP')
        num_ninos = data.get('num_ninos')
      
        # Calcular el número actual de participantes
        total_participantes_actuales = ScheduledActRepository.get_actividades_numparticipantes()
        participantes = 0
        for act in total_participantes_actuales:
            if act['idAP'] == actividad_programada.idAP:
                participantes = act['total_participants']
                break
    
         # Verificar si la capacidad es suficiente
        if participantes + num_ninos > actividad_programada.idA.num_participantes:
            raise ValueError("La capacidad de la actividad es insuficiente para esta reservación.")

    def get_reservations_by_user(self, user_id):
        return self.reservation_repository.get_reservations_by_user(user_id)

    def get_unconfirmed_reservations(self):
        return self.reservation_repository.get_unconfirmed_reservations()
