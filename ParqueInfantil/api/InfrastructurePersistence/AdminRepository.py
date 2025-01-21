from api.models.usuario import Administrador
from api.DomainServices.RepositoryInterfaces.IUserRepository import (
    IUserRepository,
)
from .GenericRepository import GenericRepository


class AdminRepository(GenericRepository, IUserRepository):
    def __init__(self):
        super().__init__(Administrador)