from django.urls import path
from .views import (
    listar_productos,
    crear_producto,
    editar_producto,
    eliminar_producto,
    CategoriaListView
)

urlpatterns = [
    path("productos/", listar_productos, name="listar_productos"),
    path("productos/crear/", crear_producto, name="crear_producto"),
    path("productos/<int:id>/editar/", editar_producto, name="editar_producto"),
    path("productos/<int:id>/eliminar/", eliminar_producto, name="eliminar_producto"),
    path("productos/categorias/", CategoriaListView.as_view(), name="listar_categorias"),
]
