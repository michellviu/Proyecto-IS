from abc import ABC, abstractmethod
from .IGenericService import IGenericService

class IUserService(IGenericService, ABC):

    @abstractmethod
    def get_by_role(self, role):
        pass

    @abstractmethod
    def get_unconfirmed_users(self):
        pass