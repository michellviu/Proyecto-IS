from django.http import Http404
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import status
from api.serializers.UserSerializer import UserSerializer
from api.AppServices.UserService import UserService
from api.InfrastructurePersistence.UserRepository import UserRepository
from .permissions.permissions_by_roles import IsAdmin, IsAdminOrSelf


class UserView(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAdmin]

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.user_service = UserService(UserRepository())

    def get_queryset(self):
        return self.user_service.get_all()


class UnconfirmedUsersView(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAdmin]

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.user_service = UserService(UserRepository())

    def get_queryset(self):
        return self.user_service.get_unconfirmed_users()


class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    # permission_classes = [IsAdminOrSelf]

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.user_service = UserService(UserRepository())

    def get_object(self):
        user_id = self.kwargs["pk"]
        user = self.user_service.get_by_id(user_id)
        if user is None:
            raise Http404("User not found")
        return user

    def update(self, request, *args, **kwargs):
        user = self.get_object()
        self.check_object_permissions(request, user)
        serializer = self.get_serializer(user, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.user_service.update(user.idU, serializer.validated_data)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        user = self.get_object()
        self.check_object_permissions(request, user)
        self.user_service.delete(user.idU)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def get_permissions(self):
        if self.request.method == "GET":
            return [IsAdmin()]
        elif self.request.method == "PUT":
            return [IsAdminOrSelf()]
        elif self.request.method == "DELETE":
            return [IsAdminOrSelf()]
        return super().get_permissions()


class UserByRoleView(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAdmin]

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.user_service = UserService(UserRepository())

    def get_queryset(self):
        role = self.kwargs["role"]
        return self.user_service.get_by_role(role)
