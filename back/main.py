import asyncio
from contextlib import asynccontextmanager
from fastapi import FastAPI
import uvicorn

from core.config import settings
from core.models import db_helper

from api import router as api_router
from actions.create_superuser import create_superuser

from middlewares import register_middlewares

@asynccontextmanager
async def lifespan(app):
    #startapp
    await create_superuser()
    yield
    #shutdown
    await db_helper.dispose()

main_app = FastAPI(lifespan= lifespan)
register_middlewares(app=main_app)
main_app.include_router(api_router, prefix='')

if __name__ == "__main__":
    uvicorn.run("main:main_app", reload = True, 
                host=settings.run.host, 
                port=settings.run.port)