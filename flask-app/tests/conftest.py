import os
from dotenv import load_dotenv
from app import app as flask_app

load_dotenv(dotenv_path='.env.test')

import pytest

@pytest.fixture
def app():
    yield flask_app

@pytest.fixture
def client(app):
    return app.test_client()

@pytest.fixture
def runner(app):
    return app.test_cli_runner()