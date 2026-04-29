from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.auth import ForgotPasswordRequest,ResetPasswordRequest
from app.schemas.auth import LoginRequest, RegisterRequest
from app.services.auth_services import login_user, register_user, forgot_password, reset_password
from app.core.database import get_db


router = APIRouter()


@router.post("/login")
def login(data: LoginRequest,db: Session = Depends(get_db)):
    return login_user(db, data)


@router.post("/register")
def register(data: RegisterRequest, db: Session = Depends(get_db)):
    result = register_user(db, data)

    return {
        "message": "User created successfully",
        "user": {
            "id": result.id,
            "fullname": result.fullname,
            "email": result.email
        }
    }

@router.post("/forgot-password")
async def forgot_password_route(data: ForgotPasswordRequest,db: Session = Depends(get_db)):
    return await forgot_password(db, data)


@router.post("/reset-password")
def reset_password_route(data: ResetPasswordRequest,db: Session = Depends(get_db)):
    return reset_password(db, data)