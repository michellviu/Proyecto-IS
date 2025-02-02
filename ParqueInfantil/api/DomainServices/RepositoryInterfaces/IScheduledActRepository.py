from abc import ABC, abstractmethod
from .IGenericRepository import IGenericRepository

class IScheduledActRepository(IGenericRepository, ABC):
     
     @abstractmethod
     def get_actividades_en_tiempo_real(self):
          pass

     @abstractmethod
     def get_actividades_realizadas(self):
          pass

     @abstractmethod
     def get_actividades_futuras(self):
          pass

     @abstractmethod
     def get_actividades_numparticipantes(self):
          pass