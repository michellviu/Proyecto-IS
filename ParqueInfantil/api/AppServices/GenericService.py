from ..DomainServices.ServicesInterfaces.IGenericService import IGenericService
from ..DomainServices.RepositoryInterfaces.IGenericRepository import IGenericRepository
from django.core.exceptions import ObjectDoesNotExist

class GenericService(IGenericService):
    def __init__(self, generic_repository: IGenericRepository):
        self.generic_repository = generic_repository
        

    def get_all(self):
        return self.generic_repository.get_all()

    def get_by_id(self, id):
        entity = self.generic_repository.get_by_id(id)
        if entity is None:
           raise ObjectDoesNotExist(f"Entity with id {id} not found.")
        return entity

    def create(self, data):
        return self.generic_repository.create(data)

    def update(self, id, data):
        try:
            entity = self.get_by_id(id)
            return self.generic_repository.update(entity, data)
        except ObjectDoesNotExist:
            raise ObjectDoesNotExist(f"Entity with id {id} not found.")

        

    def delete(self, id):
        try:
            entity = self.get_by_id(id)
            return self.generic_repository.delete(entity)
        except ObjectDoesNotExist:
            raise ObjectDoesNotExist(f"Entity with id {id} not found.")