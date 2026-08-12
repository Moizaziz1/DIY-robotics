from fastapi import APIRouter, Request, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, distinct
from datetime import datetime, timedelta, timezone
from app.core.database import get_db
from app.models.visit import Visit
from app.schemas.visit import VisitCreate, VisitStats

router = APIRouter(prefix="/api/visits", tags=["visits"])


@router.post("/track")
async def track_visit(visit: VisitCreate, request: Request, db: AsyncSession = Depends(get_db)):
    ip = visit.ip_address or request.client.host if request.client else None
    ua = request.headers.get("user-agent", "")
    ref = request.headers.get("referer", "")

    db_visit = Visit(
        path=visit.path,
        ip_address=ip,
        user_agent=visit.user_agent or ua,
        referer=visit.referer or ref,
    )
    db.add(db_visit)
    await db.commit()
    return {"status": "ok"}


@router.get("/stats", response_model=VisitStats)
async def get_visit_stats(db: AsyncSession = Depends(get_db)):
    now = datetime.now(timezone.utc)
    today_start = now.replace(hour=0, minute=0, second=0, microsecond=0)
    week_start = today_start - timedelta(days=now.weekday())
    month_start = today_start.replace(day=1)

    total = await db.scalar(select(func.count(Visit.id)))
    today = await db.scalar(
        select(func.count(Visit.id)).where(Visit.created_at >= today_start)
    )
    week = await db.scalar(
        select(func.count(Visit.id)).where(Visit.created_at >= week_start)
    )
    month = await db.scalar(
        select(func.count(Visit.id)).where(Visit.created_at >= month_start)
    )

    unique_today = await db.scalar(
        select(func.count(distinct(Visit.ip_address))).where(Visit.created_at >= today_start)
    )
    unique_week = await db.scalar(
        select(func.count(distinct(Visit.ip_address))).where(Visit.created_at >= week_start)
    )

    # Popular pages (last 30 days)
    thirty_days_ago = now - timedelta(days=30)
    popular_result = await db.execute(
        select(Visit.path, func.count(Visit.id).label("count"))
        .where(Visit.created_at >= thirty_days_ago)
        .group_by(Visit.path)
        .order_by(func.count(Visit.id).desc())
        .limit(10)
    )
    popular_pages = [{"path": row[0], "count": row[1]} for row in popular_result.all()]

    # Visits by day (last 7 days)
    seven_days_ago = now - timedelta(days=6)
    seven_days_ago_start = seven_days_ago.replace(hour=0, minute=0, second=0, microsecond=0)
    daily_result = await db.execute(
        select(
            func.date(Visit.created_at).label("date"),
            func.count(Visit.id).label("count"),
        )
        .where(Visit.created_at >= seven_days_ago_start)
        .group_by(func.date(Visit.created_at))
        .order_by(func.date(Visit.created_at))
    )
    visits_by_day = [{"date": str(row[0]), "count": row[1]} for row in daily_result.all()]

    return VisitStats(
        total_visits=total or 0,
        today_visits=today or 0,
        week_visits=week or 0,
        month_visits=month or 0,
        unique_ips_today=unique_today or 0,
        unique_ips_week=unique_week or 0,
        popular_pages=popular_pages,
        visits_by_day=visits_by_day,
    )


@router.get("/recent")
async def get_recent_visits(limit: int = 20, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Visit).order_by(Visit.created_at.desc()).limit(limit)
    )
    visits = result.scalars().all()
    return [
        {
            "id": v.id,
            "path": v.path,
            "ip_address": v.ip_address,
            "created_at": v.created_at.isoformat(),
        }
        for v in visits
    ]
