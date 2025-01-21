from django.apps import apps
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

class AttributesView(APIView):

    def get(self, request, table_name, *args, **kwargs):
        try:
            model = apps.get_model('api', table_name)
        except LookupError:
            return Response({"error": "Table not found"}, status=status.HTTP_404_NOT_FOUND)
        
        attributes = []
        for field in model._meta.fields:
            attributes.append({
                "name": field.name,
                "null": field.null
            })
        
        return Response(attributes, status=status.HTTP_200_OK)