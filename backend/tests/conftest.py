"""Shared pytest fixtures for the EXX9 backend test suite.

These tests boot the gateway FastAPI app against the same Postgres + Redis
the CI workflow provisions (see `.github/workflows/ci.yml`). Each test gets
a unique email/account-number suffix so we don't need to truncate tables
between tests, and the suite is safe to run repeatedly.
"""
from __future__ import annotations

import asyncio
import uuid
from typing import AsyncIterator

import pytest
import pytest_asyncio
from httpx import AsyncClient, ASGITransport


@pytest.fixture(scope="session")
def event_loop():
    loop = asyncio.new_event_loop()
    yield loop
    loop.close()


@pytest_asyncio.fixture(scope="session")
async def app():
    """Import the FastAPI app once. Migrations are run by CI before pytest."""
    from services.gateway.src.main import app as gateway_app
    return gateway_app


@pytest_asyncio.fixture
async def client(app) -> AsyncIterator[AsyncClient]:
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac


@pytest.fixture
def fresh_email() -> str:
    """A unique email per test so registration tests never collide."""
    return f"test+{uuid.uuid4().hex[:12]}@exx9.test"


@pytest.fixture
def strong_password() -> str:
    return "TestUser2025!"
