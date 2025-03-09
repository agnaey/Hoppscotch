from rest_framework.routers import DefaultRouter
from app.views import *
from django.urls import path, include


urlpatterns = [
    path('api/test/', api_endpoint, name='api_test'),
]