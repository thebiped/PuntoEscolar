from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Administrador'),
        ('cliente', 'Cliente'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='cliente')
