from fastapi import FastAPI
from app.api.routes import auth, dashboard
from fastapi.middleware.cors import CORSMiddleware
from app.core.database import engine, Base


app = FastAPI()

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
app.include_router(dashboard.router, prefix="/api", tags=["Dashboard"])
