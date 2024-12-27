from ..DomainServices.ServicesInterfaces.IActivityService import IActivityService
from ..DomainServices.RepositoryInterfaces.IActivityRepository import IActivityRepository

class ActivityService(IActivityService):
    def __init__(self, activity_repository: IActivityRepository):
        self.activity_repository = activity_repository

    def get_all(self):
        return self.activity_repository.get_all()

    def get_by_id(self, idA):
        return self.activity_repository.get_by_id(idA)

    def create(self, data):
        return self.activity_repository.create(data)

    def update(self, id, data):
        activity = self.activity_repository.get_by_id(id)
        return self.activity_repository.update(activity, data)

    def delete(self, idA):
        activity = self.activity_repository.get_by_id(idA)
        return self.activity_repository.delete(activity)