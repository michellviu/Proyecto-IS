from rest_framework import generics, status
from rest_framework.response import Response
from ..serializers.RegisterSerializer import RegistroSerializer
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from api.AppServices.UserService import UserService
from api.AppServices.FatherService import FatherService
from api.InfrastructurePersistence.UserRepository import UserRepository
from api.InfrastructurePersistence.FatherRepository import FatherRepository
from api.models.usuario import Usuario
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.exceptions import ValidationError
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi



class RegistroView(generics.CreateAPIView):
    permission_classes = [AllowAny]  # Permitir acceso sin autenticación
    serializer_class = RegistroSerializer

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.user_service = UserService(UserRepository())

        self.father_service = FatherService(FatherRepository())
    

    @swagger_auto_schema(
        operation_description="Registrar un nuevo usuario",
        request_body=RegistroSerializer,
        responses={
            201: openapi.Response(
                description="Usuario creado exitosamente",
                examples={
                    "application/json": {
                        "user": {
                            "username": "string",
                            "email": "string",
                            "rol": "string",
                        },
                        "token": "string",
                        "message": "Usuario creado exitosamente.",
                    }
                },
            ),
            400: openapi.Response(
                description="Error en la solicitud",
                examples={"application/json": {"error": "Invalid data"}},
            ),
        },
    )

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user_data = serializer.validated_data

        # Crear el usuario sin guardar aún
        user = Usuario(
            username=user_data['username'],
            email=user_data['email'],
            rol=user_data['rol'],
            password=user_data['password']
        )

         # Check if username or email already exists
        if Usuario.objects.filter(username=user.username).exists():
            return Response({'error': 'Username already exists.'}, status=400)
        if Usuario.objects.filter(email=user.email).exists():
            return Response({'error': 'Email already exists.'}, status=400)

        # Confirmar el rol si es 'Padre'
        if user.rol == "padre":
            user.role_confirmation = True

         # Validate the user instance
        try:
            user.full_clean()
        except ValidationError as e:
            return Response({'error': e.message_dict}, status=400)
        # Establecer la contraseña y guardar el usuario

        user.set_password(user_data['password'])
        
        refresh = RefreshToken.for_user(user)
         # Guardar en la tabla Padre si el rol es 'Padre'
        user.save()
        if user.rol == 'padre':
            self.father_service.create({'idP': user})
        
       
        return Response({
            "user": RegistroSerializer(user).data,
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            "message": "Usuario creado exitosamente."
        }, status=status.HTTP_201_CREATED)

