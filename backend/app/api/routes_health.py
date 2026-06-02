from fastapi import APIRouter, HTTPException
from sqlalchemy import text

from app.db.session import engine

router = APIRouter()


@router.get("/health")
async def health() -> dict[str, str]:
    try:
        async with engine.connect() as connection:
            await connection.execute(text("SELECT 1"))
    except Exception as exc:
        raise HTTPException(
            status_code=503,
            detail={"status": "error", "service": "kuboqss-backend", "database": "disconnected", "error": str(exc)},
        ) from exc

    return {"status": "ok", "service": "kuboqss-backend", "database": "connected"}
