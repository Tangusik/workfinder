from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from core.config import settings

class DbHelper:
    def __init__(self, url:str, echo:bool = False, max_overflow:int = 10, pool_size:int = 5):
        self.engine = create_async_engine(url=url, echo=echo, max_overflow= max_overflow, pool_size=pool_size)
        self.session_maker = async_sessionmaker(bind=self.engine, autoflush=False, autocommit=False, expire_on_commit=False)

    async def dispose(self):
        await self.engine.dispose()
        
    async def session_getter(self):
        async with self.session_maker() as session:
            yield session

db_helper = DbHelper(
    url=str(settings.db.url), 
    echo=settings.db.echo, 
    max_overflow=settings.db.max_overflow, 
    pool_size=settings.db.pool_size)
    