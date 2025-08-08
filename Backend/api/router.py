from fastapi import APIRouter
from api.handler.users import user_router
from api.auth.jwt import auth_router

router = APIRouter()
router.include_router(user_router,prefix='/users',tags=["users"])
router.include_router(auth_router, prefix='/auth', tags=["auth"])