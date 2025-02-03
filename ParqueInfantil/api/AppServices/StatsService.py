from ..AppServices.QualificationService import QualificationService
from ..InfrastructurePersistence.QualificationRepository import QualificationRepository
from ..InfrastructurePersistence.ScheduledActRepository import ScheduledActRepository
from api.models.reservacion import Reservacion
from django.db.models import Count, Case, When, IntegerField
from collections import defaultdict



class Stats:
    def __init__(self):
        self.qualification_service = QualificationService(QualificationRepository(),ScheduledActRepository())

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
