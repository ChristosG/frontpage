from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    USER_TYPE_CHOICES = (
        ('researcher', 'Researcher'),
        ('investor', 'Investor'),
        ('institution_staff', 'Institution Staff'),
        ('service_provider', 'Service Provider'),
    )
    user_type = models.CharField(max_length=20, choices=USER_TYPE_CHOICES)
    country = models.CharField(max_length=100)

    def __str__(self):
        return self.username
