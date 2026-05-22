from sqlalchemy import Boolean, Column, Integer, String, DateTime, Enum, ForeignKey, false
from sqlalchemy.sql import func
from app.core.database import Base


class Subscription(Base):
    __tablename__ = "subscriptions"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    plan_name = Column(String)
    query_limit = Column(Integer, default=10000)
    token_limit = Column(Integer, default=100000)
    is_active = Column(Boolean, default=True)