# 빠른 시작 가이드

## 1분 안에 시작하기

### 1단계: API Key 설정

1. [Anthropic Console](https://console.anthropic.com/)에서 API Key 발급
2. `backend/.env` 파일 생성 및 키 입력:

```bash
cd backend
echo "ANTHROPIC_API_KEY=sk-ant-your-actual-key-here" > .env
```

### 2단계: 의존성 설치

**프론트엔드:**
```bash
npm install
```

**백엔드:**
```bash
cd backend
pip install -r requirements.txt
```

### 3단계: 서버 실행

**터미널 1 (백엔드):**
```bash
cd backend
uvicorn app.main:app --reload
```

**터미널 2 (프론트엔드):**
```bash
npm run dev
```

### 4단계: 접속 및 테스트

1. 브라우저에서 `http://localhost:3000` 접속
2. 다음 계정으로 로그인:
   - 시니어: `senior@demo.com` / `password123`
   - 기업: `company@demo.com` / `password123`

## 테스트 데이터

### 시니어 경력 예시

```
대형 건설사 현장 소장 30년 경력
- AutoCAD, BIM 활용한 설계 검토
- 공정별 예산 편성 및 통제
- 협력사 계약 및 협상
- 안전 규정 감사 및 개선
- 주요 성과: 00빌딩 신축 공사 안전사고 Zero, 예산 15% 절감
```

### 기업 직무 기술서 예시

```
마케팅 총괄 (정규직)
- SNS 마케팅 전략 수립 및 실행
- 콘텐츠 제작 및 캠페인 기획
- 데이터 분석 및 성과 측정
- 주니어 마케터 관리 및 교육
- 브랜드 포지셔닝 및 커뮤니케이션 전략
```

## 문제 발생 시

### "Module not found" 오류
```bash
# 프론트엔드
npm install

# 백엔드
cd backend
pip install -r requirements.txt
```

### "ANTHROPIC_API_KEY not set" 오류
```bash
cd backend
# .env 파일 확인
cat .env

# 없으면 생성
echo "ANTHROPIC_API_KEY=your-key" > .env
```

### 포트 충돌
- 백엔드 기본 포트: 8000
- 프론트엔드 기본 포트: 3000

다른 포트 사용 시:
```bash
# 백엔드
uvicorn app.main:app --port 8001

# 프론트엔드 (.env.local 수정)
NEXT_PUBLIC_API_URL=http://localhost:8001
```

## 다음 단계

자세한 내용은 [README.md](README.md)를 참고하세요.
