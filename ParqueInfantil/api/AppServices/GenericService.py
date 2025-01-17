from ..DomainServices.ServicesInterfaces.IGenericService import IGenericService
from ..DomainServices.RepositoryInterfaces.IGenericRepository import IGenericRepository

class GenericService(IGenericService):
    def __init__(self, generic_repository: IGenericRepository):
        self.generic_repository = generic_repository
        

    def get_all(self):
        return self.generic_repository.get_all()

    def get_by_id(self, id):
        return self.generic_repository.get_by_id(id)

    def create(self, data):
        return self.generic_repository.create(data)

    def update(self, id, data):
        entity = self.generic_repository.get_by_id(id)
        return self.generic_repository.update(entity, data)

    def delete(self, id):
        activity = self.generic_repository.get_by_id(id)
        return self.generic_repository.delete(activity)