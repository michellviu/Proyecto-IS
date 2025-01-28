from api.models.actividad_programada import Actividad_programada
from api.DomainServices.RepositoryInterfaces.IScheduledActRepository import (
    IScheduledActRepository,
)
from .GenericRepository import GenericRepository
from django.utils import timezone
from django.db.models import F, ExpressionWrapper, DurationField
import pytz


class ScheduledActRepository(GenericRepository, IScheduledActRepository):
    def __init__(self):
        super().__init__(Actividad_programada)
    
    def get_actividades_en_tiempo_real(self):
         # Obtener la zona horaria UTC-5
        cuba_tz = pytz.timezone('America/Havana')
        # Obtener la hora actual en UTC-5
        now = timezone.now().astimezone(cuba_tz)
        # Obtener todas las actividades programadas junto con la información de actividad
        actividades_programadas = Actividad_programada.objects.select_related('idA')
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

       
        