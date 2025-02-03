from rest_framework.views import APIView
from django.http import Http404
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from rest_framework.permissions import AllowAny
from api.AppServices.ScheduledActService import ScheduledActService
from api.InfrastructurePersistence.ScheduledActRepository import ScheduledActRepository
from api.serializers.ScheduledActSerializer import ScheduledActSerializer
from api.serializers.serializer import Actividad_programadaSerializer
from .permissions.permissions_by_roles import IsAdmin, IsPadre, IsEducador
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.pagination import PageNumberPagination
from .custompaginator.custompaginator import SmallPageNumberPagination

# vista para crear o listar todas las instalaciones
class ScheduledActView(generics.ListCreateAPIView):
    serializer_class = Actividad_programadaSerializer

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.scheduled_act_service = ScheduledActService(ScheduledActRepository())

    @swagger_auto_schema(
        operation_description="Listar todas las actividades programadas",
        responses={200: Actividad_programadaSerializer(many=True)},
    )
    def get(self, request, format=None):
        # Obtener todos los objetos del modelo
        queryset = self.scheduled_act_service.get_all()
        # Crear una instancia de PageNumberPagination
        paginator = PageNumberPagination()
        paginator.page_size = 15  # Número de elementos por página

        # Paginar el queryset
        result_page = paginator.paginate_queryset(queryset, request)
        # Serializar los objetos paginados
        serializer = Actividad_programadaSerializer(result_page, many=True)

        # Devolver la respuesta paginada
        return paginator.get_paginated_response(serializer.data)
    

    # @swagger_auto_schema(
    #     operation_description="Crear una nueva actividad programada",
    #     request_body=Actividad_programadaSerializer,
    #     responses={201: Actividad_programadaSerializer},
    # )
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.scheduled_act_service.create(serializer.validated_data)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def get_permissions(self):
        if self.request.method == "POST":
            return [IsAdmin()]
        elif self.request.method == "GET":
            return [AllowAny()]
        return super().get_permissions()


# vista para ver, actualizar o eliminar una actividad programada
class ScheduledActDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = Actividad_programadaSerializer

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.scheduled_act_service = ScheduledActService(ScheduledActRepository())


    @swagger_auto_schema(
        operation_description="Obtener los detalles de una actividad programada",
        responses={200: Actividad_programadaSerializer},
    )
    def retrieve(self, request, *args, **kwargs):
        try:
            scheduled_act = self.scheduled_act_service.get_by_id(self.kwargs["pk"])
            serializer = self.get_serializer(scheduled_act)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ObjectDoesNotExist as e:
            return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)


    @swagger_auto_schema(
        operation_description="Actualizar una actividad programada existente",
        request_body=Actividad_programadaSerializer,
        responses={200: Actividad_programadaSerializer},
    )
    def update(self, request, *args, **kwargs):

        try:
          scheduled_act = self.scheduled_act_service.get_by_id(self.kwargs["pk"])
          serializer = self.get_serializer(scheduled_act, data=request.data)
          serializer.is_valid(raise_exception=True)
          self.scheduled_act_service.update(scheduled_act.idAP, serializer.validated_data)
          return Response(serializer.data,status=status.HTTP_200_OK)
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except ObjectDoesNotExist as e:
            return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)

    @swagger_auto_schema(
        operation_description="Eliminar una actividad programada",
        responses={204: "No Content"},
    )
    def destroy(self, request, *args, **kwargs):
        try:
         self.scheduled_act_service.delete(self.kwargs["pk"])
         return Response(status=status.HTTP_204_NO_CONTENT)
        except ObjectDoesNotExist as e:
            return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)
        


# vista para listar actividades programadas en tiempo real
class ScheduledActRealTimeView(generics.ListAPIView):
    permission_classes = [AllowAny]

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.scheduled_act_service = ScheduledActService(ScheduledActRepository())

    @swagger_auto_schema(
        operation_description="Listar actividades programadas en tiempo real",
        responses={200: Actividad_programadaSerializer(many=True)},
    )
    def get(self, request, *args, **kwargs):
        actividades = self.scheduled_act_service.get_actividades_en_tiempo_real()
        serializer = Actividad_programadaSerializer(actividades, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class ScheduledActCatalogView(generics.ListAPIView):
    serializer_class = ScheduledActSerializer
    pagination_class = SmallPageNumberPagination 

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.scheduled_act_service = ScheduledActService(ScheduledActRepository())

    @swagger_auto_schema(
        operation_description="Catalogo de las actividades programadas",
        responses={200: ScheduledActSerializer(many=True)},
    )
    def get_queryset(self):
        return self.scheduled_act_service.get_all()
    

class ScheduledActRealizView(generics.ListAPIView):
    serializer_class = ScheduledActSerializer

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.scheduled_act_service = ScheduledActService(ScheduledActRepository())

    def get_queryset(self):
        return self.scheduled_act_service.get_actividades_realizadas()
    

class ScheduledActFuturaView(generics.ListAPIView):
    serializer_class = ScheduledActSerializer

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.scheduled_act_service = ScheduledActService(ScheduledActRepository())

    def get_queryset(self):
        return self.scheduled_act_service.get_actividades_futuras()


class ScheduledActParticipantsView(generics.ListAPIView):
    serializer_class = ScheduledActSerializer
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.scheduled_act_service = ScheduledActService(ScheduledActRepository())
 
    def get(self, request, *args, **kwargs):
            actividades_numparticipantes = self.scheduled_act_service.get_actividades_numparticipantes()
            return Response(actividades_numparticipantes, status=status.HTTP_200_OK)
        

class ScheduledActForEducadorView(generics.ListAPIView):
    serializer_class = ScheduledActSerializer
    permission_classes = [IsEducador]

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.scheduled_act_service = ScheduledActService(ScheduledActRepository())

    def get_queryset(self):
        user = self.request.user
        return self.scheduled_act_service.get_actividades_por_educador(user.idU)