from django.shortcuts import render
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from users.models import CustomUser
from .models import Producto
from .models import Categoria
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Categoria
from .serializers import CategoriaSerializer

class CategoriaListView(APIView):
    def get(self, request):
        categorias = Categoria.objects.all()
        serializer = CategoriaSerializer(categorias, many=True)
        return Response(serializer.data)

def es_admin(user):
    return user.is_authenticated and user.role == 'admin'

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def listar_productos(request):
    try:
        productos = Producto.objects.select_related('categoria').all()
        data = [
            {
                "id": p.id,
                "nombre": p.nombre,
                "descripcion": p.descripcion,
                "precio": str(p.precio),
                "stock": p.stock,
                "imagen": p.imagen,
                "categoria": p.categoria.nombre if p.categoria else None,
            }
            for p in productos
        ]
        return JsonResponse(data, safe=False)
    except Exception as e:
        print("ERROR:", str(e))
        return JsonResponse({"detail": "Error interno del servidor"}, status=500)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def crear_producto(request):
    if request.user.role != "admin":
        return JsonResponse({"detail": "No autorizado"}, status=403)

    try:
        data = request.data
        producto = Producto.objects.create(
            nombre=data["nombre"],
            descripcion=data["descripcion"],
            precio=data["precio"],
            stock=data["stock"],
            imagen=data.get("imagen", "")
        )
        return JsonResponse({"success": True, "id": producto.id}, status=201)
    except Exception as e:
        print("ERROR:", str(e))
        return JsonResponse({"detail": str(e)}, status=500)

@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def editar_producto(request, id):
    if request.user.role != "admin":
        return JsonResponse({"detail": "No autorizado"}, status=403)

    try:
        producto = Producto.objects.get(id=id)
        data = request.data
        producto.nombre = data["nombre"]
        producto.descripcion = data["descripcion"]
        producto.precio = data["precio"]
        producto.stock = data["stock"]
        producto.imagen = data.get("imagen", "")
        producto.save()
        return JsonResponse({"success": True})
    except Producto.DoesNotExist:
        return JsonResponse({"detail": "Producto no encontrado"}, status=404)

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def eliminar_producto(request, id):
    if request.user.role != "admin":
        return JsonResponse({"detail": "No autorizado"}, status=403)

    try:
        producto = Producto.objects.get(id=id)
        producto.delete()
        return JsonResponse({"success": True})
    except Producto.DoesNotExist:
        return JsonResponse({"detail": "Producto no encontrado"}, status=404)
