from pydantic import BaseModel, Field


class OrderItemIn(BaseModel):
    product_id: str
    slug: str
    name_ar: str
    offer_id: str
    offer_label: str
    quantity: int = Field(gt=0)
    unit_price_lyd: float = Field(ge=0)


class OrderCreate(BaseModel):
    customer_name: str = Field(min_length=2, max_length=160)
    phone: str = Field(min_length=6, max_length=64)
    items: list[OrderItemIn] = Field(min_length=1)
    total_lyd: float = Field(ge=0)
    currency: str = "LYD"
    event_id: str
    source: str = "website"
    landing_page: str = ""
    referrer: str = ""
    utm_source: str = ""
    utm_medium: str = ""
    utm_campaign: str = ""
    utm_content: str = ""
    utm_term: str = ""
    fbclid: str = ""
    fbc: str = ""
    fbp: str = ""
    ttclid: str = ""
    ttp: str = ""
    snapclid: str = ""


class OrderOut(BaseModel):
    order_number: str
    thank_you_url: str
