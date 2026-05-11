from sqlalchemy import create_engine, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql://postgres:ghazaldb1@localhost:5432/contextcore_db"

engine = create_engine(DATABASE_URL)

# Create all tables defined in models
Base = declarative_base()
Base.metadata.create_all(bind=engine)

# Add missing columns if they don't exist
with engine.connect() as conn:
    try:
        # Check if is_verified column exists
        result = conn.execute(text("SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='is_verified'"))
        if not result.fetchone():
            # Add is_verified column
            conn.execute(text("ALTER TABLE users ADD COLUMN is_verified BOOLEAN DEFAULT FALSE"))
            conn.commit()
    except Exception as e:
        # Ignore errors - column might already exist or other issues
        pass

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()