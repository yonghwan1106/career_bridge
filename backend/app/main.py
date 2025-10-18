from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from pathlib import Path
import os

# .env 파일 경로를 명시적으로 지정
env_path = Path(__file__).parent.parent / '.env'
load_dotenv(dotenv_path=env_path)

from .routes import router

app = FastAPI(
    title="Career Bridge API",
    description="AI 시니어 동반 성장 플랫폼 백엔드 API",
    version="1.0.0"
)

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 라우터 등록
app.include_router(router, prefix="/api", tags=["api"])

@app.get("/")
async def root():
    return {
        "message": "Career Bridge API is running",
        "version": "1.0.0"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
