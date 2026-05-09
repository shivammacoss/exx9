"""Tests for the public lead-capture endpoint used by the landing page."""
from __future__ import annotations

import pytest

pytestmark = pytest.mark.asyncio


async def test_create_partner_lead_succeeds(client):
    res = await client.post(
        "/api/v1/public/leads",
        json={
            "kind": "partner",
            "full_name": "Jamie Tester",
            "email": "jamie@example.com",
            "phone": "+11234567890",
            "company": "Acme Trading",
            "partner_type": "introducing-broker",
            "source": "ci-test",
        },
    )
    assert res.status_code == 201, res.text
    body = res.json()
    assert body["status"] == "received"
    assert body["id"]


async def test_create_contact_lead_succeeds(client):
    res = await client.post(
        "/api/v1/public/leads",
        json={
            "kind": "contact",
            "full_name": "Sam Tester",
            "email": "sam@example.com",
            "message": "I'd like a call.",
            "source": "ci-test",
        },
    )
    assert res.status_code == 201


async def test_lead_rejects_invalid_kind(client):
    res = await client.post(
        "/api/v1/public/leads",
        json={
            "kind": "spam",  # not in Literal["contact", "partner"]
            "full_name": "Sam Tester",
            "email": "sam@example.com",
        },
    )
    assert res.status_code == 422


async def test_lead_rejects_invalid_email(client):
    res = await client.post(
        "/api/v1/public/leads",
        json={
            "kind": "contact",
            "full_name": "Sam Tester",
            "email": "not-an-email",
        },
    )
    assert res.status_code == 422
