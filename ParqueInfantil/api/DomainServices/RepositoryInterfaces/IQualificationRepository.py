from abc import ABC, abstractmethod
from .IGenericRepository import IGenericRepository


class IQualificationRepository(IGenericRepository):

    @abstractmethod
    def get_qualifications_by_activity(self, idAP: int):
        pass

    pass
