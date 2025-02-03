from abc import ABC, abstractmethod
from .IGenericRepository import IGenericRepository

class IResourceRepository(IGenericRepository, ABC):

     @abstractmethod
     def get_resource_in_use(self):
          pass
     
     @abstractmethod
     def get_frecuencia_uso(self,id_recurso):
          pass
    