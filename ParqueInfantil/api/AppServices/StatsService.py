from ..AppServices.QualificationService import QualificationService
from ..InfrastructurePersistence.QualificationRepository import QualificationRepository


class Stats:
    def __init__(self):
        self.qualification_service = QualificationService(QualificationRepository())

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
