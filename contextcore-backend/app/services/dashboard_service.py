from sqlalchemy import func 
from datetime import  datetime, timedelta
from app.models.documents import Document, DocumentStatus
from app.models.query_logs import QueryLog
from app.models.api_keys import APIKEYS
from app.models.subscriptions import Subscription
from app.services.document_service import get_recent_documents


def get_dashboard_overview(db, user_id):
    total_documents = db.query(Document).filter(Document.user_id == user_id).count()
    processing_documents = db.query(Document).filter(Document.user_id == user_id, Document.status == DocumentStatus.PROCESSING).count()
    current_month = datetime.utcnow().month
    monthly_queries = db.query(QueryLog).filter(QueryLog.user_id == user_id, func.extract("month", QueryLog.created_at) == current_month).count()
    total_tokens = db.query(func.sum(QueryLog.tokens_used)).filter(QueryLog.user_id == user_id).scalar() or 0
    active_api_keys = db.query(APIKEYS).filter(APIKEYS.user_id == user_id, APIKEYS.is_active == True).count()
    subscription = db.query(Subscription).filter(Subscription.user_id == user_id, Subscription.is_active == True).first()

    if not subscription:
        subscription = Subscription(
            user_id=user_id,
            query_limit=100,
            plan_name="free"
        )
    db.add(subscription)
    db.commit()
    db.refresh(subscription)

    return {
        "total_documents": total_documents,
        "processing_documents": processing_documents,
        "monthly_queries": monthly_queries,
        "query_limit": subscription.query_limit,
        "tokens_used": total_tokens,
        "token_limit": subscription.token_limit,
        "active_api_keys": active_api_keys
    }

def get_query_chart(db, user_id):
    thirty_days_ago = datetime.utcnow() - timedelta(days=30)
    results = db.query(func.date(QueryLog.created_at), func.count(QueryLog.id)).filter(QueryLog.user_id == user_id, QueryLog.created_at>= thirty_days_ago).group_by(func.date(QueryLog.created_at)).all()
    
    return [
        {
            "date" : str(row[0]),
            "count" : row[1]
        }
        for row in results
    ]

def get_dashboard_home(db, user_id):

    return {
        "stats": get_dashboard_overview(db, user_id),
        "chart": get_query_chart(db, user_id),
        "recent_documents": get_recent_documents(db, user_id)
    }