from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.db import models
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from .permissions.permissions_by_roles import IsAdmin
from api.InfrastructurePersistence.GenericRepository import GenericRepository
from api.serializers.Utils import get_serializer_for_model,get_model_for_name
from rest_framework import generics
from rest_framework.pagination import PageNumberPagination

class SearchView(generics.ListAPIView):
    permission_classes = [AllowAny]

    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter('model', openapi.IN_QUERY, description="Model name", type=openapi.TYPE_STRING),
            openapi.Parameter('field', openapi.IN_QUERY, description="Field name", type=openapi.TYPE_STRING),
            openapi.Parameter('query', openapi.IN_QUERY, description="Search query", type=openapi.TYPE_STRING),
        ],
        responses={200: 'Success', 400: 'Bad Request'}
    )
    def get(self, request, *args, **kwargs):
        model_name = request.query_params.get('model')
        field_name = request.query_params.get('field')
        query = request.query_params.get('query')
        
        if not model_name or not field_name:
            return Response({"error": "Model, field, and query parameters are required."}, status=status.HTTP_400_BAD_REQUEST)
        
        model = get_model_for_name(model_name)

        field_names = [field for field in model._meta.get_fields()]
        llaves_foraneas = []
        for field in field_names:
            if isinstance(field, models.ForeignKey):
             llaves_foraneas.append(field.name)

        print(field_names)
        print(llaves_foraneas)
        for llave in llaves_foraneas:
            if field_name == llave:
                field_name = f"{field_name}__{field_name}"
                break
        if field_name == 'id':
            field_name = model._meta.pk.name
        elif field_name == 'idE__idE':
            field_name = 'idE__idE__idU'
        elif field_name == 'idP__idP':
            field_name = 'idP__idP__idU'
        repository = GenericRepository(model)
        print(field_name.__str__())
        results = repository.search(field_name, query)
        

        paginator = PageNumberPagination()
        paginator.page_size = 10  # Número de elementos por página

        # Paginar el queryset
        result_page = paginator.paginate_queryset(results, request)

        serializer_class = get_serializer_for_model(model_name)
        if not serializer_class:
            return Response({"error": "Invalid model name."}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = serializer_class(result_page, many=True)

        # Devolver la respuesta paginada
        return paginator.get_paginated_response(serializer.data)