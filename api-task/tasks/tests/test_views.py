import uuid
import pytest
from rest_framework.test import APIClient
from rest_framework import status
from tasks.models import Task

@pytest.mark.django_db
class TestTaskAPI:
    @pytest.fixture
    def api_client(self):
        client = APIClient()
        client.defaults['CONTENT_TYPE'] = 'application/json'
        client.defaults['HTTP_ACCEPT'] = 'application/json'
        return client

    @pytest.fixture
    def task(self):
        new_uuid = str(uuid.uuid4())
        return Task.objects.create(
            name="Test Task",
            description="This is a test task",
            is_completed=False
        )

    def test_create_task(self, api_client):
        payload = {
            "name": "New Task",
            "description": "This is a new task",
            "isCompleted": False
        }
        response = api_client.post("/api/tasks/", payload, format="json")

        uuid_obj = uuid.UUID(response.data["id"], version=4)
        assert str(uuid_obj) == response.data["id"] 
        assert response.status_code == status.HTTP_201_CREATED
        assert response.data["name"] == payload["name"]
        assert response.data["description"] == payload["description"]
        assert not response.data["isCompleted"]


    def test_list_tasks(self, api_client, task):
        response = api_client.get("/api/tasks/")
        assert response.status_code == status.HTTP_200_OK
        assert isinstance(response.data, list)
        assert len(response.data) == 1
        assert response.data[0]["name"] == "Test Task"

    def test_retrieve_task(self, api_client, task):
        response = api_client.get(f"/api/tasks/{task.id}/")
        assert response.status_code == status.HTTP_200_OK
        assert response.data["name"] == "Test Task"
        assert response.data["description"] == "This is a test task"

    def test_update_task(self, api_client, task):
        payload = {
            "name": "Updated Task",
            "description": "This is an updated task",
            "isCompleted": True
        }
        response = api_client.put(f"/api/tasks/{task.id}/", payload, format="json")
        assert response.status_code == status.HTTP_200_OK
        assert response.data["name"] == payload["name"]
        assert response.data["description"] == payload["description"]
        assert response.data["isCompleted"] == payload["isCompleted"]

    def test_delete_task(self, api_client, task):
        response = api_client.delete(f"/api/tasks/{task.id}/")
        assert response.status_code == status.HTTP_200_OK
        assert Task.objects.count() == 0

    def test_delete_task_not_found(self, api_client, task):
        new_uuid = str(uuid.uuid4())
        response = api_client.delete(f"/api/tasks/{new_uuid}/")
        assert response.status_code == status.HTTP_404_NOT_FOUND
        assert Task.objects.count() != 0
