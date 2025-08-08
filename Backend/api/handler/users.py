from fastapi import APIRouter, HTTPException, status
from schemas.user_schema import UserAuth, UserOut, Email
from fastapi import Depends
from services.user_service import UserService
from datetime import datetime,timedelta
import pymongo
from uuid import UUID, uuid4
from bson import ObjectId
from model.users import User
from api.deps.user_deps import get_current_user
from services.user_service import UserService
from typing import List
from typing import Any, Optional
from schemas.user_schema import UserValue , ResetPasswordConfirm
from schemas.movie_schema import Movie
from schemas.series_schema import Series
from utils.utils import generate_reset_token , send_email
from core.security import get_password
user_router = APIRouter()
@user_router.post('/create', summary="Create new user", response_model=UserOut)
async def create_user(data: UserAuth):
    try:
        return await UserService.create_user(data)
    except pymongo.errors.DuplicateKeyError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email or username already exist"
        )
    

@user_router.get('/me', summary='Get details of currently logged in user', response_model=UserValue)
async def get_me(user: User = Depends(get_current_user)):
    return user


@user_router.post('/add_movies_to_watchlist', summary="Adds movie to the watchlist", response_model=User)
async def create_user(data: Movie,current_user: User = Depends(get_current_user)):
    return await UserService.add_movies_to_watchlist(data, current_user)

@user_router.post('/add_series_to_watchlist', summary="Adds movie to the watchlist", response_model=User)
async def create_user(data: Series,current_user: User = Depends(get_current_user)):
    return await UserService.add_series_to_watchlist(data, current_user)
    
    
@user_router.post('/remove_movie_from_watchlist',summary="Delete a favourite")
async def delete_movie(movie: Movie, current_user: User = Depends(get_current_user)):
    try:
        # Find the Favourite instance based on RecipeId
        fav_to_delete = next((fav for fav in current_user.watchlist or [] if fav.id == movie.id), None)

        if fav_to_delete:
            current_user.watchlist.remove(fav_to_delete)

            # Save the updated user document
            await current_user.save()

            return None  # Successfully deleted
        else:
            raise HTTPException(status_code=404, detail="Favourite not found")
    except Exception as e:
        print("error")


@user_router.post('/remove_series_from_watchlist',summary="Delete a favourite")
async def delete_series(series: Series, current_user: User = Depends(get_current_user)):
    try:
        # Find the Favourite instance based on RecipeId
        fav_to_delete = next((fav for fav in current_user.series_watchlist or [] if fav.id == series.id), None)

        if fav_to_delete:
            # Remove the Favourite instance from the user's favourite_recipes list
            current_user.series_watchlist.remove(fav_to_delete)

            # Save the updated user document
            await current_user.save()

            return None  # Successfully deleted
        else:
            raise HTTPException(status_code=404, detail="Favourite not found")
    except Exception as e:
        print("eror")

@user_router.post('/resetPassword', summary="Create new user")
async def resetPassword(email: str):
    try:
        existing_user = await UserService.get_user_by_email(email)
        if not existing_user:
            raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email  doesnt exist"
        )
        token = generate_reset_token();
        existing_user.resettoken = token
        # expiration_time = 
        existing_user.resettoken_expiration = datetime.now() + timedelta(hours=1)
        await existing_user.save()
        send_email(existing_user.email,"Password Reset",f"Hi user! Your password reset token is: {token}")


        return {"success": True, "message": "Email sent","token":token}

    except Exception as e:
        print(e)
        return{"message": e}
    
@user_router.post('/resetPasswordConfirm', summary="Create new user")
async def resetPasswordConfirm(data: ResetPasswordConfirm):
    try:
        existing_user = await UserService.get_user_by_email(data.email)
        if not existing_user or existing_user.resettoken != data.resettoken:
            raise HTTPException(status_code=400, detail="Invalid user or verification code")

        if existing_user.resettoken_expiration < datetime.now():
            raise HTTPException(status_code=400, detail="Token has expired")
        
        hashed_password = get_password(data.password)
        if existing_user.resettoken:
            existing_user.resettoken = ''
            
        existing_user.hashed_password = hashed_password
        existing_user.resettoken_expiration = datetime.now()
        await existing_user.save()
        send_email(existing_user.email, "Password Updated","Hi user! You have successfully changed your password.")


        return {"success": True, "message": existing_user}

    except Exception as e:
        print(e)
        return {"success": False, "message": existing_user}

    
