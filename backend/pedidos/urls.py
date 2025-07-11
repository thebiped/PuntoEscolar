from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

# Vista simple para la ruta raíz
def index(request):
    return HttpResponse("API de Punto Escolar. Accede a /api/productos/, /api/pedidos/ o /api/usuarios/ para usar la API.")

urlpatterns = [
    path('', index, name='index'),  # Ruta raíz
    path('admin/', admin.site.urls),
    path('api/usuarios/', include('usuarios.urls')),
    path('api/productos/', include('productos.urls')),
    path('api/pedidos/', include('pedidos.urls')),
]