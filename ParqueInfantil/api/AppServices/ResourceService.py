from ..DomainServices.ServicesInterfaces.IResourceService import IResourceService
from ..DomainServices.RepositoryInterfaces.IResourceRepository import IResourceRepository
from .GenericService import GenericService

class ResourceService(GenericService, IResourceService):
    def __init__(self, resource_repository: IResourceRepository):
        super().__init__(resource_repository)
        self.repository = resource_repository
    

    def get_resource_in_use(self):
        return self.repository.get_resource_in_use()
    
    def get_resource_disponibles(self):
        return self.repository.get_resource_disponibles()
    
    def get_frecuencia_uso(self,id_recurso):
        return self.repository.get_frecuencia_uso(id_recurso)