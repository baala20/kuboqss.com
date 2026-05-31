from fastapi import APIRouter, HTTPException

router = APIRouter(prefix="/api/products", tags=["products"])

PRODUCTS = [
    {"id": "hair-ritual", "slug": "hair-confidence-ritual", "name_ar": "روتين العناية بالشعر", "category": "العناية بالشعر", "price_from_lyd": 79},
    {"id": "skin-glow", "slug": "skin-glow-care", "name_ar": "روتين نضارة البشرة", "category": "العناية بالبشرة", "price_from_lyd": 79},
    {"id": "under-eye", "slug": "under-eye-care", "name_ar": "عناية منطقة تحت العين", "category": "العناية بالوجه", "price_from_lyd": 79},
]


@router.get("")
async def list_products() -> list[dict]:
    return PRODUCTS


@router.get("/{slug}")
async def get_product(slug: str) -> dict:
    for product in PRODUCTS:
        if product["slug"] == slug:
            return product
    raise HTTPException(status_code=404, detail="Product not found")
