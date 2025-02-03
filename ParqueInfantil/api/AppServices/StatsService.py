from ..AppServices.QualificationService import QualificationService
from ..InfrastructurePersistence.QualificationRepository import QualificationRepository
from ..InfrastructurePersistence.ScheduledActRepository import ScheduledActRepository
from ..AppServices.ActivityService import ActivityService
from ..InfrastructurePersistence.ActivityRepository import ActivityRepository
from ..InfrastructurePersistence.InstallationRepository import InstallationRepository
from ..AppServices.ResourceService import ResourceService
from ..InfrastructurePersistence.ResourceRepository import ResourceRepository
from api.models.reservacion import Reservacion
from django.db.models import Count, Case, When, IntegerField
from collections import defaultdict



class Stats:
    def __init__(self):
        self.qualification_service = QualificationService(QualificationRepository(),ScheduledActRepository())
        self.activity_service = ActivityService(ActivityRepository())
        self.resource_service = ResourceService(ResourceRepository(ScheduledActRepository(),InstallationRepository()))

    def CalificacionesUsuarios(self):

        calificaciones = self.qualification_service.get_all()

        puntuaciones = {}
        for calificacion in calificaciones:
            puntuacion = calificacion.puntuacion
            if puntuacion in puntuaciones:
                puntuaciones[puntuacion] += 1
            else:
                puntuaciones[puntuacion] = 1
        return puntuaciones
    
    
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
    
    def get_actividades_avg_qualifications(self):
        activities = self.activity_service.get_all()
        avg_qualifications = {}
        for activity in activities:
            avg_qualifications[activity.idA] = {
                "nombre": activity.nombre,
                "calificacion": self.activity_service.get_average_calification(activity.idA)
            }
        return avg_qualifications
    
    def get_most_participated_activities(self):
        activities = self.activity_service.get_most_participated_activities()
        # Ordenar las actividades por el número de participantes y tomar las primeras 3
        most_participated_activities = sorted(activities, key=lambda a: a['participantes'], reverse=True)[:3]
        return most_participated_activities
    
    
    def get_recursos_mas_utilizados(self):
        recursos = self.resource_service.get_all()
        response = {}
        for recurso in recursos:
            response[recurso.idR] = {
                "cantidad": self.resource_service.get_frecuencia_uso(recurso.idR)}
        return response
        
        
        
