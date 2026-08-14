import gradio as gr
from app.main import app
from app.core.database import async_session
from app.models.tutorial import Tutorial
from app.models.video import Video
from app.models.forum import ForumThread, ForumReply
from app.models.contact import ContactSubmission, NewsletterSubscriber
from app.models.visit import Visit
from sqlalchemy import select, func
from datetime import datetime, timedelta, timezone


async def get_health():
    return {"status": "healthy", "service": "diy-smart-home-robotics-api"}


async def list_tutorials(category="", difficulty=""):
    async with async_session() as db:
        query = select(Tutorial).where(Tutorial.is_published == True)
        if category:
            query = query.join(Tutorial.category).where(Tutorial.category.has(slug=category))
        if difficulty:
            query = query.where(Tutorial.difficulty == difficulty)
        query = query.order_by(Tutorial.created_at.desc()).limit(20)
        result = await db.execute(query)
        tutorials = result.scalars().all()
        if not tutorials:
            return "No tutorials found."
        lines = []
        for t in tutorials:
            lines.append(f"**{t.title}** ({t.difficulty})\n{t.description}\n---")
        return "\n\n".join(lines)


async def get_tutorial(slug):
    if not slug:
        return "Enter a tutorial slug."
    async with async_session() as db:
        result = await db.execute(select(Tutorial).where(Tutorial.slug == slug))
        t = result.scalar_one_or_none()
        if not t:
            return "Tutorial not found."
        return f"# {t.title}\n\n**Difficulty:** {t.difficulty}\n**Time:** {t.time_estimate or 'N/A'}\n**Cost:** {t.cost_estimate or 'N/A'}\n\n{t.content}"


async def list_videos(category=""):
    async with async_session() as db:
        query = select(Video).where(Video.is_published == True)
        if category:
            query = query.join(Video.category).where(Video.category.has(slug=category))
        query = query.order_by(Video.created_at.desc()).limit(20)
        result = await db.execute(query)
        videos = result.scalars().all()
        if not videos:
            return "No videos found."
        lines = []
        for v in videos:
            lines.append(f"**{v.title}**\n{v.description or ''}\nYouTube: {v.youtube_url}\n---")
        return "\n\n".join(lines)


async def list_forum_threads(category="All", search=""):
    async with async_session() as db:
        query = select(ForumThread).order_by(ForumThread.is_pinned.desc(), ForumThread.created_at.desc())
        if category and category != "All":
            query = query.where(ForumThread.category == category)
        if search:
            query = query.where(ForumThread.title.ilike(f"%{search}%"))
        query = query.limit(20)
        result = await db.execute(query)
        threads = result.scalars().all()
        if not threads:
            return "No forum threads found."
        lines = []
        for t in threads:
            pin = "[PINNED] " if t.is_pinned else ""
            lines.append(f"{pin}**{t.title}** (by user #{t.author_id})\nCategory: {t.category or 'General'} | Upvotes: {t.upvotes} | Views: {t.view_count}\n{t.content[:200]}...\n---")
        return "\n\n".join(lines)


async def submit_contact(name, email, subject, message):
    if not name or not email or not subject or not message:
        return "All fields are required."
    async with async_session() as db:
        submission = ContactSubmission(name=name, email=email, subject=subject, message=message)
        db.add(submission)
        await db.commit()
        return "Contact form submitted successfully!"


async def subscribe_newsletter(email):
    if not email:
        return "Email is required."
    async with async_session() as db:
        existing = await db.execute(select(NewsletterSubscriber).where(NewsletterSubscriber.email == email))
        if existing.scalar_one_or_none():
            return "Already subscribed!"
        subscriber = NewsletterSubscriber(email=email)
        db.add(subscriber)
        await db.commit()
        return "Subscribed successfully!"


async def get_visit_stats():
    async with async_session() as db:
        now = datetime.now(timezone.utc)
        today_start = now.replace(hour=0, minute=0, second=0, microsecond=0)
        week_start = today_start - timedelta(days=7)
        month_start = today_start - timedelta(days=30)

        total = (await db.execute(select(func.count(Visit.id)))).scalar() or 0
        today = (await db.execute(select(func.count(Visit.id)).where(Visit.created_at >= today_start))).scalar() or 0
        week = (await db.execute(select(func.count(Visit.id)).where(Visit.created_at >= week_start))).scalar() or 0
        month = (await db.execute(select(func.count(Visit.id)).where(Visit.created_at >= month_start))).scalar() or 0

        return f"**Visit Statistics**\n\nTotal visits: {total}\nToday: {today}\nThis week: {week}\nThis month: {month}"


with gr.Blocks(title="DIY Smart Home Robotics API", theme=gr.themes.Soft()) as demo:
    gr.Markdown("# DIY Smart Home Robotics API")
    gr.Markdown("Backend API for the DIY Smart Home Robotics community")

    with gr.Tab("Health"):
        health_btn = gr.Button("Check Health")
        health_output = gr.JSON()
        health_btn.click(fn=get_health, outputs=health_output)

    with gr.Tab("Tutorials"):
        gr.Markdown("### Browse Tutorials")
        tut_category = gr.Textbox(label="Category (optional)")
        tut_difficulty = gr.Textbox(label="Difficulty (optional)")
        tut_list_btn = gr.Button("List Tutorials")
        tut_list_output = gr.Markdown()
        tut_list_btn.click(fn=list_tutorials, inputs=[tut_category, tut_difficulty], outputs=tut_list_output)

        gr.Markdown("### Get Tutorial by Slug")
        tut_slug = gr.Textbox(label="Tutorial Slug")
        tut_get_btn = gr.Button("Get Tutorial")
        tut_get_output = gr.Markdown()
        tut_get_btn.click(fn=get_tutorial, inputs=tut_slug, outputs=tut_get_output)

    with gr.Tab("Videos"):
        gr.Markdown("### Browse Videos")
        vid_category = gr.Textbox(label="Category (optional)")
        vid_list_btn = gr.Button("List Videos")
        vid_list_output = gr.Markdown()
        vid_list_btn.click(fn=list_videos, inputs=vid_category, outputs=vid_list_output)

    with gr.Tab("Forum"):
        gr.Markdown("### Forum Threads")
        forum_category = gr.Dropdown(choices=["All", "General", "Projects", "Help", "Showcase"], value="All", label="Category")
        forum_search = gr.Textbox(label="Search")
        forum_list_btn = gr.Button("List Threads")
        forum_list_output = gr.Markdown()
        forum_list_btn.click(fn=list_forum_threads, inputs=[forum_category, forum_search], outputs=forum_list_output)

    with gr.Tab("Contact"):
        gr.Markdown("### Contact Us")
        contact_name = gr.Textbox(label="Name")
        contact_email = gr.Textbox(label="Email")
        contact_subject = gr.Textbox(label="Subject")
        contact_message = gr.Textbox(label="Message", lines=4)
        contact_btn = gr.Button("Submit")
        contact_output = gr.Textbox(label="Result")
        contact_btn.click(fn=submit_contact, inputs=[contact_name, contact_email, contact_subject, contact_message], outputs=contact_output)

    with gr.Tab("Newsletter"):
        gr.Markdown("### Subscribe to Newsletter")
        nl_email = gr.Textbox(label="Email")
        nl_btn = gr.Button("Subscribe")
        nl_output = gr.Textbox(label="Result")
        nl_btn.click(fn=subscribe_newsletter, inputs=nl_email, outputs=nl_output)

    with gr.Tab("Analytics"):
        stats_btn = gr.Button("Get Visit Stats")
        stats_output = gr.Markdown()
        stats_btn.click(fn=get_visit_stats, outputs=stats_output)


app = gr.mount_gradio_app(app, demo, path="/gradio")
