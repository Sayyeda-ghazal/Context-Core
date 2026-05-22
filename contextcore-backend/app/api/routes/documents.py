from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from core.database import get_db
from app.models.user import User
from app.services.document_service import get_recent_documents
from app.core.security import get_current_user

router = APIRouter(prefix="/document", tags=["Document"])

@router.get("/recent")
def recent_documents(db: Session= Depends(get_db), current_user: User = Depends(get_current_user)):
    return get_recent_documents(db=db, user_id=current_user.id)