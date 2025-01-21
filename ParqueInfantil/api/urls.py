from django.urls import path, include, re_path
from api import views
from .views.swagger_doc import schema_view
from .views.metadata import metadata_view
from .views.registerView import RegistroView
from .views.loginView import LoginView
from .views.installationView import InstalacionView, InstalacionDetailView
from .views.activityView import ActividadView, ActividadDetailView
from .views.resourceView import RecursoView, RecursoDetailView
from .views.userView import UserByRoleView, UserView,UserDetailView,UnconfirmedUsersView
from .views.confirmRoleView import ConfirmRoleView
from .views.attributesView import AttributesView
from .views.sheduledActView import ScheduledActView, ScheduledActDetailView,ScheduledActRealTimeView
from .views.views import (
   
    ReservacionView,
    CalificacionView,
)

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
    path("api/metadata/", metadata_view, name="metadata"),
    path('api/atributes/<str:table_name>/', AttributesView.as_view()),
    # Models
    path('api/register/', RegistroView.as_view()),
    path('api/login/', LoginView.as_view()),

    path("api/instalacion/", InstalacionView.as_view()),
    path("api/instalacion/<int:pk>/", InstalacionDetailView.as_view()),

    path("api/actividad/", ActividadView.as_view()),
    path("api/actividad/<int:pk>/", ActividadDetailView.as_view()),
    
    path("api/actividadprogramada/", ScheduledActView.as_view()),
    path("api/actividadprogramada/<int:pk>/", ScheduledActDetailView.as_view()),
    path("api/actividadprogramada/tiemporeal/", ScheduledActRealTimeView.as_view()),

    path("api/recurso/", RecursoView.as_view()),
    path("api/recurso/<int:pk>/", RecursoDetailView.as_view()),

    path("api/usuario/", UserView.as_view()),
    path('api/usuario/noconfirmado/', UnconfirmedUsersView.as_view()),
    path('api/usuario/<int:pk>/', UserDetailView.as_view()),
    path("api/usuario/<str:role>/", UserByRoleView.as_view()),
    path('api/usuario/confirmarrol/<int:idU>/', ConfirmRoleView.as_view()),

    
    path("reservacion", ReservacionView.as_view()),
    path("calificacion", CalificacionView.as_view()),
]
