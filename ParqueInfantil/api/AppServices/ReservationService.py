from ..DomainServices.ServicesInterfaces.IReservationService import IReservationService
from ..DomainServices.RepositoryInterfaces.IReservationRepository import (
    IReservationRepository,
)
from .GenericService import GenericService
from ..DomainServices.RepositoryInterfaces.IScheduledActRepository import IScheduledActRepository
from ..DomainServices.RepositoryInterfaces.IActivityRepository import IActivityRepository
from api.models.actividad_programada import Actividad_programada
from api.models.actividad import Actividad
from api.InfrastructurePersistence.ScheduledActRepository import ScheduledActRepository
from api.InfrastructurePersistence.ActivityRepository import ActivityRepository
from .ScheduledActService import ScheduledActService
from .ActivityService import ActivityService
from django.core.exceptions import ObjectDoesNotExist
from datetime import datetime, timedelta
from django.utils.timezone import make_naive
from django.db.models import Count, Case, When, IntegerField
from collections import defaultdict
from api.models.reservacion import Reservacion


class ReservationService(GenericService, IReservationService):
    def __init__(self, reservation_repository: IReservationRepository):
        super().__init__(reservation_repository)
        self.reservation_repository = reservation_repository
        self.scheduledActService = ScheduledActService(
            ScheduledActRepository())
        self.activityService = ActivityService(ActivityRepository())

    def create(self, data):
        # Obtener la instalación correspondiente a la actividad
        self.check_for_consistency(data)
        # Llamar al método create del GenericService
        return super().create(data)

    def update(self, id, data):
            # Comprobar los requerimientos de cantidad de personas
            self.check_for_consistency(data)
            return super().update(id, data)

    @staticmethod
    def check_for_consistency(data):
        # Obtener la actividad correspondiente a la reservación
        actividad_programada = data.get('idAP')
        num_ninos = data.get('num_ninos')
        estado = data.get('estado')
        
        if estado == 'Cancelado':
            return

        # Calcular el número actual de participantes
        total_participantes_actuales = ScheduledActRepository.get_actividades_numparticipantes()
        participantes = 0
        for act in total_participantes_actuales:
            if act['idAP'] == actividad_programada.idAP:
                fecha_fin_naive = make_naive(act['fecha_fin'])
                if fecha_fin_naive < datetime.now():
                    raise ValueError("La actividad ya ha finalizado.")
                participantes = act['total_participants']
                break

         # Verificar si la capacidad es suficiente
        if participantes + num_ninos > actividad_programada.idA.num_participantes:
            raise ValueError(
                "La capacidad de la actividad es insuficiente para esta reservación.")

    def get_reservations_by_user(self, user_id):
        return self.reservation_repository.get_reservations_by_user(user_id)

    def get_unconfirmed_reservations(self):
        ReservationService.get_tasa_confirmacion_por_rangoedad()
        return self.reservation_repository.get_unconfirmed_reservations()
    
    @staticmethod
    def get_tasa_confirmacion_por_rangoedad():
        # Definir los rangos de edad
        rangos_edad = {
        '0-5': (0, 5),
        '6-12': (6, 12),
        '13-18': (13, 18),        
        }

        # Inicializar un diccionario para almacenar los resultados
        resultados = defaultdict(lambda: {'confirmadas': 0, 'canceladas': 0})

        # Iterar sobre los rangos de edad
        for rango, (edad_min, edad_max) in rangos_edad.items():
        # Filtrar las reservaciones dentro del rango de edad
          reservaciones = Reservacion.objects.filter(
          idAP__idA__edadmin_recomendada__gte=edad_min,
          idAP__idA__edadmax_recomendada__lte=edad_max
          ).aggregate(
          confirmadas=Count(Case(When(estado='Confirmado', then=1), output_field=IntegerField())),
          canceladas=Count(Case(When(estado='Cancelado', then=1), output_field=IntegerField()))
          )
        # Almacenar los resultados
          resultados[rango]['confirmadas'] = reservaciones['confirmadas']
          resultados[rango]['canceladas'] = reservaciones['canceladas']

        # Calcular las proporciones
        for rango, datos in resultados.items():
           total = datos['confirmadas'] + datos['canceladas']
           if total > 0:
              datos['proporcion_confirmadas'] = datos['confirmadas'] / total
              datos['proporcion_canceladas'] = datos['canceladas'] / total
           else:
              datos['proporcion_confirmadas'] = 0
              datos['proporcion_canceladas'] = 0

        # Mostrar los resultados
        for rango, datos in resultados.items():
            print(f"Rango de edad {rango}:")
            print(f"  Confirmadas: {datos['confirmadas']} ({datos['proporcion_confirmadas']:.2%})")
            print(f"  Canceladas: {datos['canceladas']} ({datos['proporcion_canceladas']:.2%})")
        
        return resultados