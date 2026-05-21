from fastapi import FastAPI
from routers.auth_routers import router as auth_router
from fastapi.middleware.cors import CORSMiddleware
from database.database import Base, engine
from models.user_model import User

app=FastAPI()
Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],    
    allow_credentials=True
)

app.include_router(auth_router)
@app.get("/")
async def root():
    return {"message": "BFF Running"}