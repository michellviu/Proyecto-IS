from api.models.usuario import Padre
from .GenericRepository import GenericRepository
from api.DomainServices.RepositoryInterfaces.IFatherRepository import IFatherRepository


class FatherRepository(GenericRepository,IFatherRepository):
    def __init__(self):
        super().__init__(Padre)
    