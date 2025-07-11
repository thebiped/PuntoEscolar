from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils import timezone

class UsuarioManager(BaseUserManager):
    def create_user(self, correo, nombre, apellido, password=None, **extra_fields):
        if not correo:
            raise ValueError('El correo electrónico es obligatorio')
        
        correo = self.normalize_email(correo)
        user = self.model(correo=correo, nombre=nombre, apellido=apellido, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, correo, nombre, apellido, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('tipo', 'admin')
        
        return self.create_user(correo, nombre, apellido, password, **extra_fields)

class Usuario(AbstractBaseUser, PermissionsMixin):
    id_Usuario = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    correo = models.EmailField(unique=True)
    tipo = models.CharField(max_length=20, default='cliente')
    calle = models.CharField(max_length=100, blank=True, null=True)
    altura = models.IntegerField(blank=True, null=True)
    telefono = models.IntegerField(blank=True, null=True)
    fecha_registro = models.DateTimeField(default=timezone.now)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    
    objects = UsuarioManager()
    
    USERNAME_FIELD = 'correo'
    REQUIRED_FIELDS = ['nombre', 'apellido']
    
    def __str__(self):
        return f"{self.nombre} {self.apellido}"