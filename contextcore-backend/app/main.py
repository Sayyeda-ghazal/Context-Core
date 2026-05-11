from fastapi import FastAPI
from app.api.routes import auth
from fastapi.middleware.cors import CORSMiddleware
from app.core.database import engine, Base
from app.models.user import User


app = FastAPI()

# Create all database tables
Base.metadata.create_all(bind=engine)

origins = [
    "http://localhost:5173",  # Vite frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])