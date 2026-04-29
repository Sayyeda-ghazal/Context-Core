from fastapi import HTTPException
from jose import jwt
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from passlib.hash import bcrypt
from app.repositories.user_repository import get_user_by_email
from app.models.user import User
from app.services.email_service import send_reset_email


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


def register_user(db: Session, data):
    # check if user already exists
    existing_user = get_user_by_email(db, data.email)

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="User already exists"
        )

    # hash password
    hashed_password = bcrypt.hash(data.password)

    # create user
    new_user = User(
        fullname=data.fullname,
        email=data.email,
        password=hashed_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

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

    await send_reset_email(user.email, reset_token)

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

    user.password = bcrypt.hash(data.new_password)

    db.commit()

    return {
        "message": "Password reset successfully"
    }