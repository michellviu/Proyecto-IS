from api.models.recurso import Recurso
from api.models.actividad_programada import Actividad_programada

from api.DomainServices.RepositoryInterfaces.IResourceRepository import (
    IResourceRepository,
)
from .GenericRepository import GenericRepository
from api.DomainServices.RepositoryInterfaces.IScheduledActRepository import (
    IScheduledActRepository,
)
from api.DomainServices.RepositoryInterfaces.IInstallationRepository import IInstallationRepository


class ResourceRepository(GenericRepository, IResourceRepository):
    def __init__(self,sheduledact_repository:IScheduledActRepository,instalation_repository:IInstallationRepository):
        super().__init__(Recurso)
        self.sheduledact_repository = sheduledact_repository
        self.instalation_repository = instalation_repository
    

    def get_frecuencia_uso(self,id_recurso):
        # Obtener actividades en tiempo real
        instalaciones = self.instalation_repository.get_numactividades()

        recurso = Recurso.objects.get(idR=id_recurso)
        # Obtener los IDs de los recursos en uso
        recursos = []
        for int in instalaciones:
            if int['idI'] == recurso.idI.idI:
                return int['numero_actividades']
        return 0
    
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