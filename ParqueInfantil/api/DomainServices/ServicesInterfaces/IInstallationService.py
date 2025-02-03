from abc import ABC, abstractmethod
from .IGenericService import IGenericService

class IInstallationService(IGenericService,ABC):
    
    @abstractmethod
    def get_numactividades():
        pass