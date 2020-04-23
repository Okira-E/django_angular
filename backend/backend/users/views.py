from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User



@api_view(['POST'])
def createUserView(request):
    if request.method == 'POST':
        get_user_model().objects.create_user(**request.data)
        return Response(User.objects.all())
        # return Response(request.data)