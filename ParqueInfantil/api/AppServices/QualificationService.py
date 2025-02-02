from ..DomainServices.ServicesInterfaces.IQualificationService import (
    IQualificationService,
)
from ..DomainServices.RepositoryInterfaces.IQualificationRepository import (
    IQualificationRepository,
)
from .GenericService import GenericService
from ..DomainServices.ServicesInterfaces.IScheduledActService import IScheduledActService
from ..DomainServices.RepositoryInterfaces.IScheduledActRepository import IScheduledActRepository
from rest_framework.exceptions import ValidationError
from django.db import IntegrityError


class QualificationService(GenericService, IQualificationService):

    def __init__(self, qualification_repository: IQualificationRepository, scheduled_act_service: IScheduledActService):
        super().__init__(qualification_repository)
        self.qualification_repository = qualification_repository
        self.scheduled_act_service = scheduled_act_service

    def create(self, data):
        """
        Create a new qualification.

        Args:
            data (dict): The data of the qualification to create.

        Returns:
            dict: The data of the created qualification.
        """
        # Check if the activity is in the past
        
        if self.check_for_consistency(data):
          try:
            return super().create(data)
          except Exception as e:
              raise ValidationError(str(e))
            
        raise ValidationError("No se puede calificar una actividad que no se ha realizado.")
    

    def update(self, id, data):
        if self.check_for_consistency(data):
           try:
            return super().update(id,data)
           except Exception as e:
              raise ValidationError(str(e))
            
        raise ValidationError("No se puede calificar una actividad que no se ha realizado.")


    def check_for_consistency(self,data):
        actividad = data.get('idAP')
        # Check if the activity is in the past
        for act in self.scheduled_act_service.get_actividades_realizadas():
            if act.idAP == actividad.idAP:
                return True
        for act in self.scheduled_act_service.get_actividades_en_tiempo_real():
            if act.idAP == actividad.idAP:
                return True
        return False


    def get_qualifications_by_activity(self, activity_id):
        """
        Retrieve qualifications for a specific activity.

        Args:
            activity_id (int): The ID of the activity for which to retrieve qualifications.

        Returns:
            list: A list of qualifications associated with the specified activity.
        """
        return self.qualification_repository.get_qualifications_by_activity(activity_id)
    
    def get_qualifications_by_user(self, user_id):
        """
        Retrieve qualifications for a specific user.

        Args:
            user_id (int): The ID of the user for which to retrieve qualifications.

        Returns:
            list: A list of qualifications associated with the specified user.
        """
        return self.qualification_repository.get_qualifications_by_user(user_id)