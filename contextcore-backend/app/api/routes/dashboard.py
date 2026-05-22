from fastapi import Depends, APIRouter
from sqlalchemy.orm import Session
from app.models.user import User
from app.core.database import get_db
from app.services.dashboard_service import get_dashboard_overview, get_query_chart, get_dashboard_home
from app.core.security import get_current_user

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/overview")
def dashboard_overview(db: Session=Depends(get_db), current_user: User=Depends(get_current_user)):
    stats = get_dashboard_overview(db, current_user.id)
    chart = get_query_chart(db, current_user.id)

    return {
        "stats": stats,
        "chart": chart
    }

@router.get("/home")
def dashboard_home(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):

    return get_dashboard_home(
        db=db,
        user_id=current_user.id
    )