from api.models.instalacion import Instalacion
from api.models.actividad import Actividad
from api.models.actividad_programada import Actividad_programada
from api.DomainServices.RepositoryInterfaces.IInstallationRepository import (
    IInstallationRepository,
)
from .GenericRepository import GenericRepository
from django.db.models import F, Sum
from django.db.models import Count


class InstallationRepository(GenericRepository, IInstallationRepository):
    def __init__(self):
        super().__init__(Instalacion)

    def get_numactividades(self):

        instalaciones_numactividades = (
            Actividad_programada.objects
            .values('idA')
            .values('idA__idI')
            .annotate(idI=F('idA__idI'))
            .annotate(nombre=F('idA__idI__nombre'))
            .annotate(numero_actividades=Count('idAP'))
        )
        return instalaciones_numactividades
    

    def get_most_used_installation(self):
        intatallations_details = []
        all_installations = Instalacion.objects.all()
        for installation in all_installations:
            intatallation_detail = {
                "id": installation.idI,
                "nombre": installation.nombre,
                "numero_actividades_realizadas": self.get_numactividades(installation.idI),
             
            }
            intatallations_details.append(intatallation_detail)

        return intatallations_details
     

# .select_related('actividades__actividades_programadas')