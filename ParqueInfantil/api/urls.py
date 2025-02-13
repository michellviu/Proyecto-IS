from django.urls import path, include, re_path
from api.views.views import home
from .views.swagger_doc import schema_view
from .views.metadata import MetadataView
from .views.registerView import RegistroView
from .views.SearchView import SearchView
from .views.orderbyProperty import OrderByPropertyView
from .views.loginView import LoginView
from .views.installationView import(
    InstalacionView,
    InstalacionDetailView,
    InstalacionNumActividadesView

) 
from .views.statsView import (
    StatsCalificacionesTotalesView,
    StatsReservacionesAceptadasView,
    StatsReservacionesDenegadasView,
    StatsReservacionesTotalesView,
    StatsActividadesCalificacionesAvgView,
    StatsActividadesMasParticipadasView,
    StatsUsoDeRecursosView
)
from .views.activityView import (
    ActividadView,
    ActividadDetailView,
    ActividadCalificacionesView,
    ActividadParticipantesView,
)
from .views.resourceView import RecursoView, RecursoDetailView, ResourceInUseView, ResourceAvailableView
from .views.userView import (
    UserByRoleView,
    UserView,
    UserDetailView,
    UnconfirmedUsersView,
    UserDetailPersonalView,
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
    ScheduledActParticipantsView,
    ScheduledActForEducadorView,
)
from .views.reservationView import (
    ReservacionView,
    ReservacionDetailView,
    ReservacionesPorPadreView,
    UnconfirmedReservationsView,
)
from .views.qualificationView import (
    QualificationView,
    QualificationDetailView,
    QualificationByActivityView,
    QualificationByUserView
)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views.CustomTokenObtainPairView import CustomTokenObtainPairView
from .views.testsview import TestGraficarCalificacionesView
from .views.ReportView import ReportView

# router = routers.DefaultRouter()
# router.register(r'instalacion', views.InstalacionView, 'instalacion')
urlpatterns = [
    # Home page
    path("", home, name="home"),
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
    path("metadata/", MetadataView.as_view()),
    path("atributes/<str:table_name>/", AttributesView.as_view()),
    # Models
    # Login
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("register/", RegistroView.as_view()),
    path("login/", LoginView.as_view()),
    # Instalacion
    path("instalacion/", InstalacionView.as_view()),
    path("instalacion/numactividades/", InstalacionNumActividadesView.as_view()),
    path("instalacion/<int:pk>/", InstalacionDetailView.as_view()),
    # Actividad
    path("actividad/", ActividadView.as_view()),
    path("actividad/<int:pk>/", ActividadDetailView.as_view()),
    path("actividad/calificaciones/", ActividadCalificacionesView.as_view()),
    path("actividad/participantes/", ActividadParticipantesView.as_view()),
    # Actividad programada
    path("actividad_programada/", ScheduledActView.as_view()),
    path("actividad_programada/realizada/", ScheduledActRealizView.as_view()),
    path("actividad_programada/futura/", ScheduledActFuturaView.as_view()),
    path("actividad_programada/catalog/", ScheduledActCatalogView.as_view()),
    path("actividad_programada/<int:pk>/", ScheduledActDetailView.as_view()),
    path("actividad_programada/tiemporeal/", ScheduledActRealTimeView.as_view()),
    path("actividad_programada/numparticipantes/", ScheduledActParticipantsView.as_view()),
    path("actividad_programada/poreducador/", ScheduledActForEducadorView.as_view()),

    # Recurso
    path("recurso/", RecursoView.as_view()),
    path("recurso/enuso/", ResourceInUseView.as_view()),
    path("recurso/disponibles/", ResourceAvailableView.as_view()),
    path("recurso/<int:pk>/", RecursoDetailView.as_view()),
    # Usuario
    path("usuario/", UserView.as_view()),
    path("usuario/perfil/", UserDetailPersonalView.as_view()),
    path("usuario/noconfirmado/", UnconfirmedUsersView.as_view()),
    path("usuario/<int:pk>/", UserDetailView.as_view()),
    path("usuario/<str:role>/", UserByRoleView.as_view()),
    path("usuario/confirmarrol/<int:idU>/", ConfirmRoleView.as_view()),
    # Reservacion
    path("reservacion/", ReservacionView.as_view()),
    path("reservacion/noconfirmado/", UnconfirmedReservationsView.as_view()),
    path("reservacion/porpadre/", ReservacionesPorPadreView.as_view()),
    path("reservacion/<str:pk>/", ReservacionDetailView.as_view()),
    # Calificacion
    path("calificacion/", QualificationView.as_view()),
    path("calificacion/<int:pk>/", QualificationDetailView.as_view()),
    path("calificacion/poractividad/<int:pk>/", QualificationByActivityView.as_view()),
    path("calificacion/porusuario/", QualificationByUserView.as_view()),
    # Search
    path("search/", SearchView.as_view()),
    path("orderbyproperty/", OrderByPropertyView.as_view()),
    # Tests
    path("test/", TestGraficarCalificacionesView.as_view()),
    path("pdf/", ReportView.as_view()),
    # Estadísticas
    path("stats/calificaciones/", StatsCalificacionesTotalesView.as_view()),
    path("stats/reservaciones_aceptadas/", StatsReservacionesAceptadasView.as_view()),
    path("stats/reservaciones_denegadas/", StatsReservacionesDenegadasView.as_view()),
    path("stats/reservaciones_totales/", StatsReservacionesTotalesView.as_view()),
    path("stats/actividades_calificacionesavg/", StatsActividadesCalificacionesAvgView.as_view()),
    path("stats/actividades_participantes/", StatsActividadesMasParticipadasView.as_view()),
    path("stats/uso_recursos/",StatsUsoDeRecursosView.as_view())
]
