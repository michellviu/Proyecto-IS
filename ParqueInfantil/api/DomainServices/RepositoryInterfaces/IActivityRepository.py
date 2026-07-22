from abc import ABC, abstractmethod
from .IGenericRepository import IGenericRepository


class IActivityRepository(IGenericRepository, ABC):
    pass

    @abstractmethod
    def get_average_calification(self, activity_id: int) -> float:
        pass

    @abstractmethod
    def get_activities_qualifications(self) -> list:
        pass

    @abstractmethod
    def get_most_participated_activities(self) -> list:
        pass

    @abstractmethod
    def get_cant_participantes(self, actividad_id):
        pass

    @abstractmethod
    def get_highest_average_calification_activities(self):
        pass

    @abstractmethod
    def get_activities_with_highest_participation(self):
        pass
