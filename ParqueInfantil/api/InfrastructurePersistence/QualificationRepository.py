from api.models.calificacion import Calificacion
from api.DomainServices.RepositoryInterfaces.IQualificationRepository import (
    IQualificationRepository,
)
from .GenericRepository import GenericRepository


class ReservationRepository(GenericRepository, IQualificationRepository):
    def __init__(self):
        super().__init__(Calificacion)
