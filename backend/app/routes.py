from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any
import json
import os
from pathlib import Path

from .claude_service import ClaudeService

router = APIRouter()
claude_service = ClaudeService()

# 데이터 파일 경로
DATA_DIR = Path(__file__).parent.parent / "data"
SENIORS_FILE = DATA_DIR / "seniors.json"
JOBS_FILE = DATA_DIR / "jobs.json"


# Request/Response 모델
class CareerAnalysisRequest(BaseModel):
    career_text: str


class JobRedesignRequest(BaseModel):
    job_description: str


class SkillPortfolio(BaseModel):
    skills: List[str]
    experiences: List[str]
    achievements: List[str]
    raw_analysis: str


class RedesignedRole(BaseModel):
    title: str
    hours_per_week: str
    responsibilities: List[str]
    required_skills: List[str]
    description: str


class JobRedesignResponse(BaseModel):
    roles: List[RedesignedRole]
    analysis: str


# 시니어 경력 분석
@router.post("/analyze-career", response_model=SkillPortfolio)
async def analyze_career(request: CareerAnalysisRequest):
    """
    시니어의 경력 정보를 AI로 분석하여 역량 포트폴리오를 생성합니다.
    """
    try:
        result = await claude_service.analyze_career(request.career_text)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"경력 분석 중 오류가 발생했습니다: {str(e)}")


# 직무 재설계
@router.post("/redesign-job", response_model=JobRedesignResponse)
async def redesign_job(request: JobRedesignRequest):
    """
    기업의 정규직 직무를 유연한 시니어 적합 역할로 재설계합니다.
    """
    try:
        result = await claude_service.redesign_job(request.job_description)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"직무 재설계 중 오류가 발생했습니다: {str(e)}")


# 시니어 목록 조회
@router.get("/seniors")
async def get_seniors(skills: str = None):
    """
    등록된 시니어 목록을 조회합니다. 스킬 필터링 가능.
    """
    try:
        if not SENIORS_FILE.exists():
            return {"seniors": [], "count": 0}
            
        with open(SENIORS_FILE, "r", encoding="utf-8") as f:
            seniors = json.load(f)

        if skills:
            skill_list = [s.strip().lower() for s in skills.split(",")]
            seniors = [
                s for s in seniors
                if any(skill in [tag.lower() for tag in s.get("skills", [])] for skill in skill_list)
            ]

        return {"seniors": seniors, "count": len(seniors)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"시니어 목록 조회 중 오류: {str(e)}")


# 일자리 목록 조회
@router.get("/jobs")
async def get_jobs(skills: str = None):
    """
    등록된 일자리 목록을 조회합니다. 스킬 필터링 가능.
    """
    try:
        if not JOBS_FILE.exists():
            return {"jobs": [], "count": 0}
            
        with open(JOBS_FILE, "r", encoding="utf-8") as f:
            jobs = json.load(f)

        if skills:
            skill_list = [s.strip().lower() for s in skills.split(",")]
            jobs = [
                j for j in jobs
                if any(skill in [tag.lower() for tag in j.get("required_skills", [])] for skill in skill_list)
            ]

        return {"jobs": jobs, "count": len(jobs)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"일자리 목록 조회 중 오류: {str(e)}")


# 시니어 상세 조회
@router.get("/seniors/{senior_id}")
async def get_senior_detail(senior_id: str):
    """
    특정 시니어의 상세 정보를 조회합니다.
    """
    try:
        if not SENIORS_FILE.exists():
            raise HTTPException(status_code=404, detail="데이터를 찾을 수 없습니다.")
            
        with open(SENIORS_FILE, "r", encoding="utf-8") as f:
            seniors = json.load(f)

        senior = next((s for s in seniors if s["id"] == senior_id), None)
        if not senior:
            raise HTTPException(status_code=404, detail="시니어를 찾을 수 없습니다.")

        return senior
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=f"조회 중 오류: {str(e)}")


# 일자리 상세 조회
@router.get("/jobs/{job_id}")
async def get_job_detail(job_id: str):
    """
    특정 일자리의 상세 정보를 조회합니다.
    """
    try:
        if not JOBS_FILE.exists():
            raise HTTPException(status_code=404, detail="데이터를 찾을 수 없습니다.")
            
        with open(JOBS_FILE, "r", encoding="utf-8") as f:
            jobs = json.load(f)

        job = next((j for j in jobs if j["id"] == job_id), None)
        if not job:
            raise HTTPException(status_code=404, detail="일자리를 찾을 수 없습니다.")

        return job
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=f"조회 중 오류: {str(e)}")
