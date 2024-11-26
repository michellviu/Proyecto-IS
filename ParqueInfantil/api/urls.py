from django.urls import path ,include
from api import views
from .views import InstalacionView

# router = routers.DefaultRouter()
# router.register(r'instalacion', views.InstalacionView, 'instalacion')
urlpatterns = [
 path('', views.home, name='home'),
 path('instalacion', InstalacionView.as_view())
 # path('instalacion', include(router.urls))
]