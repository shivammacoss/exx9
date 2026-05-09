"""Critical-path tests for authentication.

These exercise the real FastAPI app, real Postgres, and real Redis. They are
the smallest possible smoke around the auth surface — register, login, the
401 + refresh dance, and password rules. If any of these fail, the trader
web app cannot onboard or sign in users.
"""
from __future__ import annotations

import pytest

pytestmark = pytest.mark.asyncio


# ─── /auth/register ──────────────────────────────────────────────────────

async def test_register_creates_user_and_returns_token(client, fresh_email, strong_password):
    res = await client.post(
        "/api/v1/auth/register",
        json={
            "email": fresh_email,
            "password": strong_password,
            "first_name": "Test",
            "last_name": "User",
        },
    )
    assert res.status_code == 201, res.text
    body = res.json()
    assert body.get("user_id"), "register must return a user_id"
    # Cookies set on register so the user lands authenticated
    assert any(c.name in ("access_token", "refresh_token") for c in client.cookies.jar)


async def test_register_rejects_short_password(client, fresh_email):
    res = await client.post(
        "/api/v1/auth/register",
        json={
            "email": fresh_email,
            "password": "short",  # < 8 chars
            "first_name": "Test",
            "last_name": "User",
        },
    )
    assert res.status_code == 422


async def test_register_rejects_duplicate_email(client, fresh_email, strong_password):
    payload = {
        "email": fresh_email,
        "password": strong_password,
        "first_name": "Test",
        "last_name": "User",
    }
    first = await client.post("/api/v1/auth/register", json=payload)
    assert first.status_code == 201

    # Same email, same case
    dup = await client.post("/api/v1/auth/register", json=payload)
    assert dup.status_code in (400, 409)

    # Same email, different case — must still be rejected (email_case_insensitive_unique)
    payload_upper = {**payload, "email": fresh_email.upper()}
    dup_case = await client.post("/api/v1/auth/register", json=payload_upper)
    assert dup_case.status_code in (400, 409)


# ─── /auth/login ─────────────────────────────────────────────────────────

async def test_login_with_correct_credentials(client, fresh_email, strong_password):
    await client.post(
        "/api/v1/auth/register",
        json={
            "email": fresh_email,
            "password": strong_password,
            "first_name": "Test",
            "last_name": "User",
        },
    )
    client.cookies.clear()

    res = await client.post(
        "/api/v1/auth/login",
        json={"email": fresh_email, "password": strong_password},
    )
    assert res.status_code == 200, res.text
    # /auth/me should now succeed using the cookies set by login
    me = await client.get("/api/v1/auth/me")
    assert me.status_code == 200
    assert me.json()["email"].lower() == fresh_email.lower()


async def test_login_with_wrong_password_returns_401(client, fresh_email, strong_password):
    await client.post(
        "/api/v1/auth/register",
        json={
            "email": fresh_email,
            "password": strong_password,
            "first_name": "Test",
            "last_name": "User",
        },
    )
    client.cookies.clear()

    res = await client.post(
        "/api/v1/auth/login",
        json={"email": fresh_email, "password": "WrongPassword2025!"},
    )
    assert res.status_code == 401


async def test_me_without_session_returns_401(client):
    client.cookies.clear()
    res = await client.get("/api/v1/auth/me")
    assert res.status_code == 401


# ─── /auth/refresh ───────────────────────────────────────────────────────

async def test_refresh_extends_session(client, fresh_email, strong_password):
    await client.post(
        "/api/v1/auth/register",
        json={
            "email": fresh_email,
            "password": strong_password,
            "first_name": "Test",
            "last_name": "User",
        },
    )
    res = await client.post("/api/v1/auth/refresh")
    assert res.status_code == 200, res.text
    me = await client.get("/api/v1/auth/me")
    assert me.status_code == 200


# ─── Public platform status (no auth) ────────────────────────────────────

async def test_platform_status_is_public(client):
    res = await client.get("/api/v1/auth/platform-status")
    assert res.status_code == 200
    body = res.json()
    for k in ("maintenance_mode", "allow_new_registrations", "allow_deposits", "allow_withdrawals"):
        assert k in body
