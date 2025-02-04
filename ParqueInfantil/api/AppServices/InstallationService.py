from ..DomainServices.ServicesInterfaces.IInstallationService import IInstallationService
from ..DomainServices.RepositoryInterfaces.IInstallationRepository import IInstallationRepository
from .GenericService import GenericService

class InstallationService(GenericService, IInstallationService):
    def __init__(self, installation_repository: IInstallationRepository):
        super().__init__(installation_repository)
        self.installation_repository = installation_repository
    
  
    def get_numactividades(self):
        return self.installation_repository.get_numactividades()
    

    def get_most_used_installation(self):
        return self.installation_repository.get_most_used_installation()