from ..DomainServices.ServicesInterfaces.IScheduledActService import IScheduledActService
from ..DomainServices.RepositoryInterfaces.IScheduledActRepository import IScheduledActRepository
from .GenericService import GenericService

class ScheduledActService(GenericService, IScheduledActService):
    def __init__(self, scheduled_act_repository: IScheduledActRepository):
        super().__init__(scheduled_act_repository)
        self.scheduled_act_repository = scheduled_act_repository
    
    def get_actividades_en_tiempo_real(self):
       return self.scheduled_act_repository.get_actividades_en_tiempo_real()
    
    def get_actividades_realizadas(self):
        return self.scheduled_act_repository.get_actividades_realizadas()
    
    def get_actividades_futuras(self):
        return self.scheduled_act_repository.get_actividades_futuras()