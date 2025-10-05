from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Product
from django.contrib.auth.models import User

# Serializer for creating a new user
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user
    
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        # This method is called to generate the token.
        # First, get the default token from the parent class.
        token = super().get_token(user)

        # Now, add your custom claims to the token's payload.
        # These will be available on the frontend after decoding the token.
        token['username'] = user.username
        token['email'] = user.email
        # ... add any other claims you want

        return token

# Serializer for the Product model
class ProductSerializer(serializers.ModelSerializer):
    # Make owner field read-only to prevent it from being changed directly by API
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Product
        fields = '__all__' # Includes all fields from the model

