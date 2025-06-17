from core.config import settings
import asyncio
import aiosmtplib
from email.message import EmailMessage
from fastapi import BackgroundTasks
from jinja2 import Environment, FileSystemLoader
from pathlib import Path
import logging

env = Environment(
    loader=FileSystemLoader(Path(__file__).parent / "templates"),
    autoescape=True
)

log = logging.getLogger(__name__)

async def send_email_async(
        email_to: str,
        template_data: dict,
        subject: str = 'Код подтверждения',
        template_name: str = 'verify.html'):

    template = env.get_template(template_name)
    link = settings.urls.base_front_link + 'verify/' + template_data['code']
    template_data = {
        'link': link
    }
    html_content = template.render(**template_data)
    
    message = EmailMessage()
    message["From"] = settings.smtp_data.from_email
    message["To"] = email_to
    message["Subject"] = subject
    message.add_alternative(html_content, subtype="html")
    
    await aiosmtplib.send(
        message,
        hostname=settings.smtp_data.smtp_host,
        port=settings.smtp_data.smtp_port,
        username=settings.smtp_data.smtp_user,
        password=settings.smtp_data.smtp_password,
        start_tls=True)
    log.warning('Sent message for user %r.', email_to)
    

    
