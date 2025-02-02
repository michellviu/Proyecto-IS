from abc import ABC, abstractmethod

class IGenericRepository(ABC):
    @abstractmethod
    def get_all(self):
        pass

    @abstractmethod
    def get_by_id(self, id):
        pass

    @abstractmethod
    def create(self, entity):
        pass

    @abstractmethod
    def update(self, entity, data):
        pass

    @abstractmethod
    def delete(self, entity):
        pass

    @abstractmethod
    def search(self, field_name, query):
        pass

    @abstractmethod
    def get_all_order_by_property(self,field_name,criterio):
        pass