from django.shortcuts import render
from .models import *
from django.http import JsonResponse

from django.views.decorators.csrf import csrf_exempt
import requests
import json
from rest_framework.decorators import api_view
from rest_framework.response import Response

DATA_STORE = {} 

@api_view(["GET", "POST", "PUT", "DELETE"])
def api_handler(request, key=None):
    if request.method == "GET":
        if key:
            return Response(DATA_STORE.get(key, {"error": "Not found"}))
        return Response(DATA_STORE)  # Return all stored data

    elif request.method == "POST":
        DATA_STORE.update(request.data)  # Merge new data
        return Response({"message": "Data saved", "data": request.data})

    elif request.method == "PUT":
        if key in DATA_STORE:
            DATA_STORE[key] = request.data  # Update data
            return Response({"message": "Updated", "data": request.data})
        return Response({"error": "Key not found"}, status=404)

    elif request.method == "DELETE":
        if key in DATA_STORE:
            del DATA_STORE[key]
            return Response({"message": "Deleted"})
        return Response({"error": "Key not found"}, status=404)