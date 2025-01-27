from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from ..serializers.LoginSerializer import LoginSerializer
from rest_framework.permissions import AllowAny
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi


class LoginView(ObtainAuthToken):
    permission_classes = [AllowAny]  # Permitir acceso sin autenticación
    serializer_class = LoginSerializer

    @swagger_auto_schema(
        operation_description="Iniciar sesión y obtener un token de autenticación",
        request_body=LoginSerializer,
        responses={
            200: openapi.Response(
                description="Inicio de sesión exitoso",
                examples={
                    "application/json": {
                        "token": "string",
                        "user_id": "integer",
                        "email": "string",
                        "rol": "string",
                    }
                },
            ),
            400: openapi.Response(
                description="Credenciales inválidas",
                examples={"application/json": {"error": "Invalid Credentials"}},
            ),
        },
    )
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        user = authenticate(
            username=serializer.validated_data["username"],
            password=serializer.validated_data["password"],
        )
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response(
                {
                    "token": token.key,
                    "user_id": user.pk,
                    "email": user.email,
                    "rol": user.rol,
                }
            )
        return Response(
            {"error": "Invalid Credentials"}, status=status.HTTP_400_BAD_REQUEST
        )
