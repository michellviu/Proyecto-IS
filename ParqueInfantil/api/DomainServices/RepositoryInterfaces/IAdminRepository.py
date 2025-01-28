from abc import ABC, abstractmethod
from .IGenericRepository import IGenericRepository

class IAdminRepository(IGenericRepository, ABC):
    pass