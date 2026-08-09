from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import Optional
from app.core.database import get_db
from app.models.video import Video
from app.schemas.video import VideoCreate, VideoResponse

router = APIRouter(prefix="/api/videos", tags=["videos"])

@router.get("", response_model=list[VideoResponse])
async def list_videos(
    category: Optional[str] = None,
    page: int = Query(1, ge=1),
    limit: int = Query(12, ge=1, le=50),
    db: AsyncSession = Depends(get_db)
):
    query = select(Video).where(Video.is_published == True)
    if category:
        query = query.join(Video.category).where(Video.category.has(slug=category))
    query = query.order_by(Video.created_at.desc())
    query = query.offset((page - 1) * limit).limit(limit)
    result = await db.execute(query)
    return result.scalars().all()

@router.get("/{slug}", response_model=VideoResponse)
async def get_video(slug: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Video).where(Video.slug == slug))
    video = result.scalar_one_or_none()
    if not video:
        raise HTTPException(status_code=404, detail="Video not found")
    video.view_count += 1
    await db.commit()
    return video

@router.post("", response_model=VideoResponse)
async def create_video(video: VideoCreate, db: AsyncSession = Depends(get_db)):
    db_video = Video(**video.model_dump(), is_published=True)
    db.add(db_video)
    await db.commit()
    await db.refresh(db_video)
    return db_video
