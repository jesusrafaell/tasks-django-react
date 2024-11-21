from django.test import TestCase
from tasks.models import Task

class TaskModelTest(TestCase):
    def test_task_creation_model(self):
        task = Task.objects.create(
            name="Test Task",
            description="This is a test task",
            is_completed=False
        )
        
        self.assertEqual(task.name, "Test Task")
        self.assertEqual(task.description, "This is a test task")
        self.assertFalse(task.is_completed)
        self.assertIsNotNone(task.created_at)
        self.assertIsNotNone(task.updated_at)
