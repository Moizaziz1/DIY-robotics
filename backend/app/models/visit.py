from sqlalchemy import Column, Integer, String, DateTime, Text
from sqlalchemy.sql import func
from app.core.database import Base


class Visit(Base):
    __tablename__ = "visits"

    id = Column(Integer, primary_key=True, index=True)
    path = Column(String(500), nullable=False, index=True)
    ip_address = Column(String(45))
    user_agent = Column(Text)
    referer = Column(String(500))
    country = Column(String(100))
    created_at = Column(DateTime(timezone=True), server_default=func.now(), index=True)
