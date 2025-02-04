from api.models.usuario import Administrador
from .GenericRepository import GenericRepository
from api.DomainServices.RepositoryInterfaces.IAdminRepository import IAdminRepository

class AdminRepository(GenericRepository,IAdminRepository):
    def __init__(self):
        super().__init__(Administrador)