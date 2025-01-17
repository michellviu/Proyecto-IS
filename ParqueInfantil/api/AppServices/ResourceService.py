from ..DomainServices.ServicesInterfaces.IActivityService import IActivityService
from ..DomainServices.RepositoryInterfaces.IActivityRepository import IActivityRepository
from .GenericService import GenericService

class ResourceService(GenericService, IActivityService):
    def __init__(self, activity_repository: IActivityRepository):
        super().__init__(activity_repository)