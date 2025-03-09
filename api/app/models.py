from django.db import models

class Message(models.Model):
    key = models.CharField(max_length=255)
    value = models.TextField()
