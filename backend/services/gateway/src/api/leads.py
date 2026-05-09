"""Public lead capture — Talk-To-Team / Become-Partner forms on the landing page.

No auth: anyone can submit. Lightweight throttle via Redis to slow naive
abuse (the public LB sits in front of this so heavy spam is filtered earlier).
"""
import logging
import time
from typing import Literal

from fastapi import APIRouter, Depends, HTTPException, Request, status
from pydantic import BaseModel, EmailStr, Field
from sqlalchemy.ext.asyncio import AsyncSession

from packages.common.src.database import get_db
from packages.common.src.models import Lead
from packages.common.src.redis_client import redis_client

logger = logging.getLogger("leads_api")

router = APIRouter()


class CreateLeadRequest(BaseModel):
    kind: Literal["contact", "partner"]
    full_name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    phone: str | None = Field(default=None, max_length=40)
    company: str | None = Field(default=None, max_length=120)
    website: str | None = Field(default=None, max_length=255)
    partner_type: str | None = Field(default=None, max_length=40)
    message: str | None = Field(default=None, max_length=4000)
    source: str | None = Field(default=None, max_length=60)


def _client_ip(request: Request) -> str | None:
    fwd = request.headers.get("x-forwarded-for")
    if fwd:
        return fwd.split(",")[0].strip() or None
    return request.client.host if request.client else None


async def _throttle(ip: str | None) -> None:
    """Allow at most 5 submissions / hour from one IP. Skip on Redis failure."""
    if not ip:
        return
    try:
        key = f"leads:throttle:{ip}:{int(time.time() // 3600)}"
        count = await redis_client.incr(key)
        if count == 1:
            await redis_client.expire(key, 3700)
        if count > 5:
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail="Too many submissions from this address — please try again later.",
            )
    except HTTPException:
        raise
    except Exception as exc:  # Redis hiccups must not break public form
        logger.warning("leads throttle skipped: %s", exc)


@router.post("/leads", status_code=status.HTTP_201_CREATED)
async def create_lead(
    body: CreateLeadRequest,
    request: Request,
    db: AsyncSession = Depends(get_db),
):
    ip = _client_ip(request)
    await _throttle(ip)

    lead = Lead(
        kind=body.kind,
        full_name=body.full_name.strip(),
        email=str(body.email).strip().lower(),
        phone=(body.phone or "").strip() or None,
        company=(body.company or "").strip() or None,
        website=(body.website or "").strip() or None,
        partner_type=(body.partner_type or "").strip() or None,
        message=(body.message or "").strip() or None,
        source=(body.source or "").strip() or None,
        user_agent=(request.headers.get("user-agent") or "")[:255] or None,
        ip_address=ip,
        status="new",
    )
    db.add(lead)
    await db.commit()
    return {"id": str(lead.id), "status": "received"}
