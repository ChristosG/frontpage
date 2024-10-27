from rest_framework import serializers
# from django.contrib.auth.models import User
from .models import User

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    user_type = serializers.ChoiceField(choices=User.USER_TYPE_CHOICES)

    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email', 'first_name', 'last_name', 'user_type', 'country')

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user