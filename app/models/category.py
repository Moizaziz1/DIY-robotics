from sqlalchemy import Column, Integer, String, DateTime, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base

class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False)
    slug = Column(String(100), unique=True, index=True, nullable=False)
    description = Column(Text)
    icon = Column(String(50))
    color = Column(String(20))
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    tutorials = relationship("Tutorial", back_populates="category")
    videos = relationship("Video", back_populates="category")
