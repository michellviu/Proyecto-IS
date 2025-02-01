from ..AppServices.GraficsService import Graphics as rs
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class TestGraficarCalificacionesView(APIView):

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.rps = rs()

    def get(self, request, *args, **kwargs):
        try:
            self.rps.GraficarCalificaciones()
            return Response(
                {"message": "GraficarCalificaciones executed successfully"},
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
