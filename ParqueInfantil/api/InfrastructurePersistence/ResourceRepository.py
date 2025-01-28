from api.models.recurso import Recurso
from api.models.actividad_programada import Actividad_programada
from api.DomainServices.RepositoryInterfaces.IResourceRepository import (
    IResourceRepository,
)
from .GenericRepository import GenericRepository
from api.DomainServices.RepositoryInterfaces.IScheduledActRepository import (
    IScheduledActRepository,
)


class ResourceRepository(GenericRepository, IResourceRepository):
    def __init__(self,sheduledact_repository:IScheduledActRepository):
        super().__init__(Recurso)
        self.sheduledact_repository = sheduledact_repository

    
    def get_resource_in_use(self):
         # Obtener actividades en tiempo real
        actividades_en_tiempo_real = self.sheduledact_repository.get_actividades_en_tiempo_real()
        # Obtener los IDs de los recursos en uso
        instalacionid = []
        for act in actividades_en_tiempo_real:
            instalacionid.append(act.idA.idI)
        # # Obtener los recursos que están siendo utilizados en este momento
        recursos_en_uso = Recurso.objects.filter(idI__in=instalacionid)
        return recursos_en_uso