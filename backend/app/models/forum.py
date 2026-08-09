from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base

class ForumThread(Base):
    __tablename__ = "forum_threads"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)
    author_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    category_id = Column(Integer, ForeignKey("categories.id"))
    is_pinned = Column(Boolean, default=False)
    is_locked = Column(Boolean, default=False)
    upvotes = Column(Integer, default=0)
    view_count = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    author = relationship("User", back_populates="forum_threads")
    replies = relationship("ForumReply", back_populates="thread", order_by="ForumReply.created_at")

    @property
    def reply_count(self):
        return len(self.replies) if self.replies else 0

class ForumReply(Base):
    __tablename__ = "forum_replies"

    id = Column(Integer, primary_key=True, index=True)
    content = Column(Text, nullable=False)
    thread_id = Column(Integer, ForeignKey("forum_threads.id"), nullable=False)
    author_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    parent_reply_id = Column(Integer, ForeignKey("forum_replies.id"))
    upvotes = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    thread = relationship("ForumThread", back_populates="replies")
    author = relationship("User", back_populates="forum_replies")
    parent_reply = relationship("ForumReply", remote_side="ForumReply.id")
