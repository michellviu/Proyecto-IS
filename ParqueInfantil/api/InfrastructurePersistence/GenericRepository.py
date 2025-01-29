from api.DomainServices.RepositoryInterfaces.IGenericRepository import IGenericRepository

class GenericRepository(IGenericRepository):
    def __init__(self, model):
        self.model = model

    def get_all(self):
        return self.model.objects.all()

    def get_by_id(self, id):
        primary_key = self.model._meta.pk.name
        try:
            return self.model.objects.get(**{primary_key: id})
        except self.model.DoesNotExist:
            return None

    def create(self, data):
        return self.model.objects.create(**data)

    def update(self, instance, data):
        for key, value in data.items():
            setattr(instance, key, value)
        instance.save()
        return instance

    def delete(self, instance):
        instance.delete()
    
    def search(self, field_name, query):
        filter_kwargs = {f"{field_name}__icontains": query}
        return self.model.objects.filter(**filter_kwargs)