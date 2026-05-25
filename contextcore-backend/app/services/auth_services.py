from fastapi import HTTPException
from jose import jwt, JWTError
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from passlib.hash import bcrypt
import hashlib
import logging

from app.repositories.user_repository import get_user_by_email
from app.models.user import User
from app.services.email_service import send_reset_email, send_verification_email
from app.core.config import settings

logger = logging.getLogger(__name__)


# ---------------- PASSWORD HASH ----------------
def hash_password(password: str):
    password_bytes = password.encode("utf-8")

    if len(password_bytes) > 72:
        password = password_bytes[:72].decode("utf-8", errors="ignore")

    try:
        return bcrypt.hash(password)
    except Exception:
        return hashlib.sha256(password.encode("utf-8")).hexdigest()


# ---------------- TOKEN ----------------
def create_token(subject: str, token_type: str, expires_in_minutes: int):
    expire = datetime.utcnow() + timedelta(minutes=expires_in_minutes)

    payload = {
        "sub": str(subject),   # 👈 user.id (recommended)
        "type": token_type,
        "exp": expire
    }

    return jwt.encode(
        payload,
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM
    )


def verify_token(token: str, expected_type: str):
    try:
        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM]
        )

        if payload.get("type") != expected_type:
            raise Exception("Invalid token type")

        return payload["sub"]

    except JWTError:
        raise Exception("Invalid or expired token")


# ---------------- LOGIN ----------------
def login_user(db: Session, data):

    user = get_user_by_email(db, data.email)

    if not user:
        raise HTTPException(401, "Invalid Credentials")

    if not user.is_verified:
        raise HTTPException(401, "Email not verified")

    # password check
    stored_password = user.password

    if stored_password.startswith("$2b$") or stored_password.startswith("$2a$"):
        if not bcrypt.verify(data.password, stored_password):
            raise HTTPException(401, "Invalid Credentials")
    else:
        hashed_input = hashlib.sha256(
            data.password.encode("utf-8")
        ).hexdigest()

        if hashed_input != stored_password:
            raise HTTPException(401, "Invalid Credentials")

    # ✅ JWT now uses USER ID
    token = create_token(
        subject=str(user.id),
        token_type="access",
        expires_in_minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
    )

    return {
        "token": token,
        "user": {
            "id": user.id,
            "fullname": user.fullname,
            "email": user.email
        }
    }


# ---------------- REGISTER ----------------
async def register_user(db: Session, data):

    existing = get_user_by_email(db, data.email)

    if existing:
        raise HTTPException(400, "User already exists")

    new_user = User(
        fullname=data.fullname,
        email=data.email,
        password=hash_password(data.password),
        is_verified=False
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    verification_token = create_token(
        subject=str(new_user.id),
        token_type="email_verification",
        expires_in_minutes=24 * 60
    )

    try:
        await send_verification_email(new_user.email, verification_token)
    except Exception as e:
        logger.error(f"Email failed: {str(e)}")

    return {
        "message": "Registration successful",
        "user": {
            "id": new_user.id,
            "email": new_user.email
        }
    }


# ---------------- FORGOT PASSWORD ----------------
async def forgot_password(db: Session, data):

    user = get_user_by_email(db, data.email)

    if not user:
        raise HTTPException(404, "User not found")

    reset_token = create_token(
        subject=str(user.id),
        token_type="password_reset",
        expires_in_minutes=30
    )

    await send_reset_email(user.email, reset_token)

    return {"message": "Password reset email sent"}


# ---------------- RESET PASSWORD ----------------
def reset_password(db: Session, data):

    try:
        user_id = verify_token(data.token, "password_reset")

    except Exception:
        raise HTTPException(400, "Invalid or expired token")

    user = db.query(User).filter(User.id == int(user_id)).first()

    if not user:
        raise HTTPException(404, "User not found")

    user.password = hash_password(data.new_password)

    db.commit()

    return {"message": "Password reset successful"}
