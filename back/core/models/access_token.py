from sqlalchemy import ForeignKey, Integer
from sqlalchemy.orm import Mapped, mapped_column
from fastapi_users_db_sqlalchemy.access_token import (
    SQLAlchemyAccessTokenDatabase,
    SQLAlchemyBaseAccessTokenTable,
)
from sqlalchemy.ext.asyncio import AsyncSession

from .base import Base
from core.types.user_id import UserIdType

class AccessToken(Base, SQLAlchemyBaseAccessTokenTable[UserIdType]):  
    user_id: Mapped[UserIdType] = mapped_column(Integer, ForeignKey(column='user.id', ondelete="cascade"), nullable=False)

    @classmethod
    def get_db(cls, session: "AsyncSession"):
        return SQLAlchemyAccessTokenDatabase(session, AccessToken)