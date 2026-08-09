from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Boolean, Float
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base

class Tutorial(Base):
    __tablename__ = "tutorials"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    description = Column(Text, nullable=False)
    content = Column(Text, nullable=False)
    cover_image = Column(String(500))
    category_id = Column(Integer, ForeignKey("categories.id"))
    difficulty = Column(String(20), nullable=False)  # beginner, intermediate, advanced
    time_estimate = Column(String(50))
    cost_estimate = Column(String(50))
    parts_list = Column(Text)  # JSON array as text
    video_url = Column(String(500))
    view_count = Column(Integer, default=0)
    is_published = Column(Boolean, default=False)
    is_featured = Column(Boolean, default=False)
    meta_title = Column(String(255))
    meta_description = Column(String(500))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    category = relationship("Category", back_populates="tutorials")
    steps = relationship("TutorialStep", back_populates="tutorial", order_by="TutorialStep.order")
    comments = relationship("Comment", back_populates="tutorial")

class TutorialStep(Base):
    __tablename__ = "tutorial_steps"

    id = Column(Integer, primary_key=True, index=True)
    tutorial_id = Column(Integer, ForeignKey("tutorials.id"), nullable=False)
    order = Column(Integer, nullable=False)
    title = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)
    image_url = Column(String(500))
    code_snippet = Column(Text)

    tutorial = relationship("Tutorial", back_populates="steps")
