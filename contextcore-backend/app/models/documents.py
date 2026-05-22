from sqlalchemy import Column, Integer, String, DateTime, Enum, ForeignKey, false
from sqlalchemy.sql import func
import enum
from app.core.database import Base


class DocumentStatus(str, enum.Enum):
    READY = "Ready"
    PROCESSING = "Processing"
    FAILED = "Failed"

class Document(Base):
    __tablename__ = "documents"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    filename = Column(String, nullable=False)
    status = Column(Enum(DocumentStatus), default=DocumentStatus.PROCESSING)
    created_at = Column(DateTime(timezone=True), server_default=func.now())