from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Carrito, CarritoItem, Pedido, PedidoItem
from .serializers import CarritoSerializer, CarritoItemSerializer, PedidoSerializer, PedidoItemSerializer
from productos.models import Producto

class CarritoViewSet(viewsets.ModelViewSet):
    serializer_class = CarritoSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Carrito.objects.filter(id_Usuario=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(id_Usuario=self.request.user)
    
    @action(detail=True, methods=['post'])
    def agregar_item(self, request, pk=None):
        carrito = self.get_object()
        producto_id = request.data.get('id_Producto')
        cantidad = int(request.data.get('cantidad', 1))
        
        try:
            producto = Producto.objects.get(id_Producto=producto_id)
            
            # Verificar si el producto ya está en el carrito
            item_existente = CarritoItem.objects.filter(id_Carrito=carrito, id_Producto=producto).first()
            
            if item_existente:
                item_existente.cantidad += cantidad
                item_existente.save()
                serializer = CarritoItemSerializer(item_existente)
            else:
                item_nuevo = CarritoItem.objects.create(
                    id_Carrito=carrito,
                    id_Producto=producto,
                    cantidad=cantidad
                )
                serializer = CarritoItemSerializer(item_nuevo)
                
            return Response(serializer.data)
        except Producto.DoesNotExist:
            return Response({'error': 'Producto no encontrado'}, status=status.HTTP_404_NOT_FOUND)

class CarritoItemViewSet(viewsets.ModelViewSet):
    serializer_class = CarritoItemSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return CarritoItem.objects.filter(id_Carrito__id_Usuario=self.request.user)

class PedidoViewSet(viewsets.ModelViewSet):
    serializer_class = PedidoSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Pedido.objects.filter(id_Usuario=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(id_Usuario=self.request.user)

class PedidoItemViewSet(viewsets.ModelViewSet):
    serializer_class = PedidoItemSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return PedidoItem.objects.filter(id_Pedido__id_Usuario=self.request.user)