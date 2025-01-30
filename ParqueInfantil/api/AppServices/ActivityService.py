from ..DomainServices.ServicesInterfaces.IActivityService import IActivityService
from ..DomainServices.RepositoryInterfaces.IActivityRepository import (
    IActivityRepository,
)
from .GenericService import GenericService


class ActivityService(GenericService, IActivityService):
    def __init__(self, activity_repository: IActivityRepository):
        super().__init__(activity_repository)
        self.activity_repository = activity_repository

    def get_average_calification(self, activity_id):
        return self.activity_repository.get_average_calification(activity_id)

    def get_activities_qualifications(self):
        return self.activity_repository.get_activities_qualifications()
