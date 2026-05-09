"""AllTick API key validator. Rejects placeholder strings."""

from __future__ import annotations


_BAD_PATTERNS = (
    "placeholder",
    "example",
    "changeme",
    "change-me",
    "todo",
    "your-token",
    "your_token",
    "yourtoken",
    "xxx",
    "test",
)


def usable_alltick_api_key(key: str | None) -> bool:
    """Return True if the AllTick token looks real (not blank or placeholder)."""
    if key is None:
        return False
    k = str(key).strip()
    if len(k) < 12:
        return False
    low = k.lower()
    for bad in _BAD_PATTERNS:
        if bad in low:
            return False
    if low in {"none", "null", "false"}:
        return False
    return True
