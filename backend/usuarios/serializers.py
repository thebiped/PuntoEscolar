from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import Usuario

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id_Usuario', 'nombre', 'apellido', 'correo', 'tipo', 'calle', 'altura', 'telefono', 'fecha_registro']

class RegistroSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    password2 = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    
    class Meta:
        model = Usuario
        fields = ['nombre', 'apellido', 'correo', 'password', 'password2', 'tipo', 'calle', 'altura', 'telefono']
    
    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError({"password": "Las contraseñas no coinciden"})
        return data
    
    def create(self, validated_data):
        validated_data.pop('password2')
        user = Usuario.objects.create_user(
            correo=validated_data['correo'],
            nombre=validated_data['nombre'],
            apellido=validated_data['apellido'],
            password=validated_data['password'],
            tipo=validated_data.get('tipo', 'cliente'),
            calle=validated_data.get('calle'),
            altura=validated_data.get('altura'),
            telefono=validated_data.get('telefono')
        )
        return user

class LoginSerializer(serializers.Serializer):
    correo = serializers.EmailField(required=True)
    password = serializers.CharField(required=True, write_only=True)
    
    def validate(self, data):
        user = authenticate(username=data['correo'], password=data['password'])
        if not user or not user.is_active:
            raise serializers.ValidationError("Credenciales incorrectas o usuario inactivo")
        data['user'] = user
        return data