from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class VideoBase(BaseModel):
    title: str
    slug: str
    description: Optional[str] = None
    youtube_url: str
    thumbnail_url: Optional[str] = None
    transcript: Optional[str] = None
    category_id: Optional[int] = None
    duration: Optional[str] = None

class VideoCreate(VideoBase):
    pass

class VideoResponse(VideoBase):
    id: int
    view_count: int = 0
    is_published: bool = False
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
