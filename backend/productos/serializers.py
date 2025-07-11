from rest_framework import serializers
from .models import Producto, LogsStock

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = ['id_Producto', 'nombre', 'precio', 'descripcion', 'stock', 'imagen', 'disponible']

class LogsStockSerializer(serializers.ModelSerializer):
    class Meta:
        model = LogsStock
        fields = ['id_Log', 'id_Producto', 'id_Admin', 'cambio', 'fecha']