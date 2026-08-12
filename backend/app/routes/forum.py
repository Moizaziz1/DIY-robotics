from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from sqlalchemy.orm import selectinload
from typing import Optional
from app.core.database import get_db
from app.models.forum import ForumThread, ForumReply
from app.models.user import User
from app.schemas.forum import (
    ForumThreadCreate, ForumThreadResponse, ForumThreadListResponse,
    ForumReplyCreate, ForumReplyResponse
)
from app.core.auth import get_current_user, get_optional_user

router = APIRouter(prefix="/api/forum", tags=["forum"])


@router.get("/threads", response_model=list[ForumThreadListResponse])
async def list_threads(
    category: Optional[str] = None,
    search: Optional[str] = None,
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=50),
    db: AsyncSession = Depends(get_db)
):
    query = select(ForumThread).options(
        selectinload(ForumThread.author),
        selectinload(ForumThread.replies)
    )
    if category and category != "All":
        query = query.where(ForumThread.category_id == int(category)) if category.isdigit() else query
    if search:
        query = query.where(ForumThread.title.ilike(f"%{search}%"))
    query = query.order_by(ForumThread.is_pinned.desc(), ForumThread.created_at.desc())
    query = query.offset((page - 1) * limit).limit(limit)
    result = await db.execute(query)
    threads = result.scalars().unique().all()
    return threads


@router.get("/threads/{thread_id}", response_model=ForumThreadResponse)
async def get_thread(thread_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(ForumThread)
        .options(selectinload(ForumThread.author), selectinload(ForumThread.replies).selectinload(ForumReply.author))
        .where(ForumThread.id == thread_id)
    )
    thread = result.scalar_one_or_none()
    if not thread:
        raise HTTPException(status_code=404, detail="Thread not found")
    thread.view_count += 1
    await db.commit()
    return thread


@router.post("/threads", response_model=ForumThreadResponse)
async def create_thread(
    thread: ForumThreadCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_thread = ForumThread(
        title=thread.title,
        content=thread.content,
        category=thread.category,
        tags=thread.tags,
        author_id=current_user.id
    )
    db.add(db_thread)
    await db.commit()
    await db.refresh(db_thread, ["author"])
    return db_thread


@router.get("/threads/{thread_id}/replies", response_model=list[ForumReplyResponse])
async def list_replies(
    thread_id: int,
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(ForumReply)
        .options(selectinload(ForumReply.author))
        .where(ForumReply.thread_id == thread_id)
        .order_by(ForumReply.created_at.asc())
    )
    return result.scalars().unique().all()


@router.post("/threads/{thread_id}/replies", response_model=ForumReplyResponse)
async def create_reply(
    thread_id: int,
    reply: ForumReplyCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Check thread exists
    thread = await db.scalar(select(ForumThread).where(ForumThread.id == thread_id))
    if not thread:
        raise HTTPException(status_code=404, detail="Thread not found")
    if thread.is_locked:
        raise HTTPException(status_code=403, detail="Thread is locked")

    db_reply = ForumReply(
        content=reply.content,
        thread_id=thread_id,
        author_id=current_user.id,
        parent_reply_id=reply.parent_reply_id
    )
    db.add(db_reply)
    await db.commit()
    await db.refresh(db_reply, ["author"])
    return db_reply


@router.post("/threads/{thread_id}/upvote")
async def upvote_thread(
    thread_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    thread = await db.scalar(select(ForumThread).where(ForumThread.id == thread_id))
    if not thread:
        raise HTTPException(status_code=404, detail="Thread not found")
    thread.upvotes += 1
    await db.commit()
    return {"upvotes": thread.upvotes}
