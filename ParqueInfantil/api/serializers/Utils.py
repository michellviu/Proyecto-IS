from api.models import (
    Instalacion,
    Recurso,
    Usuario,
    Padre,
    Educador,
    Administrador,
    Actividad_programada,
    Actividad,
    Reservacion,
    Calificacion,
)
from api.serializers.serializer import (
    InstalacionSerializer,
    RecursoSerializer,
    PadreSerializer,
    EducadorSerializer,
    AdministradorSerializer,
    Actividad_programadaSerializer,
)
from api.serializers.UserSerializer import UserSerializer
from api.serializers.ActivitySerializer import ActividadSerializer
from api.serializers.ReservationSerializer import ReservacionSerializer
from api.serializers.QualificationSerializer import QualificationSerializer


def get_serializer_for_model(model_name):
    serializers = {
        "Instalacion": InstalacionSerializer,
        "Recurso": RecursoSerializer,
        "Usuario": UserSerializer,
        "Padre": PadreSerializer,
        "Educador": EducadorSerializer,
        "Administrador": AdministradorSerializer,
        "Actividad_programada": Actividad_programadaSerializer,
        "Actividad": ActividadSerializer,
        "Reservacion": ReservacionSerializer,
        "Calificacion": QualificationSerializer,
    }
    return serializers.get(model_name)


def get_model_for_name(model_name):
    models = {
        "Instalacion": Instalacion,
        "Recurso": Recurso,
        "Usuario": Usuario,
        "Padre": Padre,
        "Educador": Educador,
        "Administrador": Administrador,
        "Actividad_programada": Actividad_programada,
        "Actividad": Actividad,
        "Reservacion": Reservacion,
        "Calificacion": Calificacion,
    }
    return models.get(model_name)
