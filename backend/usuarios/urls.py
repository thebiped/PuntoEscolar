from django.urls import path
from .views import RegistroView, LoginView, LogoutView, PerfilUsuarioView

urlpatterns = [
    path('registro/', RegistroView.as_view(), name='registro'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('perfil/', PerfilUsuarioView.as_view(), name='perfil'),
]