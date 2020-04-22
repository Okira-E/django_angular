from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.request import Request


@api_view(['POST'])
def createUserView(request):
    return Response({"Message": "Hello from the backend"})
