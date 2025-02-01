from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from .permissions.permissions_by_roles import IsAdmin
from api.InfrastructurePersistence.GenericRepository import GenericRepository
from api.serializers.Utils import get_serializer_for_model,get_model_for_name


class OrderByPropertyView(APIView):
    permission_classes = [IsAdmin]

    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter('model', openapi.IN_QUERY, description="Model name", type=openapi.TYPE_STRING),
            openapi.Parameter('field', openapi.IN_QUERY, description="Field name", type=openapi.TYPE_STRING),
            openapi.Parameter('criterion', openapi.IN_QUERY, description="Criterion", type=openapi.TYPE_STRING),
        ],
        responses={200: 'Success', 400: 'Bad Request'}
    )
    def get(self, request, *args, **kwargs):
        model_name = request.query_params.get('model')
        field_name = request.query_params.get('field')
        criterion = request.query_params.get('criterion')
        
        if not model_name or not field_name or not criterion:
            return Response({"error": "Model, field, and criterion parameters are required."}, status=status.HTTP_400_BAD_REQUEST)
        
        model = get_model_for_name(model_name)
        repository = GenericRepository(model)
        if field_name == 'id':
            field_name = model._meta.pk.name
        results = repository.get_all_order_by_property(field_name, criterion)
        
        serializer_class = get_serializer_for_model(model_name)
        if not serializer_class:
            return Response({"error": "Invalid model name."}, status=status.HTTP_400_BAD_REQUEST)
        serializer = serializer_class(results, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)