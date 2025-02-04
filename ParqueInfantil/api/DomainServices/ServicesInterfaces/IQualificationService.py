from abc import ABC, abstractmethod
from .IGenericService import IGenericService

class IQualificationService(IGenericService, ABC):
    
    @abstractmethod
    def get_qualifications_by_user(self, idU: int):
        pass