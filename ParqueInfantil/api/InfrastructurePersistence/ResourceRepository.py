from api.models import Recurso
from api.DomainServices.RepositoryInterfaces.IResourceRepository import IResourceRepository
from .GenericRepository import GenericRepository

class ResourceRepository(GenericRepository,IResourceRepository):
   def __init__(self):
        super().__init__(Recurso)