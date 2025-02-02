from abc import ABC, abstractmethod
from .IGenericService import IGenericService

class IActivityService(IGenericService,ABC):


    @abstractmethod
    def get_cant_participantes(self,actividad_id):
        pass
    @abstractmethod
    def get_most_participated_activities(self):
         pass
    @abstractmethod
    def get_activities_qualifications(self):
        pass
    @abstractmethod
    def get_average_calification(self, activity_id):
         pass