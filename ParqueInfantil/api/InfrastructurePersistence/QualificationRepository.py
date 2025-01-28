from api.models.calificacion import Calificacion
from api.DomainServices.RepositoryInterfaces.IQualificationRepository import (
    IQualificationRepository,
)
from .GenericRepository import GenericRepository


class QualificationRepository(GenericRepository, IQualificationRepository):
    def __init__(self):
        super().__init__(Calificacion)

    # Method to get qualifications by activity ID
    def get_qualifications_by_activity(self, activity_id):
        return Calificacion.objects.filter(idAP=activity_id)
