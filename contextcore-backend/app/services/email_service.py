from fastapi_mail import FastMail, MessageSchema
from app.core.email import conf


async def send_reset_email(email: str, token: str):
    reset_link = f"http://localhost:5173/reset-password?token={token}"

    message = MessageSchema(
        subject="Reset Your Password",
        recipients=[email],
        body=f"""
        Click the link below to reset your password:

        {reset_link}

        This link expires in 30 minutes.
        """,
        subtype="plain"
    )

    fm = FastMail(conf)
    await fm.send_message(message)