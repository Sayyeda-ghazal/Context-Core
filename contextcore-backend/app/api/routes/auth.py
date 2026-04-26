from fastapi import APIRouter, HTTPException
from app.schemas.auth import LoginRequest
from app.services.auth_services import login_user


router = APIRouter()

@router.post("/login")
def login( data: LoginRequest):
    return login_user(data)