import os
import json
from typing import Dict, List, Any
from anthropic import Anthropic

class ClaudeService:
    def __init__(self):
        api_key = os.getenv("ANTHROPIC_API_KEY")
        if not api_key:
            raise ValueError("ANTHROPIC_API_KEY environment variable is not set")
        self.client = Anthropic(api_key=api_key)
        self.model = "claude-3-5-sonnet-20241022"
    
    async def analyze_career(self, career_text: str) -> Dict[str, Any]:
        """
        시니어의 경력 텍스트를 분석하여 역량 포트폴리오를 생성합니다.
        """
        prompt = f"""다음 경력 기술서를 분석하여 JSON 형식으로 핵심 역량, 경험, 성과를 추출해주세요.

경력 기술서:
{career_text}

다음 JSON 형식으로 응답해주세요:
{{
  "skills": ["역량1", "역량2", "역량3", ...],
  "experiences": ["주요 경험1", "주요 경험2", ...],
  "achievements": ["성과1", "성과2", ...],
  "summary": "전문성 요약 (2-3문장)"
}}

주의사항:
1. skills는 구체적이고 시장성 있는 기술/역량으로 추출
2. experiences는 업무 영역이나 프로젝트 경험으로 정리
3. achievements는 정량적 성과나 주요 업적으로 작성
4. 반드시 유효한 JSON 형식으로만 응답"""

        try:
            response = self.client.messages.create(
                model=self.model,
                max_tokens=2048,
                messages=[{
                    "role": "user",
                    "content": prompt
                }]
            )
            
            # 응답 텍스트 추출
            result_text = response.content[0].text
            
            # JSON 파싱
            result_json = json.loads(result_text)
            
            return {
                "skills": result_json.get("skills", []),
                "experiences": result_json.get("experiences", []),
                "achievements": result_json.get("achievements", []),
                "raw_analysis": result_json.get("summary", result_text)
            }
        except json.JSONDecodeError as e:
            # JSON 파싱 실패 시 기본값 반환
            return {
                "skills": ["경력 분석 필요"],
                "experiences": ["분석 데이터 부족"],
                "achievements": [],
                "raw_analysis": result_text if 'result_text' in locals() else str(e)
            }
        except Exception as e:
            raise Exception(f"Claude API 호출 오류: {str(e)}")
    
    async def redesign_job(self, job_description: str) -> Dict[str, Any]:
        """
        정규직 직무 기술서를 시니어 적합 유연 역할로 재설계합니다.
        """
        prompt = f"""다음 정규직 직무 기술서를 시니어 전문가가 수행할 수 있는 여러 개의 유연한 역할(파트타임, 프로젝트 기반, 멘토링)로 재설계해주세요.

직무 기술서:
{job_description}

다음 JSON 형식으로 응답해주세요:
{{
  "roles": [
    {{
      "title": "역할 제목",
      "hours_per_week": "주당 근무 시간 (예: 주 10시간, 월 4회 등)",
      "responsibilities": ["담당 업무1", "담당 업무2", ...],
      "required_skills": ["필요 역량1", "필요 역량2", ...],
      "description": "역할 설명 (1-2문장)"
    }}
  ],
  "analysis": "재설계 근거 및 기대효과 (3-4문장)"
}}

주의사항:
1. 최소 2개, 최대 4개의 역할로 분할
2. 각 역할은 시니어가 수행 가능한 수준으로 설계
3. 유연 근무(파트타임, 프로젝트, 멘토링 등) 형태 고려
4. 반드시 유효한 JSON 형식으로만 응답"""

        try:
            response = self.client.messages.create(
                model=self.model,
                max_tokens=3072,
                messages=[{
                    "role": "user",
                    "content": prompt
                }]
            )
            
            # 응답 텍스트 추출
            result_text = response.content[0].text
            
            # JSON 파싱
            result_json = json.loads(result_text)
            
            return {
                "roles": result_json.get("roles", []),
                "analysis": result_json.get("analysis", "")
            }
        except json.JSONDecodeError as e:
            # JSON 파싱 실패 시 기본값 반환
            return {
                "roles": [{
                    "title": "직무 재설계 필요",
                    "hours_per_week": "미정",
                    "responsibilities": ["분석 데이터 부족"],
                    "required_skills": [],
                    "description": "AI 분석을 다시 시도해주세요."
                }],
                "analysis": result_text if 'result_text' in locals() else str(e)
            }
        except Exception as e:
            raise Exception(f"Claude API 호출 오류: {str(e)}")
