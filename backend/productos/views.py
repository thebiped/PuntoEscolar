from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .models import Producto, LogsStock
from .serializers import ProductoSerializer, LogsStockSerializer

class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    
    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAdminUser()]
        return [IsAuthenticated()]

class LogsStockViewSet(viewsets.ModelViewSet):
    queryset = LogsStock.objects.all()
    serializer_class = LogsStockSerializer
    permission_classes = [IsAdminUser]