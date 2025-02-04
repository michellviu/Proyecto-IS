from ..DomainServices.ServicesInterfaces.IAdminService import IAdminService
from ..DomainServices.RepositoryInterfaces.IUserRepository import IUserRepository
from ..DomainServices.RepositoryInterfaces.IAdminRepository import IAdminRepository
from ..DomainServices.RepositoryInterfaces.IFatherRepository import IFatherRepository
from ..DomainServices.RepositoryInterfaces.IEducadorRepository import IEducadorRepository
from .GenericService import GenericService

class AdminService(GenericService, IAdminService):
    def __init__(self,user_repository:IUserRepository, admin_repository: IAdminRepository, father_repository:IFatherRepository,educador_repository:IEducadorRepository):
        super().__init__(user_repository)
        self.admin_repository = admin_repository
        self.father_repository = father_repository
        self.educador_repository = educador_repository
    


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
            self.father_repository.create({'idP': user})
        elif user.rol == 'admin':
            self.admin_repository.create({'idA': user})
        elif user.rol == 'educador':
            self.educador_repository.create({'idE': user})
        
        return user