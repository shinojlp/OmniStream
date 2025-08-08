from schemas.user_schema import UserAuth, Email
from core.security import get_password,verify_password
from typing import Optional
from typing import List
from model.users import User
from uuid import UUID
from fastapi import HTTPException
from schemas.user_schema import UserOut
from motor.motor_asyncio import AsyncIOMotorClient
from fastapi import HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
from core.config import settings
from schemas.movie_schema import Movie
from schemas.series_schema import Series
from fastapi import APIRouter, HTTPException, status
import random
import string

class UserService:
  @staticmethod
  async def create_user(user: UserAuth):
    user_in = User(
      email=user.email,
      hashed_password=get_password(user.password),
    )
    await user_in.save()
    return user_in
  
  @staticmethod
  async def add_movies_to_watchlist(data: Movie,current_user=User) -> User:
    user = await User.find_one(current_user.id == User.id)
    user.watchlist = current_user.watchlist or []
    user.watchlist.append(data)
    await user.save()
    return user
  
  @staticmethod
  async def add_series_to_watchlist(data: Series,current_user=User) -> User:
    user = await User.find_one(current_user.id == User.id)
    user.series_watchlist = current_user.series_watchlist or []
    user.series_watchlist.append(data)
    await user.save()
    return user
    

  @staticmethod
  async def authenticate(email: str, password: str) -> Optional[User]:
    user = await UserService.get_user_by_email(email=email)
    if not user:
        return None
    if not verify_password(password=password, hashed_pass=user.hashed_password):
        return None
    return user

  @staticmethod
  async def get_user_by_email(email: str) -> Optional[User]:
    try:
      user = await User.find_one(User.email == email)
      if user:
        return user
      if not user:
        return None
    except Exception as e: 
      return {"message": e}
      
  
  @staticmethod
  async def get_user_by_id(id: str) -> Optional[User]:
    user = await User.find_one(User.user_id == id)
    return user
  


  