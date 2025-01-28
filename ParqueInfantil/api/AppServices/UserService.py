from ..DomainServices.ServicesInterfaces.IUserService import IUserService
from ..DomainServices.RepositoryInterfaces.IUserRepository import IUserRepository
from .GenericService import GenericService
from ..models.usuario import Padre, Administrador, Educador

class UserService(GenericService, IUserService):
    def __init__(self, user_repository: IUserRepository):
        super().__init__(user_repository)
        self.user_repository = user_repository
    
    def get_by_role(self, role):
        return self.user_repository.get_by_role(role)
    
    def get_unconfirmed_users(self):
        return self.user_repository.get_unconfirmed_users()
    
   