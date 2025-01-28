from django.http import JsonResponse
from django.apps import apps
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework.decorators import api_view
from rest_framework import generics, status
from .permissions.permissions_by_roles import IsAdmin
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from api.serializers.serializer import ModelNameSerializer


class MetadataView(generics.ListAPIView):
    permission_classes = [IsAdmin]
    serializer_class = ModelNameSerializer

    def __init__(self, **kwargs):
        super().__init__(**kwargs)

    def get(self, request, *args, **kwargs):
        models = apps.get_models()
        model_names = [model._meta.object_name for model in models]
        data = {"models": model_names}
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
        # serializer = self.get_serializer(data={"models": model_names})
        # serializer.is_valid(raise_exception=True)
    # Retornar la lista de modelos como JSON
        # return Response(serializer.data, status=status.HTTP_200_OK)
    
# @api_view(["GET"])
# def metadata_view(request):
#     # Obtener todas las aplicaciones instaladas
#     models = apps.get_models()
#     # Extraer solo los nombres de los modelos
#     model_names = [model._meta.object_name for model in models]
#     # Retornar la lista de modelos como JSON
#     return JsonResponse({"models": model_names})
