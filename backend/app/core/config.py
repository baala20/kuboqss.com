from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    app_env: str = "development"
    app_name: str = "kuboqss-backend"
    database_url: str = "postgresql+asyncpg://kuboqss:kuboqss@localhost:5432/kuboqss"
    frontend_url: str = "http://localhost:3000"
    backend_url: str = "http://localhost:8000"
    allowed_origins: str = "http://localhost:3000"
    google_sheets_webhook_url: str = ""
    order_webhook_secret: str = ""
    meta_pixel_id: str = ""
    meta_access_token: str = ""
    meta_test_event_code: str = ""
    tiktok_pixel_code: str = ""
    tiktok_access_token: str = ""
    tiktok_test_event_code: str = ""
    snap_pixel_id: str = ""
    snap_access_token: str = ""
    snap_test_event_code: str = ""
    log_level: str = "info"

    # MaxMind GeoIP2
    maxmind_account_id: str = ""
    maxmind_license_key: str = ""
    maxmind_whitelisted_phones: str = "055000000"

    @property
    def whitelisted_phones_list(self) -> list[str]:
        return [p.strip() for p in self.maxmind_whitelisted_phones.split(",") if p.strip()]

    @property
    def cors_origins(self) -> list[str]:
        return [origin.strip() for origin in self.allowed_origins.split(",") if origin.strip()]

    @property
    def sqlalchemy_database_url(self) -> str:
        if self.database_url.startswith("postgres://"):
            return self.database_url.replace("postgres://", "postgresql+asyncpg://", 1)
        if self.database_url.startswith("postgresql://"):
            return self.database_url.replace("postgresql://", "postgresql+asyncpg://", 1)
        return self.database_url

    @property
    def sync_database_url(self) -> str:
        url = self.sqlalchemy_database_url
        if "+asyncpg" in url:
            return url.replace("+asyncpg", "+psycopg")
        if url.startswith("postgresql://"):
            return url.replace("postgresql://", "postgresql+psycopg://", 1)
        if url.startswith("postgres://"):
            return url.replace("postgres://", "postgresql+psycopg://", 1)
        return url


@lru_cache
def get_settings() -> Settings:
    return Settings()
