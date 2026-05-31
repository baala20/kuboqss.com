from datetime import datetime
from uuid import uuid4

from sqlalchemy import DateTime, Float, String, Text, func
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class Order(Base):
    __tablename__ = "orders"

    id: Mapped[str] = mapped_column(UUID(as_uuid=False), primary_key=True, default=lambda: str(uuid4()))
    order_number: Mapped[str] = mapped_column(String(32), unique=True, index=True)
    status: Mapped[str] = mapped_column(String(32), default="new")
    customer_name: Mapped[str] = mapped_column(String(160))
    phone_raw: Mapped[str] = mapped_column(String(64))
    phone_e164: Mapped[str] = mapped_column(String(32), index=True)
    phone_local: Mapped[str] = mapped_column(String(32))
    items: Mapped[list[dict]] = mapped_column(JSONB)
    subtotal_lyd: Mapped[float] = mapped_column(Float)
    discount_lyd: Mapped[float] = mapped_column(Float, default=0)
    total_lyd: Mapped[float] = mapped_column(Float)
    currency: Mapped[str] = mapped_column(String(8), default="LYD")
    source: Mapped[str] = mapped_column(String(80), default="website")
    landing_page: Mapped[str] = mapped_column(Text, default="")
    referrer: Mapped[str] = mapped_column(Text, default="")
    utm_source: Mapped[str] = mapped_column(String(200), default="")
    utm_medium: Mapped[str] = mapped_column(String(200), default="")
    utm_campaign: Mapped[str] = mapped_column(String(200), default="")
    utm_content: Mapped[str] = mapped_column(String(200), default="")
    utm_term: Mapped[str] = mapped_column(String(200), default="")
    fbclid: Mapped[str] = mapped_column(Text, default="")
    fbc: Mapped[str] = mapped_column(Text, default="")
    fbp: Mapped[str] = mapped_column(Text, default="")
    ttclid: Mapped[str] = mapped_column(Text, default="")
    ttp: Mapped[str] = mapped_column(Text, default="")
    snapclid: Mapped[str] = mapped_column(Text, default="")
    event_id: Mapped[str] = mapped_column(String(160), index=True)
    client_ip: Mapped[str] = mapped_column(String(80), default="")
    user_agent: Mapped[str] = mapped_column(Text, default="")
    sheet_sync_status: Mapped[str] = mapped_column(String(32), default="pending")
    sheet_sync_error: Mapped[str] = mapped_column(Text, default="")
    notes: Mapped[str] = mapped_column(Text, default="")
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
