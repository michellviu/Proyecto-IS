from ..DomainServices.ServicesInterfaces.IQualificationService import (
    IQualificationService,
)
from ..DomainServices.RepositoryInterfaces.IQualificationRepository import (
    IQualificationRepository,
)
from .GenericService import GenericService


class ReservationService(GenericService, IQualificationService):
    def __init__(self, reservation_repository: IQualificationRepository):
        super().__init__(reservation_repository)
