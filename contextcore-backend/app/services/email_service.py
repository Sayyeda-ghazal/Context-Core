import logging
from fastapi_mail import FastMail, MessageSchema
from app.core.email import get_mail_conf
from jose import jwt
from datetime import datetime, timedelta

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


async def send_reset_email(email: str, token: str):
    reset_link = f"http://localhost:5173/reset-password?token={token}"

    message = MessageSchema(
        subject="Reset Your Password",
        recipients=[email],
        body=f"""
        Click the link below to reset your password:

        {reset_link}

        This link expires in 30 minutes.
        """,
        subtype="plain"
    )

    try:
        fm = FastMail(get_mail_conf())
        await fm.send_message(message)
        logger.info(f"Password reset email sent successfully to {email}")
        return {"success": True, "message": "Password reset email sent successfully"}
    except Exception as e:
        logger.error(f"Failed to send password reset email to {email}: {str(e)}")
        raise e


async def send_verification_email(email: str, token: str):
    verify_link = f"http://localhost:5173/verify-email?token={token}"

    message = MessageSchema(
        subject="Verify Your Email Address",
        recipients=[email],
        body=f"""
        Thank you for registering with ContextCore!

        Please click the link below to verify your email address:

        {verify_link}

        This link expires in 24 hours.
        """,
        subtype="plain"
    )

    try:
        fm = FastMail(get_mail_conf())
        await fm.send_message(message)
        logger.info(f"Verification email sent successfully to {email}")
        return {"success": True, "message": "Verification email sent successfully"}
    except Exception as e:
        logger.error(f"Failed to send verification email to {email}: {str(e)}")
        raise e
