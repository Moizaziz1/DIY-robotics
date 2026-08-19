import json
from pydantic import model_validator
from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql+asyncpg://user:pass@localhost:5432/diy_robotics"
    SECRET_KEY: str = "your-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    CORS_ORIGINS: list[str] = ["http://localhost:3000"]
    SMTP_HOST: str = ""
    SMTP_PORT: int = 587
    SMTP_USER: str = ""
    SMTP_PASSWORD: str = ""

    @model_validator(mode="before")
    @classmethod
    def parse_cors_origins(cls, values):
        cors = values.get("CORS_ORIGINS")
        if isinstance(cors, str):
            values["CORS_ORIGINS"] = json.loads(cors)
        return values

    class Config:
        env_file = ".env"

@lru_cache
def get_settings() -> Settings:
    return Settings()
