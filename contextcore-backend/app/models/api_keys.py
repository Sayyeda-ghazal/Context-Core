from sqlalchemy import Boolean, Column, Integer, String, DateTime, Enum, ForeignKey, false
from sqlalchemy.sql import func
from app.core.database import Base

class APIKEYS(Base):
    __tablename__ = "api_keys"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    key_hash = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    last_used_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())