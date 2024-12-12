from django.urls import path ,include
from api import views
from .views import InstalacionView,ActividadView,RecursoView,UsuarioView,PadreView,EducadorView,AdministradorView,Actividad_programadaView,ReservacionView,CalificacionView

# router = routers.DefaultRouter()
# router.register(r'instalacion', views.InstalacionView, 'instalacion')
urlpatterns = [
 path('', views.home, name='home'),
 path('instalacion', InstalacionView.as_view()),
 path('actividad', ActividadView.as_view()),
 path('recurso', RecursoView.as_view()),
 path('usuario', UsuarioView.as_view()),
 path('padre', PadreView.as_view()),
 path('educador', EducadorView.as_view()),
 path('administrador', AdministradorView.as_view()),
 path('actividad_programada', Actividad_programadaView.as_view()),
 path('reservacion', ReservacionView.as_view()),
 path('calificacion', CalificacionView.as_view()),
 path('instalacionList/', views.InstalacionList.as_view()),
 # path('instalacion', include(router.urls))
]