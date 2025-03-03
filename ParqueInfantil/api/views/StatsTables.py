from django.http import JsonResponse
from ..AppServices.ActivityService import ActivityService
from ..InfrastructurePersistence.ActivityRepository import ActivityRepository
from ..AppServices.ResourceService import ResourceService
from ..InfrastructurePersistence.ResourceRepository import ResourceRepository
from ..InfrastructurePersistence.InstallationRepository import InstallationRepository
from ..InfrastructurePersistence.ScheduledActRepository import ScheduledActRepository
from django.views import View


class ExportHighestAverageCalificationActivitiesView(View):
    def get(self, request):
        activities = ActivityService(
            ActivityRepository()
        ).get_highest_average_calification_activities()
        data = []
        for activity in activities:
            data.append(
                {
                    "id": activity["id"],
                    "nombre": activity["nombre"],
                    "puntuacion": round(activity["puntuacion"], 1),
                }
            )
        return JsonResponse(data, safe=False)


class View_activities_with_highest_participation(View):
    def get(self, request):
        activities = ActivityService(
            ActivityRepository()
        ).get_activities_with_highest_participation()
        data = []
        for activity in activities:
            data.append(
                {
                    "id": activity["id"],
                    "nombre": activity["nombre"],
                    "participantes": activity["participantes"],
                }
            )
        return JsonResponse(data, safe=False)


class View_recursos_mas_utilizados(View):
    def get(self, request):
        resources = ResourceService(
            ResourceRepository(ScheduledActRepository(), InstallationRepository())
        ).get_recursos_mas_utilizados()
        if resources is None:
            resources = []
        data = []
        for resource in resources:
            data.append(
                {
                    "id": resource["id"],
                    "tipo_recurso": resource["tipo_recurso"],
                    "nombre_instalacion": resource["nombre_instalacion"],
                    "total_usos": resource["total_usos"],
                }
            )
        return JsonResponse(data, safe=False)
