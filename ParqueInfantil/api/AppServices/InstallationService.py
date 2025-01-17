from ..DomainServices.ServicesInterfaces.IInstallationService import IInstallationService
from ..DomainServices.RepositoryInterfaces.IInstallationRepository import IInstallationRepository
from .GenericService import GenericService

class InstallationService(GenericService, IInstallationService):
    def __init__(self, installation_repository: IInstallationRepository):
        super().__init__(installation_repository)