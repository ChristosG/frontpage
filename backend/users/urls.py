from django.urls import path
from .views import UserCreateView, LoginView, LogoutView, CheckAuthView, get_csrf_token

urlpatterns = [
    path('register/', UserCreateView.as_view(), name='user_register'),
    path('login/', LoginView.as_view(), name='user_login'),
    path('logout/', LogoutView.as_view(), name='user_logout'),
    path('check-auth/', CheckAuthView.as_view(), name='check_auth'),
    path('get-csrf-token/', get_csrf_token, name='get_csrf_token'),
]
