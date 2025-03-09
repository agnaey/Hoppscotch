from django.shortcuts import render
from .models import *
from django.http import JsonResponse

from django.views.decorators.csrf import csrf_exempt
import requests
import json
from django.http import JsonResponse
from .models import Message
import json

def api_endpoint(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            print("📩 Received Data:", data)
            
            # Store data in database
            message = Message.objects.create(key=data.get("key"), value=data.get("value"))
            
            return JsonResponse({"message": "Data stored!", "data": {"key": message.key, "value": message.value}}, status=200)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)

    elif request.method == "GET":
        # Retrieve stored data
        messages = Message.objects.all().values("key", "value")  # Get all records
        return JsonResponse({"message": "Stored data retrieved!", "data": list(messages)}, status=200)

    return JsonResponse({"error": "Method not allowed"}, status=405)

@csrf_exempt  
def test_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            print("Received data:", data)  # Debugging
            return JsonResponse({"message": "Data added!", "data": data}, status=201)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)

    return JsonResponse({"message": "GET request received!"})