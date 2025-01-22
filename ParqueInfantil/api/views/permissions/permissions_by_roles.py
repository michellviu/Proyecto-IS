from rest_framework.permissions import BasePermission

class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.rol == 'admin' and request.user.role_confirmation

class IsPadre(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.rol == 'padre' and request.user.role_confirmation

class IsEducador(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.rol == 'educador' and request.user.role_confirmation
    
class IsAdminOrSelf(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        # Permitir acceso si el usuario es administrador o es el propio usuario
        return request.user.rol == 'admin' or obj == request.user