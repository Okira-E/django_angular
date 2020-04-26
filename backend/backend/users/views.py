from django.contrib.auth import get_user_model, authenticate
from rest_framework import generics, authentication, permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.authtoken.views import ObtainAuthToken

from .seriaizers import UserSerializer, AuthTokenSerializer
from .models import UserManager



class CreateUserView(ObtainAuthToken):
    """Create Users"""
    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token, created = Token.objects.get_or_create(user=user)
        return Response({"token": token.key})


# class UpdateUserView(APIView):
#     authentication_classes = (authentication.TokenAuthentication,)
#     permission_classes = (permissions.IsAuthenticated,)
#     pass



class LoginUserView(ObtainAuthToken):
    """Login Users"""
    def post(self, request, *args, **kwargs):
        serializer = AuthTokenSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({"token": token.key})


# def generateAuthToken(user):
#     token = Token.objects.create(user=user)
#     return token


# @api_view(['POST'])
# def createUserView(request):
#     if request.method == 'POST':
#         user = get_user_model().objects.create_user(**request.data)
#         token = generateAuthToken(user)
#         return Response({"token": token.key}, status=201)


# @api_view(['POST'])
# def loginUserView(request):
#     if request.method == 'POST':
#         email = request.data['email']
#         password = request.data['password']
#
#         user = authenticate(request='POST', password=password, username=email)
#         if not user:
#             return Response(status=401)
#
#         token = generateAuthToken(user)
#         return Response({"token": token}, status=200)