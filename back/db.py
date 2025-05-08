from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import DeclarativeBase
from config import settings
from sqlalchemy import URL, create_engine, text
import logging
import asyncio

engine = create_async_engine(url=settings.DB_URL_asyncpg, echo=False, pool_size = 10, max_overflow=10)

session = async_sessionmaker(engine)

logging.basicConfig(
    level=logging.INFO, 
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[logging.StreamHandler()]
)

class Base(DeclarativeBase):
    pass
