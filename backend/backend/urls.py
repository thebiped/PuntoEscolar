from django.contrib import admin
from django.urls import path, include
from users.views import api_register, api_login

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/register/', api_register),
    path('api/login/', api_login),
    path('api/', include('productos.urls')), 
]
