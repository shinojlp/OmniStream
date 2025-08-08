from fastapi import FastAPI
from pydantic import BaseModel,conlist
from typing import List,Optional,Any
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware
from core.config import settings;
from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient
#from contextlib import asynccontextmanager
from model.users import User
from api.router import router

app = FastAPI()
@app.on_event("startup")
async def app_init():
    """
        initialize crucial application services
    """
    
    db_client = AsyncIOMotorClient(settings.MONGO_CONNECTION_STRING).moviedb
    
    await init_beanie(
        database=db_client,
         document_models= [
            User
        ]
    )
    
    
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"health_check": "OK"}

app.include_router(router,prefix=settings.API_V1_STR)