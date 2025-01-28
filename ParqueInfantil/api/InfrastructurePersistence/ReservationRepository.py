from api.models.reservacion import Reservacion
from api.DomainServices.RepositoryInterfaces.IReservationRepository import (
    IReservationRepository,
)
from .GenericRepository import GenericRepository


class ReservationRepository(GenericRepository, IReservationRepository):
    def __init__(self):
        super().__init__(Reservacion)

    def get_reservations_by_user(self, user_id):
        """
        Retrieve all reservations made by a specific user.

        Args:
            user_id (int): The ID of the user whose reservations are to be retrieved.

        Returns:
            QuerySet: A QuerySet containing all reservations made by the specified user.
        """
        reservations_by_user = Reservacion.objects.filter(idP=user_id)
        return reservations_by_user

        # return self.session.query(Reservacion).filter_by(idP=user_id).all()

    def get_unconfirmed_reservations(self):
        """
        Retrieve all unconfirmed reservations.

        Returns:
            QuerySet: A QuerySet containing all unconfirmed reservations.
        """
        unconfirmed_reservations = Reservacion.objects.filter(estado="Pendiente")
        return unconfirmed_reservations
