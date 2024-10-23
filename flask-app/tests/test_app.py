import pytest
from app import app

@pytest.fixture
def client():
    with app.test_client() as client:
        yield client

def test_index(client):
    rv = client.get('/')
    assert b"Welcome to OptiFooty!" in rv.data

def test_run_transfer_optimiser_script(client):
    response = client.post('/run-transferOptimiser-script', json={"data": "test"})
    assert response.status_code == 200

def test_run_lineup_optimiser_script(client):
    response = client.post('/run-lineupOptimiser-script', json={"data": "test"})
    assert response.status_code == 200