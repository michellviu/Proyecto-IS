from ..DomainServices.ServicesInterfaces.IFatherService import IFatherService
from ..DomainServices.RepositoryInterfaces.IFatherRepository import IFatherRepository
from .GenericService import GenericService

class FatherService(GenericService, IFatherService):
    def __init__(self, father_repository: IFatherRepository):
        super().__init__(father_repository)