from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from ..serializers.RegisterSerializer import RegistroSerializer
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from api.AppServices.UserService import UserService
from api.InfrastructurePersistence.UserRepository import UserRepository
from api.InfrastructurePersistence.FatherRepository import FatherRepository
from api.models.usuario import Usuario


class RegistroView(generics.ListCreateAPIView):
    permission_classes = [AllowAny]  # Permitir acceso sin autenticación
    serializer_class = RegistroSerializer
   
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.user_service = UserService(UserRepository())
       

    def get_queryset(self):
        return self.user_service.get_all()
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user_data = serializer.validated_data

        # Crear el usuario sin guardar aún
        user = Usuario(
            username=user_data['username'],
            email=user_data['email'],
            rol=user_data['rol']
        )

        # Confirmar el rol si es 'Padre'
        if user.rol == 'padre':
            user.role_confirmation = True

        # Establecer la contraseña y guardar el usuario
        user.set_password(user_data['password'])
        user.save()
         # Guardar en la tabla Padre si el rol es 'Padre'
        if user.rol == 'padre':
            self.father_service.create({'idP': user})
        
        token, created = Token.objects.get_or_create(user=user)
        
        return Response({
            "user": RegistroSerializer(user).data,
            "token": token.key,
            "message": "Usuario creado exitosamente."
        }, status=status.HTTP_201_CREATED)