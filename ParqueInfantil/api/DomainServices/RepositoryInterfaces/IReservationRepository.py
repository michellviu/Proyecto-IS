from abc import ABC, abstractmethod
from .IGenericRepository import IGenericRepository


class IReservationRepository(IGenericRepository, ABC):

    @abstractmethod
    def get_reservations_by_user(self, user_id):
        pass

    @abstractmethod
    def get_unconfirmed_reservations(self):
        pass

    pass
