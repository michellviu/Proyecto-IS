from django.urls import path, include, re_path
from api import views
from .views.swagger_doc import schema_view
from .views.metadata import metadata_view
from .views.registerView import RegistroView
from .views.loginView import LoginView
from .views.installationView import InstalacionView, InstalacionDetailView
from .views.activityView import ActividadView, ActividadDetailView
from .views.resourceView import RecursoView, RecursoDetailView
from .views.userView import (
    UserByRoleView,
    UserView,
    UserDetailView,
    UnconfirmedUsersView,
)
from .views.confirmRoleView import ConfirmRoleView
from .views.attributesView import AttributesView
from .views.sheduledActView import (
    ScheduledActView,
    ScheduledActDetailView,
    ScheduledActRealTimeView,
    ScheduledActCatalogView,
    ScheduledActRealizView,
    ScheduledActFuturaView,
)
from .views.views import (
    ReservacionView,
    CalificacionView,
)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views.CustomTokenObtainPairView import CustomTokenObtainPairView

# router = routers.DefaultRouter()
# router.register(r'instalacion', views.InstalacionView, 'instalacion')
urlpatterns = [
    # Home page
    path("", views.views.home, name="home"),
    # API documentation
    path(
        "swagger/",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    path("redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),
    re_path(
        r"^swagger(?P<format>\.json|\.yaml)$",
        schema_view.without_ui(cache_timeout=0),
        name="schema-json",
    ),
    # Metadata
    path("metadata/", metadata_view, name="metadata"),
    path("atributes/<str:table_name>/", AttributesView.as_view()),
    # Models
   
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("register/", RegistroView.as_view()),
    path("login/", LoginView.as_view()),
    path("instalacion/", InstalacionView.as_view()),
    path("instalacion/<int:pk>/", InstalacionDetailView.as_view()),
    path("actividad/", ActividadView.as_view()),
    path("actividad/<int:pk>/", ActividadDetailView.as_view()),
    path("actividadprogramada/", ScheduledActView.as_view()),
    path("actividadprogramada/realizada/", ScheduledActRealizView.as_view()),
    path("actividadprogramada/futura/", ScheduledActFuturaView.as_view()),
    path("actividadprogramada/catalog/", ScheduledActCatalogView.as_view()),
    path("actividadprogramada/<int:pk>/", ScheduledActDetailView.as_view()),
    path("actividadprogramada/tiemporeal/", ScheduledActRealTimeView.as_view()),
    path("recurso/", RecursoView.as_view()),
    path("recurso/<int:pk>/", RecursoDetailView.as_view()),
    path("usuario/", UserView.as_view()),
    path("usuario/noconfirmado/", UnconfirmedUsersView.as_view()),
    path("usuario/<int:pk>/", UserDetailView.as_view()),
    path("usuario/<str:role>/", UserByRoleView.as_view()),
    path("usuario/confirmarrol/<int:idU>/", ConfirmRoleView.as_view()),
    path("reservacion", ReservacionView.as_view()),
    path("calificacion", CalificacionView.as_view()),
]
