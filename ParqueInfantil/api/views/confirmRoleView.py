from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from api.InfrastructurePersistence.AdminRepository import AdminRepository
from api.InfrastructurePersistence.UserRepository import UserRepository
from api.InfrastructurePersistence.FatherRepository import FatherRepository
from api.InfrastructurePersistence.EducadorRepository import EducadorRepository
from api.AppServices.AdminService import AdminService
from .permissions.permissions_by_roles import IsAdmin
from api.serializers.UserSerializer import UserSerializer

class ConfirmRoleView(generics.UpdateAPIView):
    permission_classes = [IsAdmin]
    serializer_class = UserSerializer

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.admin_service = AdminService(UserRepository(),AdminRepository(),FatherRepository(),EducadorRepository())

    def update(self, request, *args, **kwargs):
        user_id = self.kwargs['idU']
        user = self.admin_service.confirm_role(user_id)
        if user is None:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        
        return Response({"message": "Role confirmation updated and user inserted into corresponding table successfully"}, status=status.HTTP_200_OK)