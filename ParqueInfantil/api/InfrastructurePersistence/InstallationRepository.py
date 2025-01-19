from api.models.instalacion import Instalacion
from api.DomainServices.RepositoryInterfaces.IInstallationRepository import (
    IInstallationRepository,
)
from .GenericRepository import GenericRepository


class InstallationRepository(GenericRepository, IInstallationRepository):
    def __init__(self):
        super().__init__(Instalacion)
