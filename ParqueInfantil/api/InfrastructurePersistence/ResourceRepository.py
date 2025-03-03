from api.models.recurso import Recurso
from api.models.actividad_programada import Actividad_programada

from api.DomainServices.RepositoryInterfaces.IResourceRepository import (
    IResourceRepository,
)
from .GenericRepository import GenericRepository
from api.DomainServices.RepositoryInterfaces.IScheduledActRepository import (
    IScheduledActRepository,
)
from api.DomainServices.RepositoryInterfaces.IInstallationRepository import (
    IInstallationRepository,
)
from django.db import connection


class ResourceRepository(GenericRepository, IResourceRepository):
    def __init__(
        self,
        sheduledact_repository: IScheduledActRepository,
        instalation_repository: IInstallationRepository,
    ):
        super().__init__(Recurso)
        self.sheduledact_repository = sheduledact_repository
        self.instalation_repository = instalation_repository

    def get_frecuencia_uso(self, id_recurso):
        # Obtener actividades en tiempo real
        instalaciones = self.instalation_repository.get_numactividades()

        recurso = Recurso.objects.get(idR=id_recurso)
        # Obtener los IDs de los recursos en uso
        recursos = []
        for inst in instalaciones:
            if inst["idI"] == recurso.idI.idI:
                return inst["numero_actividades"]
        return 0

    def get_resource_in_use(self):
        # Obtener actividades en tiempo real
        actividades_en_tiempo_real = (
            self.sheduledact_repository.get_actividades_en_tiempo_real()
        )
        # Obtener los IDs de los recursos en uso
        instalacionid = []
        for act in actividades_en_tiempo_real:
            instalacionid.append(act.idA.idI)
        # # Obtener los recursos que están siendo utilizados en este momento
        recursos_en_uso = Recurso.objects.filter(idI__in=instalacionid)
        return recursos_en_uso

    def get_resource_disponibles(self):
        # Obtener los recursos en uso
        recursos_en_uso = self.get_resource_in_use()
        # Obtener los IDs de los recursos en uso
        recursos_en_uso_ids = recursos_en_uso.values_list("idR", flat=True)
        # Obtener los recursos que no están en uso
        recursos_disponibles = Recurso.objects.exclude(idR__in=recursos_en_uso_ids)
        return recursos_disponibles

    def get_recursos_mas_utilizados(self):
        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT 
                    r."idR" AS recurso_id,
                    r.tipo AS tipo_recurso,
                    i.nombre AS nombre_instalacion,
                    COUNT(ap."idAP") AS total_usos
                FROM 
                    "api_recurso" r
                INNER JOIN 
                    "api_instalacion" i ON r."idI_id" = i."idI"
                INNER JOIN 
                    "api_actividad" a ON i."idI" = a."idI_id"
                INNER JOIN 
                    "api_actividad_programada" ap ON a."idA" = ap."idA_id"
                --WHERE 
                    --ap.fecha_hora >= NOW() - INTERVAL '30 days'
                GROUP BY 
                    r."idR", r.tipo, i.nombre
                ORDER BY 
                    total_usos DESC
                LIMIT 10;
            """
            )

            rows = cursor.fetchall()

            resources = [
                {
                    "id": row[0],
                    "tipo_recurso": row[1],
                    "nombre_instalacion": row[2],
                    "total_usos": row[3],
                }
                for row in rows
            ]

        return resources
