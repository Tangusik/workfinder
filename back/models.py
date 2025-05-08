from sqlalchemy import MetaData
from sqlalchemy.orm import Mapped, mapped_column
from db import Base
import typing
import enum

meta_data_obj = MetaData()

class Users(Base):
    __tablename__ = 'users'

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]

