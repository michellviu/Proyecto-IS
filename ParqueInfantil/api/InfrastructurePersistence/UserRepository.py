from api.models.usuario import Usuario
from api.DomainServices.RepositoryInterfaces.IUserRepository import (
    IUserRepository,
)
from .GenericRepository import GenericRepository


class UserRepository(GenericRepository, IUserRepository):
    def __init__(self):
        super().__init__(Usuario)
    
    def get_by_role(self, role):
        return Usuario.objects.filter(rol=role, role_confirmation=True)
    
    def get_unconfirmed_users(self):
        return Usuario.objects.filter(role_confirmation=False)
