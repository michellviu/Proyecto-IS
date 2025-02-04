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
         # Obtener todos los modelos
        all_models = apps.get_models()
        # Filtrar solo los modelos definidos por ti (excluyendo los de Django)
        custom_models = [model for model in all_models if model._meta.app_label == 'api']
        # Obtener los nombres de los modelos
        model_names = [model._meta.object_name for model in custom_models]
        # Preparar los datos para el serializador
        data = {"models": model_names}
        # Serializar los datos
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        # Devolver la respuesta
        return Response(serializer.data, status=status.HTTP_200_OK)
    
