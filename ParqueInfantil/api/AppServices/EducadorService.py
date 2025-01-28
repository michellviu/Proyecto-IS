from ..DomainServices.ServicesInterfaces.IEducadorService import IEducadorService
from ..DomainServices.RepositoryInterfaces.IEducadorRepository import IEducadorRepository
from .GenericService import GenericService

class EducadorService(GenericService, IEducadorService):
    def __init__(self, educador_repository: IEducadorRepository):
        super().__init__(educador_repository)