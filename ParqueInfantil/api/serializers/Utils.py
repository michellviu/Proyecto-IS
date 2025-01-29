from api.models import Instalacion, Recurso, Usuario, Padre, Educador, Administrador, Actividad_programada, Actividad, Reservacion, Calificacion
from api.serializers.serializer import InstalacionSerializer, RecursoSerializer, PadreSerializer, EducadorSerializer, AdministradorSerializer, Actividad_programadaSerializer, ActividadSerializer, ReservacionSerializer, CalificacionSerializer
from api.serializers.UserSerializer import UserSerializer
def get_serializer_for_model(model_name):
    serializers = {
        'Instalacion': InstalacionSerializer,
        'Recurso': RecursoSerializer,
        'Usuario': UserSerializer,
        'Padre': PadreSerializer,
        'Educador': EducadorSerializer,
        'Administrador': AdministradorSerializer,
        'Actividad_programada': Actividad_programadaSerializer,
        'Actividad': ActividadSerializer,
        'Reservacion': ReservacionSerializer,
        'Calificacion': CalificacionSerializer,
    }
    return serializers.get(model_name)

def get_model_for_name(model_name):
    models = {
        'Instalacion': Instalacion,
        'Recurso': Recurso,
        'Usuario': Usuario,
        'Padre': Padre,
        'Educador': Educador,
        'Administrador': Administrador,
        'Actividad_programada': Actividad_programada,
        'Actividad': Actividad,
        'Reservacion': Reservacion,
        'Calificacion': Calificacion,
    }
    return models.get(model_name)