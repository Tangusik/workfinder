from typing import TYPE_CHECKING
from fastapi_users_db_sqlalchemy  import SQLAlchemyBaseUserTable
from fastapi_users_db_sqlalchemy  import SQLAlchemyUserDatabase
from sqlalchemy.orm import Mapped, mapped_column

from .base import Base
from .mixins.id_int_pk import IdIntPkMixin
from core.types.user_id import UserIdType

if TYPE_CHECKING:
    from sqlalchemy.ext.asyncio import AsyncSession

class User(Base,IdIntPkMixin, SQLAlchemyBaseUserTable[UserIdType]):

    @classmethod
    def get_db(cls, session: "AsyncSession"):
        return SQLAlchemyUserDatabase(session, User)