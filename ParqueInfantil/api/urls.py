from django.urls import path, include
from api import views
from .views.metadata import metadata_view
from .views.views import (
    InstalacionView,
    InstalacionDetailView,
    ActividadView,
    ActividadDetailView,
    RecursoView,
    RecursoDetailView,
    UsuarioView,
    PadreView,
    EducadorView,
    AdministradorView,
    Actividad_programadaView,
    ReservacionView,
    CalificacionView,
)

# router = routers.DefaultRouter()
# router.register(r'instalacion', views.InstalacionView, 'instalacion')
urlpatterns = [
    # Home page
    path("", views.views.home, name="home"),
    # Metadata
    path("metadata", metadata_view, name="metadata"),
    # Models
    path("instalacion", InstalacionView.as_view()),
    path("instalacion/<int:pk>/", InstalacionDetailView.as_view()),
    path("actividad", ActividadView.as_view()),
    path("actividad/<int:pk>/", ActividadDetailView.as_view()),
    path("recurso", RecursoView.as_view()),
    path("recurso/<int:pk>/", RecursoDetailView.as_view()),
    path("usuario", UsuarioView.as_view()),
    path("padre", PadreView.as_view()),
    path("educador", EducadorView.as_view()),
    path("administrador", AdministradorView.as_view()),
    path("actividad_programada", Actividad_programadaView.as_view()),
    path("reservacion", ReservacionView.as_view()),
    path("calificacion", CalificacionView.as_view()),
]
