from fastapi import APIRouter

from core.config import settings
from api.user_api.fastapi_users import fastapi_users
from core.schemas.users import UserRead, UserUpdate


router = APIRouter(prefix='', tags=['Пользователи 👤'])

# /me + /{id}
router.include_router(
    fastapi_users.get_users_router(UserRead, UserUpdate),
)