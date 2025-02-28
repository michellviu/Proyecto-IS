from django.db import connection
from api.models.calificacion import Calificacion
from api.DomainServices.RepositoryInterfaces.IQualificationRepository import (
    IQualificationRepository,
)
from .GenericRepository import GenericRepository


class QualificationRepository(GenericRepository, IQualificationRepository):
    def __init__(self):
        super().__init__(Calificacion)

    # Method to get qualifications by activity ID
    def get_qualifications_by_activity(self, activity_id):
        return Calificacion.objects.filter(idAP=activity_id)

    def get_qualifications_by_user(self, user_id):
        return Calificacion.objects.filter(idU=user_id)

    def group_by_scores(self):
        with connection.cursor() as cursor:

            query = """
                SELECT puntuacion, COUNT(*) AS total
                FROM api_calificacion
                GROUP BY puntuacion
                ORDER BY puntuacion;
            """
            cursor.execute(query)
            rows = cursor.fetchall()
        return {row[0]: row[1] for row in rows}
