import json
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import get_settings
from app.core.database import engine, Base
from app.routes import tutorials, videos, forum, auth, contact, visits

settings = get_settings()

def parse_origins(raw: str) -> list[str]:
    try:
        return json.loads(raw)
    except json.JSONDecodeError:
        return [o.strip().strip('"') for o in raw.split(",")]

@asynccontextmanager
async def lifespan(app: FastAPI):
    yield

app = FastAPI(
    title="DIY Smart Home Robotics API",
    description="Backend API for DIY Smart Home Robotics community",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=parse_origins(settings.CORS_ORIGINS),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tutorials.router)
app.include_router(videos.router)
app.include_router(forum.router)
app.include_router(auth.router)
app.include_router(contact.router)
app.include_router(visits.router)

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "service": "diy-smart-home-robotics-api"}
