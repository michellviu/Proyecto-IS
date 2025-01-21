from api.models.usuario import Educador
from api.DomainServices.RepositoryInterfaces.IUserRepository import (
    IUserRepository,
)
from .GenericRepository import GenericRepository


class EducatorRepository(GenericRepository, IUserRepository):
    def __init__(self):
        super().__init__(Educador)