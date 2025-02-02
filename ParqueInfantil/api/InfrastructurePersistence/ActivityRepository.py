from api.models.actividad import Actividad
from api.models.actividad_programada import Actividad_programada
from api.models.calificacion import Calificacion
from api.models.reservacion import Reservacion
from api.DomainServices.RepositoryInterfaces.IActivityRepository import (
    IActivityRepository,
)
from .GenericRepository import GenericRepository
from datetime import datetime, timedelta
from .ScheduledActRepository import ScheduledActRepository
from api.DomainServices.RepositoryInterfaces.IScheduledActRepository import (
    IScheduledActRepository,
)


class ActivityRepository(GenericRepository, IActivityRepository):
    def __init__(self):
        super().__init__(Actividad)
    
    @staticmethod
    def get_average_calification(actividad_id):
        # Filter scheduled activities by the given activity ID
        act_progs = Actividad_programada.objects.filter(idA=actividad_id)

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
                return None
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
                "idA": activity.idA,
                "nombre": activity.nombre,
                "puntuacion": ActivityRepository.get_average_calification(activity.idA),
            }

            activities_details.append(activity_details)

        return activities_details

    # def get_cant_participantes_confirmados(actividad_programada_id):
    #     reservaciones = Reservacion.objects.filter(
    #         idAP=actividad_programada_id, estado="Confirmado"
    #     )
    #     total_ninos = sum(reservacion.num_ninos for reservacion in reservaciones)
    #     return total_ninos

    @staticmethod
    def get_cant_participantes(actividad_id):
        act_progs = ScheduledActRepository.get_actividades_numparticipantes()
        cant_participantes = 0
        for act_prog in act_progs:
            if act_prog["idA"] == actividad_id:
                cant_participantes += act_prog["total_participants"]
        return cant_participantes

    @staticmethod
    def get_most_participated_activities():
        activities_details = []
        all_activities = Actividad.objects.all()
        for activity in all_activities:
            activity_details = {
                "id": activity.idA,
                "nombre": activity.nombre,
                "participantes": ActivityRepository.get_cant_participantes(
                    activity.idA
                ),
            }
            activities_details.append(activity_details)

        return activities_details
