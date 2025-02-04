from abc import ABC, abstractmethod
from .IGenericRepository import IGenericRepository

class IInstallationRepository(IGenericRepository, ABC):
    
    @abstractmethod
    def get_numactividades():
        pass