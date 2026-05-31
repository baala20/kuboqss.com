"""initial orders table

Revision ID: 0001_initial
Revises:
Create Date: 2026-05-30
"""

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision = "0001_initial"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "orders",
        sa.Column("id", postgresql.UUID(as_uuid=False), primary_key=True),
        sa.Column("order_number", sa.String(length=32), nullable=False),
        sa.Column("status", sa.String(length=32), nullable=False),
        sa.Column("customer_name", sa.String(length=160), nullable=False),
        sa.Column("phone_raw", sa.String(length=64), nullable=False),
        sa.Column("phone_e164", sa.String(length=32), nullable=False),
        sa.Column("phone_local", sa.String(length=32), nullable=False),
        sa.Column("items", postgresql.JSONB(astext_type=sa.Text()), nullable=False),
        sa.Column("subtotal_lyd", sa.Float(), nullable=False),
        sa.Column("discount_lyd", sa.Float(), nullable=False),
        sa.Column("total_lyd", sa.Float(), nullable=False),
        sa.Column("currency", sa.String(length=8), nullable=False),
        sa.Column("source", sa.String(length=80), nullable=False),
        sa.Column("landing_page", sa.Text(), nullable=False),
        sa.Column("referrer", sa.Text(), nullable=False),
        sa.Column("utm_source", sa.String(length=200), nullable=False),
        sa.Column("utm_medium", sa.String(length=200), nullable=False),
        sa.Column("utm_campaign", sa.String(length=200), nullable=False),
        sa.Column("utm_content", sa.String(length=200), nullable=False),
        sa.Column("utm_term", sa.String(length=200), nullable=False),
        sa.Column("fbclid", sa.Text(), nullable=False),
        sa.Column("fbc", sa.Text(), nullable=False),
        sa.Column("fbp", sa.Text(), nullable=False),
        sa.Column("ttclid", sa.Text(), nullable=False),
        sa.Column("ttp", sa.Text(), nullable=False),
        sa.Column("snapclid", sa.Text(), nullable=False),
        sa.Column("event_id", sa.String(length=160), nullable=False),
        sa.Column("client_ip", sa.String(length=80), nullable=False),
        sa.Column("user_agent", sa.Text(), nullable=False),
        sa.Column("sheet_sync_status", sa.String(length=32), nullable=False),
        sa.Column("sheet_sync_error", sa.Text(), nullable=False),
        sa.Column("notes", sa.Text(), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
    )
    op.create_index("ix_orders_order_number", "orders", ["order_number"], unique=True)
    op.create_index("ix_orders_phone_e164", "orders", ["phone_e164"])
    op.create_index("ix_orders_event_id", "orders", ["event_id"])


def downgrade() -> None:
    op.drop_index("ix_orders_event_id", table_name="orders")
    op.drop_index("ix_orders_phone_e164", table_name="orders")
    op.drop_index("ix_orders_order_number", table_name="orders")
    op.drop_table("orders")
