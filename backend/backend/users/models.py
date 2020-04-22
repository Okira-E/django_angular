from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


class UserManager(BaseUserManager, PermissionsMixin):

    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Email is missing")

        user = self.model(
            email=self.normalize_email(email),
            **extra_fields
        )
        if len(password) > 5:
            user.set_password(password)
            user.save(using=self.db)
            return user
        else:
            raise ValueError('Password is too short')

    def create_superuser(self, email, password):
        if not email or not password:
            raise ValueError("Both an Email and a Password must be provided")

        user = self.create_user(
            email=self.normalize_email(email),
            password=password
        )
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self.db)
        return user




class User(AbstractBaseUser):
    first_name  = models.CharField(max_length=255)
    last_name   = models.CharField(max_length=255)
    email       = models.EmailField(max_length=255, unique=True)
    is_active   = models.BooleanField(default=True)
    is_staff    = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'

    objects = UserManager()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    def get_is_staff(self):
        return self.is_staff