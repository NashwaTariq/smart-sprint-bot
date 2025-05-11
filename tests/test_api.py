import json
import pytest
from api import app  # Import your Flask app

@pytest.fixture
def client():
    with app.test_client() as client:
        yield client

def test_get_jira_issues(client):
    response = client.get('/api/jira/issues')
    assert response.status_code == 200
    assert isinstance(response.json, list)  # Assuming it returns a list of issues

def test_create_jira_ticket(client):
    response = client.post('/api/jira/ticket', json={'summary': 'Test issue'})
    assert response.status_code == 201
    assert 'key' in response.json  # Assuming it returns the created ticket with a key

def test_delete_jira_ticket(client):
    response = client.delete('/api/jira/ticket/ISSUE-123')  # Replace with a valid issue key
    assert response.status_code == 200
    assert response.json['result'] is True  # Assuming it returns a result indicating success 