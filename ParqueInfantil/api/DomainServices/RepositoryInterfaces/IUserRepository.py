from abc import ABC, abstractmethod
from .IGenericRepository import IGenericRepository

class IUserRepository(IGenericRepository, ABC):
    
    @abstractmethod
    def get_unconfirmed_users(self):
        pass