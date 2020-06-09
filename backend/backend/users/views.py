from django.contrib.auth import get_user_model, authenticate
from rest_framework import generics, authentication, permissions
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.authtoken.views import ObtainAuthToken

from .models import User
from .serializers import UserSerializer, AuthTokenSerializer


class CreateUserView(generics.GenericAPIView, ObtainAuthToken):
    """Create Users"""
    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        user.set_password(request.data.get("password"))
        user = serializer.save()
        token, created = Token.objects.get_or_create(user=user)
        return Response({"token": token.key}, status=201)


class UpdateUserView(generics.UpdateAPIView):
    """Update Users"""
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = UserSerializer
    lookup_field = 'id'
    queryset = User.objects.all()


class LoginUserView(ObtainAuthToken):
    """Login Users"""
    def post(self, request, *args, **kwargs):
        serializer = AuthTokenSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=False)
        try:
            user = serializer.validated_data['user']
            if user:
                token, created = Token.objects.get_or_create(user=user)
                return Response({"token": token.key})
        except KeyError:
            return Response(status=401)
