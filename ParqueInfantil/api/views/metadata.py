from django.http import JsonResponse
from django.apps import apps
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework.decorators import api_view


@swagger_auto_schema(
    method="get",
    operation_description="Obtener los nombres de todos los modelos de las aplicaciones instaladas",
    responses={
        200: openapi.Response(
            description="Lista de modelos",
            examples={"application/json": {"models": ["Model1", "Model2", "Model3"]}},
        )
    },
)
@api_view(["GET"])
def metadata_view(request):
    # Obtener todas las aplicaciones instaladas
    models = apps.get_models()
    # Extraer solo los nombres de los modelos
    model_names = [model._meta.object_name for model in models]
    # Retornar la lista de modelos como JSON
    return JsonResponse({"models": model_names})
