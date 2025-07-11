from django.db import models

class Producto(models.Model):
    id_Producto = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    precio = models.FloatField()
    descripcion = models.TextField()
    stock = models.IntegerField(default=0)
    imagen = models.TextField(blank=True, null=True)  # URL de la imagen
    disponible = models.BooleanField(default=True)
    
    def __str__(self):
        return self.nombre

class LogsStock(models.Model):
    id_Log = models.AutoField(primary_key=True)
    id_Producto = models.ForeignKey(Producto, on_delete=models.CASCADE, related_name='logs')
    id_Admin = models.ForeignKey('usuarios.Usuario', on_delete=models.SET_NULL, null=True, related_name='logs_stock')
    cambio = models.IntegerField()
    fecha = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Log {self.id_Log} - Producto {self.id_Producto.nombre}"