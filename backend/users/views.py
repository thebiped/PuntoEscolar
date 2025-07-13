from rest_framework_simplejwt.tokens import RefreshToken
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate
from django.http import JsonResponse
from .models import CustomUser
import json

@csrf_exempt
def api_register(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            nombre = data.get("nombre")
            apellido = data.get("apellido")
            correo = data.get("correo")
            password = data.get("password")
            tipo = data.get("tipo", "cliente")

            if not nombre or not correo or not password:
                return JsonResponse({"detail": "Faltan campos obligatorios"}, status=400)

            if CustomUser.objects.filter(email=correo).exists():
                return JsonResponse({"detail": "El correo ya está registrado"}, status=400)

            user = CustomUser.objects.create(
                username=correo,
                first_name=nombre,
                last_name=apellido,
                email=correo,
                role=tipo,
                password=make_password(password),
            )
            return JsonResponse({"success": True}, status=201)
        except Exception as e:
            return JsonResponse({"detail": str(e)}, status=500)
    return JsonResponse({"detail": "Método no permitido"}, status=405)

@csrf_exempt
def api_login(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            correo = data.get('email')
            password = data.get('password')

            user = authenticate(request, username=correo, password=password)
            if user is None:
                return JsonResponse({'detail': 'Credenciales inválidas'}, status=401)

            refresh = RefreshToken.for_user(user)
            return JsonResponse({
                'access': str(refresh.access_token),
                'refresh': str(refresh),
                'user': {
                    'id': user.id,
                    'nombre': user.first_name,
                    'apellido': user.last_name,
                    'email': user.email,
                    'tipo': user.role,
                }
            })
        except Exception as e:
            return JsonResponse({'detail': str(e)}, status=500)
    return JsonResponse({'detail': 'Método no permitido'}, status=405)
