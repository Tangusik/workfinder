from fastapi import APIRouter

from core.config import settings
from .user_api import router as user_router

router = APIRouter(
    prefix=settings.api.prefix
)
router.include_router(user_router)