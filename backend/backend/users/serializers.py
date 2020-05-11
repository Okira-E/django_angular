from django.contrib.auth import get_user_model, authenticate
from rest_framework import serializers, authentication, permissions
from django.utils.translation import gettext_lazy as _


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('first_name', 'last_name', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True, 'min_length': 6}}

    def update(self, instance, validated_data):
        password = validated_data.pop('password')
        user = super().update(instance, validated_data)

        if password:
            user.set_password(password)
            user.save()

        return user


class AuthTokenSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField(
        style={'input_type': 'password'},
        trim_whitespace=False
    )

    def validate(self, data):
        """Validate and authenticate the user"""
        email = data.get('email')
        password = data.get('password')

        # Upon failing to authenticate returns a falsy value
        # If success returns the user
        user = authenticate(
            username=email,
            password=password,
            request=self.context.get('request')
        )

        if not user:
            msg = _("Unable to authenticate User")
            raise serializers.ValidationError(msg, code='authentication')

        data['user'] = user
        return data
