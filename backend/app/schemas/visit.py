from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class VisitCreate(BaseModel):
    path: str
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None
    referer: Optional[str] = None


class VisitResponse(BaseModel):
    id: int
    path: str
    created_at: datetime

    class Config:
        from_attributes = True


class VisitStats(BaseModel):
    total_visits: int
    today_visits: int
    week_visits: int
    month_visits: int
    unique_ips_today: int
    unique_ips_week: int
    popular_pages: list[dict]
    visits_by_day: list[dict]
