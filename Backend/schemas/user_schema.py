from typing import Optional , List
from uuid import UUID
from pydantic import BaseModel, EmailStr, Field
from schemas.movie_schema import Movie
from schemas.series_schema import Series
from datetime import datetime
class UserAuth(BaseModel):
    email: EmailStr = Field(..., description="user email")
    password: str = Field(..., min_length=5, max_length=24, description="user password")
    # watchlist: Optional[List[Movie]] = None

class UserOut(BaseModel):
    user_id: UUID
    # username: str
    email: EmailStr
    watchlist: Optional[List[Movie]] = None
    series_watchlist: Optional[List[Series]] = None


class UserValue(BaseModel):
    user_id: UUID
    # username: str
    email: EmailStr
    watchlist: Optional[List[Movie]] = None
    series_watchlist: Optional[List[Series]] = None
    resettoken: Optional[str] = None
    resettoken_expiration: Optional[datetime] = None

class Email(BaseModel):
    email:str

class ResetPasswordConfirm(BaseModel):
    email:str
    resettoken: Optional[str] = None
    password: str = Field(..., min_length=5, max_length=24, description="user password")
   