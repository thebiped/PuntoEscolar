from django.db import models
from usuarios.models import Usuario
from productos.models import Producto

class Carrito(models.Model):
    ESTADO_CHOICES = (
        ('activo', 'Activo'),
        ('abandonado', 'Abandonado'),
        ('completado', 'Completado'),
    )
    
    id_Carrito = models.AutoField(primary_key=True)
    id_Usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='carritos')
    creado_en = models.DateTimeField(auto_now_add=True)
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='activo')
    
    def __str__(self):
        return f"Carrito {self.id_Carrito} - {self.id_Usuario.nombre}"

class CarritoItem(models.Model):
    id_Carrito_Items = models.AutoField(primary_key=True)
    id_Carrito = models.ForeignKey(Carrito, on_delete=models.CASCADE, related_name='items')
    id_Producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.IntegerField(default=1)
    
    def __str__(self):
        return f"Item {self.id_Carrito_Items} - Carrito {self.id_Carrito.id_Carrito}"

class Pedido(models.Model):
    ESTADO_CHOICES = (
        ('pendiente', 'Pendiente'),
        ('procesando', 'Procesando'),
        ('enviado', 'Enviado'),
        ('entregado', 'Entregado'),
        ('cancelado', 'Cancelado'),
    )
    
    METODO_ENTREGA_CHOICES = (
        ('domicilio', 'Entrega a domicilio'),
        ('tienda', 'Retiro en tienda'),
    )
    
    id_Pedido = models.AutoField(primary_key=True)
    id_Usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='pedidos')
    fecha_pedido = models.DateTimeField(auto_now_add=True)
    total = models.FloatField()
    metodo_entrega = models.CharField(max_length=20, choices=METODO_ENTREGA_CHOICES)
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='pendiente')
    direccion_entrega = models.CharField(max_length=200, blank=True, null=True)
    
    def __str__(self):
        return f"Pedido {self.id_Pedido} - {self.id_Usuario.nombre}"

class PedidoItem(models.Model):
    id_Pedido_Items = models.AutoField(primary_key=True)
    id_Pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE, related_name='items')
    id_Producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    id_Usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    cantidad = models.IntegerField()
    precio_unitario = models.FloatField()
    
    def __str__(self):
        return f"Item {self.id_Pedido_Items} - Pedido {self.id_Pedido.id_Pedido}"