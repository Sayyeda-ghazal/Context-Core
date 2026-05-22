from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.schemas.auth import (
    LoginRequest,
    RegisterRequest,
    ForgotPasswordRequest,
    ResetPasswordRequest
)

from app.services.auth_services import (
    login_user,
    register_user,
    forgot_password,
    reset_password,
    verify_token
)

from app.repositories.user_repository import get_user_by_email
from app.core.database import get_db
from app.core.config import settings


router = APIRouter()


# =========================
# LOGIN
# =========================

@router.post("/login")
def login(
    data: LoginRequest,
    db: Session = Depends(get_db)
):
    return login_user(db, data)


# =========================
# REGISTER
# =========================

@router.post("/register")
async def register(
    data: RegisterRequest,
    db: Session = Depends(get_db)
):
    return await register_user(db, data)


# =========================
# FORGOT PASSWORD
# =========================

@router.post("/forgot-password")
async def forgot_password_route(
    data: ForgotPasswordRequest,
    db: Session = Depends(get_db)
):
    return await forgot_password(db, data)


# =========================
# RESET PASSWORD
# =========================

@router.post("/reset-password")
def reset_password_route(
    data: ResetPasswordRequest,
    db: Session = Depends(get_db)
):
    return reset_password(db, data)


# =========================
# VERIFY EMAIL
# =========================

@router.get("/verify-email")
def verify_email(
    token: str,
    db: Session = Depends(get_db)
):
    try:
        email = verify_token(
            token,
            "email_verification"
        )

    except Exception:
        raise HTTPException(
            status_code=400,
            detail="Invalid or expired token"
        )

    user = get_user_by_email(db, email)

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    # already verified safeguard
    if user.is_verified:
        return {
            "message": "Email already verified"
        }

    user.is_verified = True

    db.commit()

    return {
        "message": "Email verified successfully",
        "user": {
            "id": user.id,
            "fullname": user.fullname,
            "email": user.email
        }
    }


# =========================
# EMAIL HEALTH CHECK
# =========================

@router.get("/email-health-check")
def email_health_check():
    """
    Health check endpoint for email service
    """

    try:

        if (
            not settings.MAIL_USERNAME
            or not settings.MAIL_PASSWORD
        ):
            return {
                "status": "error",
                "message": (
                    "Email configuration missing. "
                    "Check environment variables."
                )
            }

        return {
            "status": "ok",
            "message": "Email service is configured and ready",
            "config": {
                "MAIL_SERVER": settings.MAIL_SERVER,
                "MAIL_PORT": settings.MAIL_PORT,
                "MAIL_FROM": settings.MAIL_FROM,
                "MAIL_USERNAME": settings.MAIL_USERNAME,
                "is_gmail": (
                    "gmail.com"
                    in settings.MAIL_SERVER.lower()
                )
            }
        }

    except Exception as e:
        return {
            "status": "error",
            "message": (
                f"Email health check failed: {str(e)}"
            )
        }