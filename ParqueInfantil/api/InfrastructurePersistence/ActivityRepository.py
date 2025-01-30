from api.models.actividad import Actividad
from api.models.actividad_programada import Actividad_programada
from api.models.calificacion import Calificacion
from api.DomainServices.RepositoryInterfaces.IActivityRepository import (
    IActivityRepository,
)
from .GenericRepository import GenericRepository
from datetime import datetime, timedelta


class ActivityRepository(GenericRepository, IActivityRepository):
    def __init__(self):
        super().__init__(Actividad)

    def get_average_calification(actividad_id):
        # Filter scheduled activities by the given activity ID
        act_progs = Actividad_programada.objects.filter(idAP=actividad_id)

        # Calculate the date for one month ago from now
        last_month = datetime.now() - timedelta(days=30)

        # Filter activities that occurred within the last month
        act_progs = act_progs.filter(fecha_hora__gte=last_month)

        if act_progs:
            puntuacion_total = 0
            cantidad_calificaciones = 0

            # Iterate through each scheduled activity
            for act_prog in act_progs:
                # Get all califications for the current scheduled activity
                califications = Calificacion.objects.filter(idAP=act_prog.idAP)

                # Sum the scores of all califications
                puntuacion_total += sum(
                    calificacion.puntuacion for calificacion in califications
                )

                # Count the number of califications
                cantidad_calificaciones += califications.count()

            # Calculate and return the average score if there are any califications
            if cantidad_calificaciones > 0:
                return puntuacion_total / cantidad_calificaciones
            else:
                return 0
        # else:
        #     raise ValueError(
        #         "No hay actividades programadas asociadas a la actividad."
        #     )
        return None

    @staticmethod
    def get_activities_qualifications():
        """
        Retrieve the qualifications for all activities.

        This method fetches all activities and calculates the average
        qualification for each activity. It returns a list of dictionaries
        containing the activity ID, name, and average qualification score.

        Returns:
            list: A list of dictionaries with activity details and their
                  average qualification scores.
        """
        activities_details = []

        # Fetch all activities
        all_activities = Actividad.objects.all()

        # Iterate through each activity to calculate its average qualification
        for activity in all_activities:
            activity_details = {
                "id": activity.idA,
                "nombre": activity.nombre,
                "puntuacion": ActivityRepository.get_average_calification(activity.idA),
            }

            activities_details.append(activity_details)

        return activities_details
