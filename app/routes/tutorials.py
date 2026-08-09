from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from typing import Optional
from app.core.database import get_db
from app.models.tutorial import Tutorial
from app.schemas.tutorial import TutorialCreate, TutorialResponse, TutorialListResponse
from app.core.auth import get_current_user
from app.models.user import User

router = APIRouter(prefix="/api/tutorials", tags=["tutorials"])

@router.get("", response_model=list[TutorialListResponse])
async def list_tutorials(
    category: Optional[str] = None,
    difficulty: Optional[str] = None,
    featured: Optional[bool] = None,
    page: int = Query(1, ge=1),
    limit: int = Query(12, ge=1, le=50),
    db: AsyncSession = Depends(get_db)
):
    query = select(Tutorial).where(Tutorial.is_published == True)
    if category:
        query = query.join(Tutorial.category).where(Tutorial.category.has(slug=category))
    if difficulty:
        query = query.where(Tutorial.difficulty == difficulty)
    if featured is not None:
        query = query.where(Tutorial.is_featured == featured)
    query = query.order_by(Tutorial.created_at.desc())
    query = query.offset((page - 1) * limit).limit(limit)
    result = await db.execute(query)
    return result.scalars().all()

@router.get("/{slug}", response_model=TutorialResponse)
async def get_tutorial(slug: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Tutorial).where(Tutorial.slug == slug))
    tutorial = result.scalar_one_or_none()
    if not tutorial:
        raise HTTPException(status_code=404, detail="Tutorial not found")
    tutorial.view_count += 1
    await db.commit()
    return tutorial

@router.post("", response_model=TutorialResponse)
async def create_tutorial(
    tutorial: TutorialCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Admin access required")
    db_tutorial = Tutorial(**tutorial.model_dump(), is_published=True)
    db.add(db_tutorial)
    await db.commit()
    await db.refresh(db_tutorial)
    return db_tutorial
