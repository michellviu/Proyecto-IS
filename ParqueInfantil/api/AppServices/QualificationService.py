from ..DomainServices.ServicesInterfaces.IQualificationService import (
    IQualificationService,
)
from ..DomainServices.RepositoryInterfaces.IQualificationRepository import (
    IQualificationRepository,
)
from .GenericService import GenericService


class QualificationService(GenericService, IQualificationService):

    def __init__(self, qualification_repository: IQualificationRepository):
        super().__init__(qualification_repository)

    def get_qualifications_by_activity(self, activity_id):
        """
        Retrieve qualifications for a specific activity.

        Args:
            activity_id (int): The ID of the activity for which to retrieve qualifications.

        Returns:
            list: A list of qualifications associated with the specified activity.
        """
        return self.repository.get_qualifications_by_activity(activity_id)
