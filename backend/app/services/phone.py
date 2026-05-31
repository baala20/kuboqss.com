import re
from dataclasses import dataclass


@dataclass(frozen=True)
class LibyaPhone:
    e164: str
    digits: str
    local: str


def normalize_libya_phone(raw: str) -> LibyaPhone | None:
    value = re.sub(r"[\s\-().]", "", raw.strip())
    value = re.sub(r"[^\d+]", "", value)

    if value.startswith("00"):
        value = f"+{value[2:]}"
    elif value.startswith("218"):
        value = f"+{value}"
    elif value.startswith("0"):
        value = f"+218{value[1:]}"

    if not re.fullmatch(r"\+2189[1-6]\d{7}", value):
        return None

    return LibyaPhone(e164=value, digits=value.replace("+", ""), local=f"0{value[4:]}")
