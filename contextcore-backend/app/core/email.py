from functools import lru_cache
from fastapi_mail import ConnectionConfig
from app.core.config import settings


@lru_cache(maxsize=1)
def get_mail_conf() -> ConnectionConfig:
    if not settings.MAIL_USERNAME or not settings.MAIL_PASSWORD or not settings.MAIL_FROM:
        raise RuntimeError(
            "Email is not configured. Set MAIL_USERNAME, MAIL_PASSWORD, and MAIL_FROM in the environment (or .env)."
        )

    return ConnectionConfig(
        MAIL_USERNAME=settings.MAIL_USERNAME,
        MAIL_PASSWORD=settings.MAIL_PASSWORD,
        MAIL_FROM=settings.MAIL_FROM,
        MAIL_PORT=settings.MAIL_PORT,
        MAIL_SERVER=settings.MAIL_SERVER,
        MAIL_STARTTLS=settings.MAIL_STARTTLS,
        MAIL_SSL_TLS=settings.MAIL_SSL_TLS,
        USE_CREDENTIALS=settings.USE_CREDENTIALS,
        VALIDATE_CERTS=settings.VALIDATE_CERTS,
    )
