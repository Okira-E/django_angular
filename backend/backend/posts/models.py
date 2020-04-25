from django.db import models
from django.conf import settings


class Post(models.Model):
    title       = models.CharField(max_length=30)
    content     = models.CharField(max_length=255)
    timestamp   = models.DateTimeField(auto_now_add=True)
    user        = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return self.title