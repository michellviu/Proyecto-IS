from api.models.actividad_programada import Actividad_programada
from api.models.reservacion import Reservacion
from api.DomainServices.RepositoryInterfaces.IScheduledActRepository import (
    IScheduledActRepository,
)
from .GenericRepository import GenericRepository
from django.utils import timezone
from django.db.models import F, ExpressionWrapper, DurationField
import pytz
from django.db.models import Sum


class ScheduledActRepository(GenericRepository, IScheduledActRepository):
    def __init__(self):
        super().__init__(Actividad_programada)
    
    def get_actividades_en_tiempo_real(self):
         # Obtener la zona horaria UTC-5
        cuba_tz = pytz.timezone('America/Havana')
        # Obtener la hora actual en UTC-5
        now = timezone.now().astimezone(cuba_tz)
        # Obtener todas las actividades programadas junto con la información de actividad
        actividades_programadas = Actividad_programada.objects.select_related('idA__idI')
        actividades_programadas=actividades_programadas.filter(fecha_hora__lte=now, fecha_hora__gte=now - F('idA__duracion'))
        return actividades_programadas
    
    def get_actividades_realizadas(self):
        # Obtener la zona horaria UTC-5
        cuba_tz = pytz.timezone('America/Havana')
        # Obtener la hora actual en UTC-5
        now = timezone.now().astimezone(cuba_tz)
        # Obtener todas las actividades programadas junto con la información de actividad
        actividades_programadas = Actividad_programada.objects.select_related('idA')
        actividades_programadas=actividades_programadas.filter(fecha_hora__lt=now - F('idA__duracion'))
        return actividades_programadas
    
    def get_actividades_futuras(self):
        # Obtener la zona horaria UTC-5
        cuba_tz = pytz.timezone('America/Havana')
        # Obtener la hora actual en UTC-5
        now = timezone.now().astimezone(cuba_tz)
        # Obtener todas las actividades programadas junto con la información de actividad
        actividades_programadas = Actividad_programada.objects.select_related('idA')
        actividades_programadas=actividades_programadas.filter(fecha_hora__gt=now)
        return actividades_programadas
    

    @staticmethod
    def get_actividades_numparticipantes():
        # Realizar el join y agrupar por idAP, sumando num_ninos
        actividades_participantes = (
            Reservacion.objects
            .filter(estado='Confirmado')
            .values('idAP')
            .annotate(idA=F('idAP__idA'))
            .annotate(nombre_actividad=F('idAP__idA__nombre'))
            .annotate(fecha_inicio=F('idAP__fecha_hora'))
            .annotate(fecha_fin=F('idAP__fecha_hora')+F('idAP__idA__duracion'))
            .annotate(total_participants=Sum('num_ninos'))
        )
        return actividades_participantes
    
    def get_actividades_por_educador(self, educador_id):
        actividades_programadas=Actividad_programada.objects.filter(idE=educador_id)
        return actividades_programadas

       
        