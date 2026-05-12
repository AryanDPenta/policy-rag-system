from rest_framework import serializers
from .models import PolicyDocument


class PolicyDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = PolicyDocument
        fields = '__all__'