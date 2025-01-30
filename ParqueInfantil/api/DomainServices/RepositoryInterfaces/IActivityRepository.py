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
