from django.urls import path
from .views import home,InstalacionView

urlpatterns = [
 path('', home, name='home'),
 path('instalacion',InstalacionView.as_view())
]