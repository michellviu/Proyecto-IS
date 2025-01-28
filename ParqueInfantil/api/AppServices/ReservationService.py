from ..DomainServices.ServicesInterfaces.IReservationService import IReservationService
from ..DomainServices.RepositoryInterfaces.IReservationRepository import (
    IReservationRepository,
)
from .GenericService import GenericService


class ReservationService(GenericService, IReservationService):
    def __init__(self, reservation_repository: IReservationRepository):
        super().__init__(reservation_repository)
        self.reservation_repository = reservation_repository

    def get_reservations_by_user(self, user_id):
        return self.reservation_repository.get_reservations_by_user(user_id)

    def get_unconfirmed_reservations(self):
        return self.reservation_repository.get_unconfirmed_reservations()
