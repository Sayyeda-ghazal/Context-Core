from app.models.documents import Document

def get_recent_documents(db, user_id):
    docs = db.query(Document).filter(
        Document.user_id == user_id
    ).order_by(Document.created_at.desc()).limit(5).all()
    return docs
