from fastapi import APIRouter

from core.config import settings
from api.user_api.fastapi_users import fastapi_users
from api.dependencies.backend import authentication_backend

from core.schemas.users import UserCreate, UserRead

router = APIRouter(prefix=settings.api.user.auth, tags=['Аутентификация 🚪'])

#login + logout
router.include_router(
    router = fastapi_users.get_auth_router(authentication_backend, requires_verification=True)
)

#register
router.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),)

#verify + request-verify-token
router.include_router(router=fastapi_users.get_verify_router(UserRead))

#forgot password
router.include_router(fastapi_users.get_reset_password_router())