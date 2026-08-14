import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import asyncio
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.core.config import get_settings
from app.models.newsletter import NewsletterSubscriber
from app.models.contact import ContactSubmission
from app.schemas.contact import ContactForm, NewsletterForm

router = APIRouter(prefix="/api", tags=["contact"])
settings = get_settings()

def _send_email(name: str, email: str, subject: str, message: str):
    msg = MIMEMultipart()
    msg["From"] = settings.SMTP_USER
    msg["To"] = settings.SMTP_USER
    msg["Reply-To"] = email
    msg["Subject"] = f"Contact Form: {subject}"

    body = f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}"
    msg.attach(MIMEText(body, "plain"))

    context = ssl.create_default_context()
    with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT) as server:
        server.starttls(context=context)
        server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
        server.sendmail(settings.SMTP_USER, settings.SMTP_USER, msg.as_string())

@router.post("/contact")
async def submit_contact(form: ContactForm, db: AsyncSession = Depends(get_db)):
    submission = ContactSubmission(
        name=form.name,
        email=form.email,
        subject=form.subject,
        message=form.message
    )
    db.add(submission)
    await db.commit()

    if settings.SMTP_HOST and settings.SMTP_USER:
        try:
            await asyncio.to_thread(_send_email, form.name, form.email, form.subject, form.message)
        except Exception:
            pass

    return {"message": "Contact form submitted successfully"}

@router.post("/newsletter")
async def subscribe_newsletter(form: NewsletterForm, db: AsyncSession = Depends(get_db)):
    existing = await db.execute(
        select(NewsletterSubscriber).where(NewsletterSubscriber.email == form.email)
    )
    if existing.scalar_one_or_none():
        return {"message": "Already subscribed"}
    subscriber = NewsletterSubscriber(email=form.email)
    db.add(subscriber)
    await db.commit()
    return {"message": "Subscribed successfully"}
