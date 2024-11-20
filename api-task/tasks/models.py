import uuid
from django.db import models

class Task(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,  
        editable=False
    )
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    is_completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "tasks"

    def __str__(self):
        return self.name
