from fastapi import HTTPException
from jose import jwt
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from passlib.hash import bcrypt
from app.repositories.user_repository import get_user_by_email
from app.models.user import User
from app.services.email_service import send_reset_email, send_verification_email


SECRET_KEY = "supersecretkey"
ALGORITHM = "HS256"


def login_user(db: Session, data):
    # check if user exists
    existing_user = get_user_by_email(db, data.email)

    if not existing_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid Credentials"
        )

    # check if user is verified
    if not existing_user.is_verified:
        raise HTTPException(
            status_code=401,
            detail="Email not verified. Please check your email and verify your account."
        )

    # verify password
    if not bcrypt.verify(data.password, existing_user.password):
        raise HTTPException(
            status_code=401,
            detail="Invalid Credentials"
        )

    # generate JWT token
    token = jwt.encode(
        {
            "sub": existing_user.email,
            "exp": datetime.utcnow() + timedelta(hours=1)
        },
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return {
        "token": token,
        "user": {
            "id": existing_user.id,
            "fullname": existing_user.fullname,
            "email": existing_user.email
        }
    }


async def register_user(db: Session, data):
    # check if user already exists
    existing_user = get_user_by_email(db, data.email)

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="User already exists"
        )

    # hash password with length validation
    # bcrypt only supports up to 72 bytes, so truncate if necessary
    password_bytes = data.password.encode('utf-8')
    if len(password_bytes) > 72:
        # Truncate to 72 bytes and decode back to string
        truncated_password = password_bytes[:72].decode('utf-8', errors='ignore')
        try:
            hashed_password = bcrypt.hash(truncated_password)
        except Exception as e:
            # Fallback to simple hashing if bcrypt fails
            import hashlib
            hashed_password = hashlib.sha256(truncated_password.encode()).hexdigest()
    else:
        try:
            hashed_password = bcrypt.hash(data.password)
        except Exception as e:
            # Fallback to simple hashing if bcrypt fails
            import hashlib
            hashed_password = hashlib.sha256(data.password.encode()).hexdigest()

    # create user with is_verified=False
    new_user = User(
        fullname=data.fullname,
        email=data.email,
        password=hashed_password,
        is_verified=False
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # Generate verification token
    verification_token = jwt.encode(
        {
            "sub": new_user.email,
            "exp": datetime.utcnow() + timedelta(hours=24)
        },
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    # Send verification email
    try:
        await send_verification_email(new_user.email, verification_token)
    except Exception as e:
        logger.error(f"Failed to send verification email during registration for {new_user.email}: {str(e)}")
        # Don't fail registration if email fails - user can resend later
        pass

    return {
        "message": "Registration successful. Please check your email to verify your account.",
        "user": {
            "id": new_user.id,
            "fullname": new_user.fullname,
            "email": new_user.email
        }
    }

async def forgot_password(db: Session, data):
    user = get_user_by_email(db, data.email)

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    reset_token = jwt.encode(
        {
            "sub": user.email,
            "exp": datetime.utcnow() + timedelta(minutes=30)
        },
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    try:
        await send_reset_email(user.email, reset_token)
    except Exception as e:
        logger.error(f"Failed to send reset email for {user.email}: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Failed to send password reset email. Please try again later."
        )

    return {
        "message": "Password reset email sent successfully"
    }


def reset_password(db: Session, data):
    try:
        payload = jwt.decode(
            data.token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        email = payload.get("sub")

    except:
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

    # hash password with length validation
    # bcrypt only supports up to 72 bytes, so truncate if necessary
    password_bytes = data.new_password.encode('utf-8')
    if len(password_bytes) > 72:
        # Truncate to 72 bytes and decode back to string
        truncated_password = password_bytes[:72].decode('utf-8', errors='ignore')
        try:
            user.password = bcrypt.hash(truncated_password)
        except Exception as e:
            # Fallback to simple hashing if bcrypt fails
            import hashlib
            user.password = hashlib.sha256(truncated_password.encode()).hexdigest()
    else:
        try:
            user.password = bcrypt.hash(data.new_password)
        except Exception as e:
            # Fallback to simple hashing if bcrypt fails
            import hashlib
            user.password = hashlib.sha256(data.new_password.encode()).hexdigest()

    db.commit()

    return {
        "message": "Password reset successfully"
    }