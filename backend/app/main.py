from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api import qr_endpoints
from loguru import logger
import sys

# Configure logging
logger.remove()
logger.add(
    sys.stdout,
    colorize=True,
    format="<green>{time:YYYY-MM-DD HH:mm:ss}</green> | <level>{level: <8}</level> | <cyan>{name}</cyan>:<cyan>{function}</cyan>:<cyan>{line}</cyan> - <level>{message}</level>",
)
logger.add(
    "logs/qr_generator.log",
    rotation="500 MB",
    retention="10 days",
    compression="zip",
)

app = FastAPI(
    title="QR Code Generator API",
    version="1.0.0",
    docs_url="/api/docs",
    openapi_url="/api/openapi.json",
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(qr_endpoints.router, prefix="/api")
