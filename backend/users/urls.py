from users.views import api_register, api_login
from productos.views import listar_categorias
from django.urls import path

urlpatterns = [
    path("api/register/", api_register),
     path('api/login/', api_login),
     path('api/productos/categorias/', listar_categorias),
]
