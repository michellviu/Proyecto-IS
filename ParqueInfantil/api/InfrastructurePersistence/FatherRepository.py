from api.models.usuario import Padre,Usuario
from api.DomainServices.RepositoryInterfaces.IUserRepository import (
    IUserRepository,
)
from .GenericRepository import GenericRepository
from .UserRepository import UserRepository


class FatherRepository(GenericRepository,IUserRepository):
    def __init__(self):
        super().__init__(Padre)
    