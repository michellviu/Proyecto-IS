from abc import ABC, abstractmethod
from .IGenericService import IGenericService

class IResourceService(IGenericService, ABC):
   
   
   @abstractmethod
   def get_resource_in_use(self):
        pass