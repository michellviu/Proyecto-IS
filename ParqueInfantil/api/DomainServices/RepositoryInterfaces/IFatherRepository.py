from abc import ABC, abstractmethod
from .IGenericRepository import IGenericRepository

class IFatherRepository(IGenericRepository, ABC):
    pass