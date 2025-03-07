from django.shortcuts import render
from .models import *
from django.http import JsonResponse

from django.views.decorators.csrf import csrf_exempt
import requests
import json
# Create your views here.

@csrf_exempt
def fetch_api(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            url = data.get("url")
            if not url:
                return JsonResponse({"error": "URL is required"}, status=400)

            response = requests.get(url)
            return JsonResponse({
                "status_code": response.status_code,
                "headers": dict(response.headers),
                "body": response.json() if "application/json" in response.headers.get("Content-Type", "") else response.text,
            })
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"message": "Send a POST request with an API URL to fetch data."})