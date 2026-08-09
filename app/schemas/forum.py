from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class ForumThreadBase(BaseModel):
    title: str
    content: str
    category_id: Optional[int] = None

class ForumThreadCreate(ForumThreadBase):
    pass

class ForumThreadResponse(ForumThreadBase):
    id: int
    author_id: int
    is_pinned: bool = False
    is_locked: bool = False
    upvotes: int = 0
    view_count: int = 0
    created_at: datetime
    updated_at: Optional[datetime] = None
    reply_count: int = 0

    class Config:
        from_attributes = True

class ForumReplyBase(BaseModel):
    content: str

class ForumReplyCreate(ForumReplyBase):
    parent_reply_id: Optional[int] = None

class ForumReplyResponse(ForumReplyBase):
    id: int
    thread_id: int
    author_id: int
    parent_reply_id: Optional[int] = None
    upvotes: int = 0
    created_at: datetime

    class Config:
        from_attributes = True
