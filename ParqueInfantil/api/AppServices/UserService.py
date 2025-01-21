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
    
    def confirm_role(self, user_id):
        user = self.get_by_id(user_id)
        
        if user is None:
            return None
        if user.role_confirmation:
            return user
        user.role_confirmation = True
        user.save()

        # Insertar en la tabla correspondiente
        if user.rol == 'padre':
            Padre.objects.create(idP=user)
        elif user.rol == 'admin':
            Administrador.objects.create(idA=user)
        elif user.rol == 'educador':
            Educador.objects.create(idE=user)
        
        return user