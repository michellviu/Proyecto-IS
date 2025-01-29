from django.apps import apps
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi


class AttributesView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_description="Obtener los atributos de una tabla específica",
        manual_parameters=[
            openapi.Parameter(
                "table_name",
                openapi.IN_PATH,
                description="Nombre de la tabla",
                type=openapi.TYPE_STRING,
                required=True,
            )
        ],
        responses={
            200: openapi.Response(
                description="Atributos de la tabla",
                examples={
                    "application/json": [
                        {"name": "id", "null": False},
                        {"name": "nombre", "null": True},
                        # Agrega más ejemplos según sea necesario
                    ]
                },
            ),
            404: openapi.Response(
                description="Tabla no encontrada",
                examples={"application/json": {"error": "Table not found"}},
            ),
        },
    )
    def get(self, request, table_name, *args, **kwargs):
        try:
            model = apps.get_model("api", table_name)
        except LookupError:
            return Response(
                {"error": "Table not found"}, status=status.HTTP_404_NOT_FOUND
            )

        attributes = []
        if table_name == 'Usuario':
            # Define los campos específicos que quieres devolver para el modelo Usuario
            specific_fields = ['idU', 'username', 'email', 'rol']
            for field in model._meta.fields:
                if field.name in specific_fields:
                    field_name = 'id' if field.primary_key else field.name
                    attributes.append({"name": field_name, "null": field.null})
        else:
         for field in model._meta.fields:
            field_name = 'id' if field.primary_key else field.name
            attributes.append({"name": field_name, "null": field.null})

        return Response(attributes, status=status.HTTP_200_OK)
