# Generated by Django 5.1.7 on 2025-07-11 00:43

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('pedidos', '0001_initial'),
        ('productos', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='carrito',
            name='id_Usuario',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='carritos', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='carritoitem',
            name='id_Carrito',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='items', to='pedidos.carrito'),
        ),
        migrations.AddField(
            model_name='carritoitem',
            name='id_Producto',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='productos.producto'),
        ),
        migrations.AddField(
            model_name='pedido',
            name='id_Usuario',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='pedidos', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='pedidoitem',
            name='id_Pedido',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='items', to='pedidos.pedido'),
        ),
        migrations.AddField(
            model_name='pedidoitem',
            name='id_Producto',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='productos.producto'),
        ),
        migrations.AddField(
            model_name='pedidoitem',
            name='id_Usuario',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
