import asyncio
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy import select
from app.core.config import get_settings
from app.core.database import Base
from app.core.auth import get_password_hash
from app.models.user import User
from app.models.visit import Visit
from app.models.contact import ContactSubmission
from app.models.newsletter import NewsletterSubscriber

settings = get_settings()
engine = create_async_engine(settings.DATABASE_URL, connect_args={"ssl": True})
async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

async def create_admin_user():
    # Create all tables first
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    username = "admin"
    email = "homerobotics515@gmail.com"
    password = "admin123"

    async with async_session() as db:
        existing = await db.execute(select(User).where(User.username == username))
        if existing.scalar_one_or_none():
            print(f"User '{username}' already exists.")
            return

        admin_user = User(
            username=username,
            email=email,
            hashed_password=get_password_hash(password),
            display_name="Admin",
            is_admin=True,
            is_active=True,
        )
        db.add(admin_user)
        await db.commit()
        print(f"Admin user created successfully!")
        print(f"  Username: {username}")
        print(f"  Password: {password}")

if __name__ == "__main__":
    asyncio.run(create_admin_user())
