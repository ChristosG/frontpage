from django.contrib.auth import authenticate, login, logout
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .serializers import UserSerializer
from django.middleware.csrf import get_token
from rest_framework.decorators import api_view, permission_classes

class UserCreateView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        keep_logged_in = request.data.get('keep_logged_in', False)
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            if keep_logged_in:
                request.session.set_expiry(1209600) 
            else:
                request.session.set_expiry(1500) 
            return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    permission_classes = [permissions.AllowAny]  
    def post(self, request):
        logout(request)
        return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)

class CheckAuthView(APIView):
    permission_classes = [permissions.AllowAny]  
    def get(self, request):
        if request.user.is_authenticated:
            return Response({'isAuthenticated': True, 'user': UserSerializer(request.user).data}, status=status.HTTP_200_OK)
        else:
            return Response({'isAuthenticated': False}, status=status.HTTP_200_OK)
        
@api_view(['GET'])
@permission_classes([permissions.AllowAny]) 
def get_csrf_token(request):
    return Response({'csrfToken': get_token(request)})