from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.http import FileResponse
from api.AppServices.GraficsService import Graphics
import os

class StatsCalificacionesTotalesView(APIView):
    permission_classes = [AllowAny]
    
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.graphics = Graphics()

    def get(self, request, *args, **kwargs):
        self.graphics.GraficarCalificaciones()
        image_path = "media/images/reportes/calificaciones.png"
        return Response({"image_path": image_path})

class StatsReservacionesAceptadasView(APIView):
    permission_classes = [AllowAny]
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.graphics = Graphics()

    def get(self, request, *args, **kwargs):
        self.graphics.GraficarTasaConfirmacionPorRangoEdad()
        image_path = "media/images/reportes/reservaciones_aceptadas.png"
        return Response({"image_path": image_path})

class StatsReservacionesDenegadasView(APIView):
    permission_classes = [AllowAny]
    
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.graphics = Graphics()

    def get(self, request, *args, **kwargs):
        self.graphics.GraficarTasaConfirmacionPorRangoEdad()

        image_path = "media/images/reportes/reservaciones_denegadas.png"
        return Response({"image_path": image_path})

class StatsReservacionesTotalesView(APIView):
    permission_classes = [AllowAny]
    
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.graphics = Graphics()

    def get(self, request, *args, **kwargs):
        self.graphics.GraficarTasaConfirmacionPorRangoEdad()
        image_path = "media/images/reportes/reservaciones_totales.png"
        return Response({"image_path": image_path})

class StatsActividadesCalificacionesAvgView(APIView):
    permission_classes = [AllowAny]
    
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.graphics = Graphics()

    def get(self, request, *args, **kwargs):
        self.graphics.Graficar_Actividades_Avg_Qualifications()
        image_path = "media/images/reportes/actividades_calificaciones.png"
        return Response({"image_path": image_path})

class StatsActividadesMasParticipadasView(APIView):
    permission_classes = [AllowAny]
    
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.graphics = Graphics()

    def get(self, request, *args, **kwargs):
        self.graphics.Graficar_Actividades_Mas_Participadas()
        image_path = "media/images/reportes/actividades_participantes.png"
        return Response({"image_path": image_path})
    
class StatsUsoDeRecursosView(APIView):
    permission_classes = [AllowAny]
    
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.graphics = Graphics()

    def get(self, request, *args, **kwargs):
        self.graphics.Graficar_Uso_De_Recursos()
        image_path = "media/images/reportes/recursos_uso.png"
        return Response({"image_path": image_path})