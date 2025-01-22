from abc import ABC, abstractmethod
from .IGenericRepository import IGenericRepository

class IResourceRepository(IGenericRepository, ABC):
    pass