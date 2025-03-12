from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    PROJECT_NAME: str = "QR Code Generator API"
    VERSION: str = "1.0.0"
    API_PREFIX: str = "/api"
    BACKEND_CORS_ORIGINS: list[str] = ["http://localhost:5173", "http://localhost:5174"]
    REDIS_URL: str = "redis://localhost:6379"
    MAX_LOGO_SIZE_KB: int = 500
    CACHE_EXPIRATION_SECONDS: int = 3600  # 1 hour

    class Config:
        case_sensitive = True
        env_file = ".env"

@lru_cache
def get_settings() -> Settings:
    return Settings()
