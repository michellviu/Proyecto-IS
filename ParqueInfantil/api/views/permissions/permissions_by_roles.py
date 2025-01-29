from rest_framework.permissions import BasePermission
from rest_framework_simplejwt.authentication import JWTAuthentication


class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        user = JWTAuthentication().authenticate(request)
        if user is not None:
            user = user[0]
            return user.rol == "admin" and user.role_confirmation
        return False


class IsPadre(BasePermission):
    def has_permission(self, request, view):
        user = JWTAuthentication().authenticate(request)
        if user is not None:
            user = user[0]
            return user.rol == "padre" and user.role_confirmation
        return False


class IsEducador(BasePermission):
    def has_permission(self, request, view):
        user = JWTAuthentication().authenticate(request)
        if user is not None:
            user = user[0]
            return user.rol == "educador" and user.role_confirmation
        return False


class IsAdminOrSelf(BasePermission):
    def has_permission(self, request, view):
        user = JWTAuthentication().authenticate(request)
        if user is not None:
            user = user[0]
            return True
        return False

    def has_object_permission(self, request, view, obj):
        user_auth_tuple = JWTAuthentication().authenticate(request)
        if user_auth_tuple is not None:
            user = user_auth_tuple[0]
            # Permitir acceso si el usuario es administrador o es el propio usuario
            return user.rol == "admin" or obj == user
        return False


class MySelf(BasePermission):
    def has_object_permission(self, request, view, obj):
        user = JWTAuthentication().authenticate(request)
        if user is not None:
            user = user[0]
            return obj == user
        return False
