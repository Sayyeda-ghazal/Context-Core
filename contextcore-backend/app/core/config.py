from pathlib import Path

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict

_BACKEND_DIR = Path(__file__).resolve().parents[2]

class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        case_sensitive=False,
        env_file=str(_BACKEND_DIR / ".env"),
        env_file_encoding="utf-8",
    )

    # Database
    DATABASE_URL: str = Field(default="sqlite:///./sql_app.db")
    
    # Email Configuration
    MAIL_USERNAME: str | None = Field(default=None)
    MAIL_PASSWORD: str | None = Field(default=None)
    MAIL_FROM: str | None = Field(default=None)
    MAIL_PORT: int = Field(default=587)
    MAIL_SERVER: str = Field(default="smtp.gmail.com")
    MAIL_STARTTLS: bool = Field(default=True)
    MAIL_SSL_TLS: bool = Field(default=False)
    USE_CREDENTIALS: bool = Field(default=True)
    VALIDATE_CERTS: bool = Field(default=True)
    
    # JWT
    SECRET_KEY: str = Field(default="CHANGE_ME")
    ALGORITHM: str = Field(default="HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = Field(default=60)

    # Auth cookie (HttpOnly)
    ACCESS_TOKEN_COOKIE_NAME: str = Field(default="access_token")
    AUTH_COOKIE_SECURE: bool = Field(default=False)  # set True behind HTTPS
    AUTH_COOKIE_SAMESITE: str = Field(default="lax")  # "lax" | "strict" | "none"
    AUTH_COOKIE_DOMAIN: str | None = Field(default=None)
    AUTH_COOKIE_PATH: str = Field(default="/")


settings = Settings()
