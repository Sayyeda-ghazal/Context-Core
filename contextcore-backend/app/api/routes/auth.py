from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from jose import jwt, JWTError
from sqlalchemy.orm import Session
from app.schemas.auth import ForgotPasswordRequest,ResetPasswordRequest
from app.schemas.auth import LoginRequest, RegisterRequest
from app.services.auth_services import login_user, register_user, forgot_password, reset_password, get_user_by_email
from app.core.database import get_db
from app.services.email_service import send_verification_email
from app.core.config import settings


router = APIRouter()


@router.post("/login")
def login(data: LoginRequest,db: Session = Depends(get_db)):
    return login_user(db, data)


@router.post("/register")
async def register(data: RegisterRequest, db: Session = Depends(get_db)):
    result = await register_user(db, data)
    return result

@router.post("/forgot-password")
async def forgot_password_route(data: ForgotPasswordRequest,db: Session = Depends(get_db)):
    return await forgot_password(db, data)


@router.post("/reset-password")
def reset_password_route(data: ResetPasswordRequest,db: Session = Depends(get_db)):
    return reset_password(db, data)


@router.get("/email-health-check")
def email_health_check():
    """
    Health check endpoint for email service
    Returns status of email configuration and test capability
    """
    try:
        # Test if email configuration is loaded
        
        if not settings.MAIL_USERNAME or not settings.MAIL_PASSWORD:
            return {
                "status": "error",
                "message": "Email configuration not set. Check MAIL_USERNAME and MAIL_PASSWORD environment variables."
            }
        
        # Test basic email functionality (without sending)
        return {
            "status": "ok",
            "message": "Email service is configured and ready",
            "config": {
                "MAIL_SERVER": settings.MAIL_SERVER,
                "MAIL_PORT": settings.MAIL_PORT,
                "MAIL_FROM": settings.MAIL_FROM,
                "MAIL_USERNAME": settings.MAIL_USERNAME,
                "is_gmail": "gmail.com" in settings.MAIL_SERVER.lower()
            }
        }
    except Exception as e:
        return {
            "status": "error",
            "message": f"Email health check failed: {str(e)}"
        }


@router.get("/verify-email")
def verify_email(token: str, db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM]
        )

        email = payload.get("sub")

        if not email:
            raise HTTPException(
                status_code=400,
                detail="Invalid token"
            )

        # Find user and update verification status
        user = get_user_by_email(db, email)
        if not user:
            raise HTTPException(
                status_code=404,
                detail="User not found"
            )

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
    except JWTError:
        raise HTTPException(
            status_code=400,
            detail="Invalid or expired token"
        )