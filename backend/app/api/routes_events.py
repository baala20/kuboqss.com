from fastapi import APIRouter

router = APIRouter(prefix="/api/events", tags=["events"])


@router.post("/{event_name}")
async def receive_event(event_name: str, payload: dict) -> dict[str, str]:
    return {"status": "accepted", "event_name": event_name}
