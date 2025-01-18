from django.http import JsonResponse
from django.apps import apps


def metadata_view(request):
    # Obtener todas las aplicaciones instaladas
    models = apps.get_models()
    # Extraer solo los nombres de los modelos
    model_names = [model._meta.object_name for model in models]
    # Retornar la lista de modelos como JSON
    return JsonResponse({"models": model_names})
