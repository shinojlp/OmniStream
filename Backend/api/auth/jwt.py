from fastapi import APIRouter, Depends, HTTPException, status, Body
from fastapi.security import OAuth2PasswordRequestForm
from typing import Any
from services.user_service import UserService
from core.security import create_access_token, create_refresh_token
from schemas.auth_schema import TokenSchema
from schemas.user_schema import UserOut
from model.users import User
from core.config import settings
from schemas.auth_schema import TokenPayload
from pydantic import ValidationError
from jose import jwt
from api.deps.user_deps import get_current_user

auth_router = APIRouter()


@auth_router.post('/login', summary="Create access and refresh tokens for user", response_model=TokenSchema)
async def login(form_data: OAuth2PasswordRequestForm = Depends()) -> Any:
    print(form_data, "form data")
    user = await UserService.authenticate(email=form_data.username, password=form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect email or password"
        )
    
    return {
        "access_token": create_access_token(user.user_id),
        "refresh_token": create_refresh_token(user.user_id),
    }

@auth_router.post("/test-token",summary="test if the access token is working",response_model=UserOut)
async def test_token(user: User = Depends(get_current_user)):
    return user