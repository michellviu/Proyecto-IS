from django.urls import path
from ParqueInfantilApp import views

urlpatterns = [
    path('',views.home,name='Home')
]