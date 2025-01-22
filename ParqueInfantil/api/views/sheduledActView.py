from rest_framework.views import APIView
from django.http import Http404
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from rest_framework.permissions import AllowAny
from api.AppServices.ScheduledActService import ScheduledActService
from api.InfrastructurePersistence.ScheduledActRepository import ScheduledActRepository
from api.serializers.ScheduledActSerializer import ScheduledActSerializer
from .permissions.permissions_by_roles import IsAdmin, IsPadre, IsEducador



# vista para crear o listar todas las instalaciones
class ScheduledActView(generics.ListCreateAPIView):
   
    serializer_class = ScheduledActSerializer

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.scheduled_act_service = ScheduledActService(ScheduledActRepository())

    def get_queryset(self):
        return self.scheduled_act_service.get_all()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.scheduled_act_service.create(serializer.validated_data)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAdmin()]
        elif self.request.method == 'GET':
            return [AllowAny()]
        return super().get_permissions()


# vista para ver, actualizar o eliminar una instalacion
class ScheduledActDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ScheduledActSerializer

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.scheduled_act_service = ScheduledActService(ScheduledActRepository())

    def get_object(self):
        obj = self.scheduled_act_service.get_by_id(self.kwargs["pk"])
        if obj is None:
            raise Http404("Scheduled activity not found")
        return obj
    
    def update(self, request, *args, **kwargs):
        scheduled_act = self.get_object()
        serializer = self.get_serializer(scheduled_act, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.scheduled_act_service.update(scheduled_act.idAP, serializer.validated_data)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        self.scheduled_act_service.delete(self.kwargs["pk"])
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        elif self.request.method == 'PUT':
            return [IsAdmin()]
        elif self.request.method == 'DELETE':
            return [IsAdmin()]
        return super().get_permissions()





class ScheduledActRealTimeView(generics.ListAPIView):
    permission_classes = [AllowAny]

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.scheduled_act_service = ScheduledActService(ScheduledActRepository())

    def get(self, request, *args, **kwargs):
        actividades = self.scheduled_act_service.get_actividades_en_tiempo_real()
        serializer = ScheduledActSerializer(actividades, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)