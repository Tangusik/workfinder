import time
from typing import Awaitable, Callable
from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from core.config import settings

import logging

log = logging.getLogger(__name__)


async def process_time(request: Request, call_next: Callable[[Request], Awaitable[Response]]):
    start_time = time.perf_counter()
    resp = await call_next(request)
    duration = time.perf_counter()-start_time
    resp.headers['process-time'] = f"{duration:.5f}"
    return resp

def register_middlewares(app:FastAPI):
    app.middleware('http')(process_time)
    app.add_middleware(
        CORSMiddleware,
        allow_origins= settings.cors_data.allowed_origins,
        allow_methods= ['*'],
        allow_headers= ['*'],
        allow_credentials=True)