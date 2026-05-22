from sqlalchemy import Column, Integer, String, DateTime, Enum, ForeignKey, false
from sqlalchemy.sql import func
from app.core.database import Base

class QueryLog(Base):
    __tablename__ = "QueryLogs"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    query = Column(String)
    tokens_used = Column(Integer, default=0)
    response_time_ms = Column(Integer)
    created_at = Column(DateTime(timezone=True), server_default=func.now())