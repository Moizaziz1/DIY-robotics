from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class TutorialBase(BaseModel):
    title: str
    slug: str
    description: str
    content: str
    cover_image: Optional[str] = None
    category_id: Optional[int] = None
    difficulty: str
    time_estimate: Optional[str] = None
    cost_estimate: Optional[str] = None
    parts_list: Optional[str] = None
    video_url: Optional[str] = None
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None

class TutorialCreate(TutorialBase):
    pass

class TutorialResponse(TutorialBase):
    id: int
    view_count: int = 0
    is_published: bool = False
    is_featured: bool = False
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class TutorialListResponse(BaseModel):
    id: int
    title: str
    slug: str
    description: str
    cover_image: Optional[str] = None
    difficulty: str
    time_estimate: Optional[str] = None
    cost_estimate: Optional[str] = None
    is_featured: bool = False
    created_at: datetime

    class Config:
        from_attributes = True
