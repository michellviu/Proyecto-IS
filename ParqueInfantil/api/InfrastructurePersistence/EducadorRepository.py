from api.models.usuario import Educador
from .GenericRepository import GenericRepository
from api.DomainServices.RepositoryInterfaces.IEducadorRepository import IEducadorRepository

class EducadorRepository(GenericRepository,IEducadorRepository):
    def __init__(self):
        super().__init__(Educador)