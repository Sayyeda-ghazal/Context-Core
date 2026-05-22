import os
import sys
import argparse
import secrets
from datetime import datetime, timedelta
from random import randint, random, choice

from sqlalchemy.orm import Session

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)

from app.core.database import SessionLocal
from app.models.user import User
from app.models.subscriptions import Subscription
from app.models.api_keys import APIKEYS
from app.models.documents import Document, DocumentStatus
from app.models.query_logs import QueryLog
from app.services.auth_services import hash_password


def get_or_create_user(db: Session, email: str, fullname: str, password: str) -> User:
    user = db.query(User).filter(User.email == email).first()
    if user:
        return user

    user = User(
        fullname=fullname,
        email=email,
        password=hash_password(password),
        is_verified=True,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def ensure_subscription(db: Session, user_id: int) -> Subscription:
    sub = (
        db.query(Subscription)
        .filter(Subscription.user_id == user_id, Subscription.is_active == True)  # noqa: E712
        .first()
    )
    if sub:
        return sub
    sub = Subscription(
        user_id=user_id,
        plan_name="pro",
        query_limit=10000,
        token_limit=100000,
        is_active=True,
    )
    db.add(sub)
    db.commit()
    db.refresh(sub)
    return sub


def seed_api_keys(db: Session, user_id: int, count: int) -> None:
    existing = db.query(APIKEYS).filter(APIKEYS.user_id == user_id).count()
    for i in range(max(0, count - existing)):
        key = APIKEYS(
            user_id=user_id,
            key_hash=secrets.token_hex(24),
            is_active=True if i % 2 == 0 else choice([True, False]),
            last_used_at=datetime.utcnow() - timedelta(days=randint(0, 14)),
        )
        db.add(key)
    db.commit()


def seed_documents(db: Session, user_id: int, count: int) -> None:
    existing = db.query(Document).filter(Document.user_id == user_id).count()
    statuses = [DocumentStatus.READY, DocumentStatus.PROCESSING, DocumentStatus.FAILED]
    for i in range(max(0, count - existing)):
        created_at = datetime.utcnow() - timedelta(days=randint(0, 20), hours=randint(0, 23))
        doc = Document(
            user_id=user_id,
            filename=f"sample_document_{existing + i + 1}.pdf",
            status=choice(statuses),
            created_at=created_at,
        )
        db.add(doc)
    db.commit()


def seed_query_logs(db: Session, user_id: int, days: int, avg_per_day: int) -> None:
    now = datetime.utcnow()
    start = now - timedelta(days=days)

    # Only add if user has little/no data to avoid duplicating endlessly
    existing_recent = (
        db.query(QueryLog)
        .filter(QueryLog.user_id == user_id, QueryLog.created_at >= start)
        .count()
    )
    if existing_recent >= days * max(1, avg_per_day // 2):
        return

    for day_offset in range(days):
        day = now - timedelta(days=day_offset)
        n = max(0, int(avg_per_day + randint(-avg_per_day // 2, avg_per_day // 2)))
        for _ in range(n):
            created_at = datetime(
                year=day.year,
                month=day.month,
                day=day.day,
                hour=randint(0, 23),
                minute=randint(0, 59),
                second=randint(0, 59),
            )
            q = QueryLog(
                user_id=user_id,
                query=choice(
                    [
                        "Summarize this document",
                        "Extract key points",
                        "Answer questions from PDF",
                        "Find action items",
                        "Generate a dashboard report",
                    ]
                ),
                tokens_used=randint(50, 1200),
                response_time_ms=randint(120, 3500),
                created_at=created_at,
            )
            db.add(q)
    db.commit()


def reset_user_data(db: Session, user_id: int) -> None:
    db.query(QueryLog).filter(QueryLog.user_id == user_id).delete(synchronize_session=False)
    db.query(Document).filter(Document.user_id == user_id).delete(synchronize_session=False)
    db.query(APIKEYS).filter(APIKEYS.user_id == user_id).delete(synchronize_session=False)
    db.query(Subscription).filter(Subscription.user_id == user_id).delete(synchronize_session=False)
    db.commit()


def main() -> int:
    parser = argparse.ArgumentParser(description="Seed dummy data for the dashboard.")
    parser.add_argument("--email", default="demo@contextcore.com")
    parser.add_argument("--password", default="demo12345")
    parser.add_argument("--fullname", default="Demo User")
    parser.add_argument("--documents", type=int, default=12)
    parser.add_argument("--api-keys", type=int, default=2)
    parser.add_argument("--days", type=int, default=30)
    parser.add_argument("--avg-queries-per-day", type=int, default=6)
    parser.add_argument(
        "--reset-user-data",
        action="store_true",
        help="Delete existing rows for this user before seeding.",
    )
    args = parser.parse_args()

    db = SessionLocal()
    try:
        user = get_or_create_user(db, args.email, args.fullname, args.password)
        if args.reset_user_data:
            reset_user_data(db, user.id)

        ensure_subscription(db, user.id)
        seed_api_keys(db, user.id, args.api_keys)
        seed_documents(db, user.id, args.documents)
        seed_query_logs(db, user.id, args.days, args.avg_queries_per_day)

        print("Seed complete.")
        print(f"Login: {user.email} / {args.password}")
        return 0
    finally:
        db.close()


if __name__ == "__main__":
    raise SystemExit(main())
