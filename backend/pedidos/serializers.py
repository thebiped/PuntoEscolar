from rest_framework import serializers
from .models import Carrito, CarritoItem, Pedido, PedidoItem
from productos.serializers import ProductoSerializer

class CarritoItemSerializer(serializers.ModelSerializer):
    producto = ProductoSerializer(source='id_Producto', read_only=True)
    
    class Meta:
        model = CarritoItem
        fields = ['id_Carrito_Items', 'id_Carrito', 'id_Producto', 'producto', 'cantidad']
        extra_kwargs = {
            'id_Producto': {'write_only': True}
        }

class CarritoSerializer(serializers.ModelSerializer):
    items = CarritoItemSerializer(many=True, read_only=True)
    
    class Meta:
        model = Carrito
        fields = ['id_Carrito', 'id_Usuario', 'creado_en', 'estado', 'items']

class PedidoItemSerializer(serializers.ModelSerializer):
    producto = ProductoSerializer(source='id_Producto', read_only=True)
    
    class Meta:
        model = PedidoItem
        fields = ['id_Pedido_Items', 'id_Pedido', 'id_Producto', 'producto', 'id_Usuario', 'cantidad', 'precio_unitario']
        extra_kwargs = {
            'id_Producto': {'write_only': True}
        }

class PedidoSerializer(serializers.ModelSerializer):
    items = PedidoItemSerializer(many=True, read_only=True)
    
    class Meta:
        model = Pedido
        fields = ['id_Pedido', 'id_Usuario', 'fecha_pedido', 'total', 'metodo_entrega', 'estado', 'direccion_entrega', 'items']