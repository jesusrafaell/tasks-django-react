from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    isCompleted = serializers.BooleanField(source='is_completed')
    createdAt = serializers.DateTimeField(source='created_at', read_only=True)
    updatedAt = serializers.DateTimeField(source='updated_at', read_only=True)

    class Meta:
        model = Task
        fields = ['id', 'name', 'description', 'isCompleted', 'createdAt', 'updatedAt']
