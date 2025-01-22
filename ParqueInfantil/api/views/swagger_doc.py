from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions

schema_view = get_schema_view(
    openapi.Info(
        title="API de PLAYHUB",
        default_version="v1",
        # description="Documentación de la API de mi proyecto Django",
        description="""Esta es la documentación de la API en Django del proyecto Parque Infantil PLAYHUB. 
        Esta API permite gestionar un parque infantil, incluyendo la administración de usuarios, 
        reservas de áreas de juego, eventos y más. Proporciona endpoints para crear, leer, 
        actualizar y eliminar recursos relacionados con el parque infantil. Además, incluye 
        autenticación y autorización para asegurar que solo los usuarios autorizados puedan 
        realizar ciertas acciones. La API está diseñada para ser fácil de usar y seguir 
        las mejores prácticas de REST.""",
        terms_of_service="https://www.playhub.com/terms/",
        contact=openapi.Contact(email="soporte@playhub.com"),
        license=openapi.License(name="Licencia BSD"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)
