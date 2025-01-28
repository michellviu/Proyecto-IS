from abc import ABC, abstractmethod
from .IGenericService import IGenericService

class IAdminService(IGenericService,ABC):
    @abstractmethod
    def confirm_role(self, id):
        pass
    