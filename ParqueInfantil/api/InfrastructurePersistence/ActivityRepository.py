from api.models.actividad import Actividad
from api.DomainServices.RepositoryInterfaces.IActivityRepository import (
    IActivityRepository,
)
from .GenericRepository import GenericRepository


class ActivityRepository(GenericRepository, IActivityRepository):
    def __init__(self):
        super().__init__(Actividad)
