from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert "message" in response.json()

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

def test_system_metrics():
    response = client.get("/system/metrics")
    assert response.status_code == 200
    data = response.json()
    assert "cpu_percent" in data
    assert "memory_total" in data
