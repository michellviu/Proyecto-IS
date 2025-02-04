from django.http import Http404
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import status
from api.serializers.UserSerializer import UserSerializer
from api.AppServices.UserService import UserService
from api.InfrastructurePersistence.UserRepository import UserRepository
from .permissions.permissions_by_roles import IsAdmin, IsAdminOrSelf
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.permissions import AllowAny


class UserView(generics.ListCreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAdmin]

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.user_service = UserService(UserRepository())

    def get_queryset(self):
        return self.user_service.get_all()
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
           self.user_service.create(serializer.validated_data)
           return Response(serializer.data, status=status.HTTP_201_CREATED)
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


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


    def retrieve(self, request, *args, **kwargs):
        try:
            user = self.user_service.get_by_id(self.kwargs["pk"])
            serializer = self.get_serializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ObjectDoesNotExist as e:
            return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)

    def update(self, request, *args, **kwargs):
        try:
            user = self.user_service.get_by_id(self.kwargs["pk"])
            self.check_object_permissions(request, user)
            serializer = self.get_serializer(user, data=request.data)
            serializer.is_valid(raise_exception=True)
            self.user_service.update(user.idU, serializer.validated_data)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except ObjectDoesNotExist as e:
            return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)

    def destroy(self, request, *args, **kwargs):
        try:
           user = self.user_service.get_by_id(self.kwargs["pk"])
           self.check_object_permissions(request, user)
           self.user_service.delete(user.idU)
           return Response(status=status.HTTP_204_NO_CONTENT)
        except ObjectDoesNotExist as e:
            return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)

    def get_permissions(self):
        if self.request.method == "GET":
            return [IsAdminOrSelf()]
        elif self.request.method == "PUT":
            return [IsAdminOrSelf()]
        elif self.request.method == "DELETE":
            return [IsAdminOrSelf()]
        return super().get_permissions()


class UserDetailPersonalView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.user_service = UserService(UserRepository())

    def retrieve(self, request, *args, **kwargs):
        try:
            user = self.request.user
            usuario = self.user_service.get_by_id(user.idU)
            serializer = self.get_serializer(usuario)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ObjectDoesNotExist as e:
            return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)

    def update(self, request, *args, **kwargs):
        try:
            usuario = self.request.user
            user = self.user_service.get_by_id(usuario.idU)
            serializer = self.get_serializer(user, data=request.data)
            serializer.is_valid(raise_exception=True)
            self.user_service.update(user.idU, serializer.validated_data)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except ObjectDoesNotExist as e:
            return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)

    def destroy(self, request, *args, **kwargs):
        try:
           usuario = self.request.user
           user = self.user_service.get_by_id(usuario.idU)
           self.user_service.delete(user.idU)
           return Response(status=status.HTTP_204_NO_CONTENT)
        except ObjectDoesNotExist as e:
            return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)




class UserByRoleView(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAdmin]

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.user_service = UserService(UserRepository())

    def get_queryset(self):
        role = self.kwargs["role"]
        return self.user_service.get_by_role(role)
