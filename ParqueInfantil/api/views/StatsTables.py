from django.http import JsonResponse
from ..AppServices.ActivityService import ActivityService
from ..InfrastructurePersistence.ActivityRepository import ActivityRepository
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
