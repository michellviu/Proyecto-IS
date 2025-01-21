from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions

schema_view = get_schema_view(
    openapi.Info(
        title="API de Mi Proyecto",
        default_version="v1",
        description="Documentación de la API de mi proyecto Django",
        terms_of_service="https://www.miweb.com/terms/",
        contact=openapi.Contact(email="soporte@miweb.com"),
        license=openapi.License(name="Licencia BSD"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)
