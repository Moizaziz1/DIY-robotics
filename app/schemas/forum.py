from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class AuthorInfo(BaseModel):
    id: int
    username: str
    display_name: Optional[str] = None

    class Config:
        from_attributes = True


class ForumThreadBase(BaseModel):
    title: str
    content: str
    category: Optional[str] = None
    tags: Optional[str] = None


class ForumThreadCreate(ForumThreadBase):
    pass


class ForumThreadListResponse(BaseModel):
    id: int
    title: str
    content: str
    author: AuthorInfo
    category: Optional[str] = None
    tags: Optional[str] = None
    is_pinned: bool = False
    is_locked: bool = False
    upvotes: int = 0
    view_count: int = 0
    created_at: datetime
    reply_count: int = 0

    class Config:
        from_attributes = True


class ForumThreadResponse(BaseModel):
    id: int
    title: str
    content: str
    author: AuthorInfo
    category: Optional[str] = None
    tags: Optional[str] = None
    is_pinned: bool = False
    is_locked: bool = False
    upvotes: int = 0
    view_count: int = 0
    created_at: datetime
    updated_at: Optional[datetime] = None
    replies: list["ForumReplyResponse"] = []

    class Config:
        from_attributes = True


class ForumReplyBase(BaseModel):
    content: str


class ForumReplyCreate(ForumReplyBase):
    parent_reply_id: Optional[int] = None


class ForumReplyResponse(BaseModel):
    id: int
    thread_id: int
    content: str
    author: AuthorInfo
    parent_reply_id: Optional[int] = None
    upvotes: int = 0
    created_at: datetime

    class Config:
        from_attributes = True
