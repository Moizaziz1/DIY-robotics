from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base

class Video(Base):
    __tablename__ = "videos"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    description = Column(Text)
    youtube_url = Column(String(500), nullable=False)
    thumbnail_url = Column(String(500))
    transcript = Column(Text)
    category_id = Column(Integer, ForeignKey("categories.id"))
    duration = Column(String(20))
    is_published = Column(Boolean, default=False)
    view_count = Column(Integer, default=0)
    meta_title = Column(String(255))
    meta_description = Column(String(500))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    category = relationship("Category", back_populates="videos")
