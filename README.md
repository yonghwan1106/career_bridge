# 커리어 브릿지 (Career Bridge)

AI 시니어 동반 성장 플랫폼 - 2025 미래한국 아이디어 공모전 제안 프로젝트

## 프로젝트 개요

커리어 브릿지는 시니어 전문 인력의 경력을 AI로 분석하여 역량 포트폴리오를 생성하고, 기업의 직무를 유연한 형태로 재설계하여 양측을 지능적으로 매칭하는 플랫폼입니다.

### 핵심 기능

1. **시니어용 기능**
   - AI 기반 경력 분석 및 역량 포트폴리오 자동 생성
   - 역량 기반 맞춤형 일자리 추천
   
2. **기업용 기능**
   - AI 기반 직무 재설계 (정규직 → 파트타임/프로젝트 기반)
   - 필요 역량 기반 시니어 인재 추천

## 기술 스택

### 프론트엔드
- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Zustand** (상태 관리)
- **Axios** (API 통신)

### 백엔드
- **Python 3.9+**
- **FastAPI** (비동기 API 서버)
- **Anthropic Claude 3.5 Sonnet** (AI 분석 엔진)
- **JSON 파일 기반 데이터 저장**

## 설치 및 실행 방법

### 사전 요구사항

1. **Node.js 18 이상**
2. **Python 3.9 이상**
3. **Anthropic API Key** ([https://console.anthropic.com/](https://console.anthropic.com/)에서 발급)

### 1. 프로젝트 클론

```bash
git clone <repository-url>
cd career_bridge
```

### 2. 프론트엔드 설정

```bash
# 의존성 설치
npm install

# 환경 변수 설정 (선택사항)
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local
```

### 3. 백엔드 설정

```bash
# 백엔드 디렉토리로 이동
cd backend

# Python 가상환경 생성 (권장)
python -m venv venv

# 가상환경 활성화
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# 의존성 설치
pip install -r requirements.txt

# 환경 변수 설정 (필수)
echo "ANTHROPIC_API_KEY=your_actual_api_key_here" > .env
```

**중요:** `.env` 파일에 실제 Anthropic API Key를 입력해야 합니다!

### 4. 프로젝트 실행

**터미널 1 - 백엔드 서버 실행:**

```bash
cd backend
uvicorn app.main:app --reload --port 8000
```

백엔드 서버가 `http://localhost:8000`에서 실행됩니다.

**터미널 2 - 프론트엔드 개발 서버 실행:**

```bash
# 프로젝트 루트에서
npm run dev
```

프론트엔드가 `http://localhost:3000`에서 실행됩니다.

### 5. 애플리케이션 접속

브라우저에서 `http://localhost:3000` 접속

## 데모 계정

### 시니어 계정
- 이메일: `senior@demo.com`
- 비밀번호: `password123`

### 기업 계정
- 이메일: `company@demo.com`
- 비밀번호: `password123`

## 주요 사용 흐름

### 시니어 사용자

1. `senior@demo.com`으로 로그인
2. 경력 정보 입력 (예: "대형 건설사 현장 소장 30년 경력, AutoCAD, 공정관리, 예산수립 전문")
3. "AI로 분석하기" 클릭
4. 생성된 역량 포트폴리오 확인
5. 추천 일자리 목록 확인

### 기업 사용자

1. `company@demo.com`으로 로그인
2. 직무 기술서 입력 (예: "마케팅 총괄 - SNS 전략, 콘텐츠 제작, 데이터 분석")
3. "AI로 직무 재설계" 클릭
4. 재설계된 역할 제안 확인 (파트타임, 프로젝트 기반 등)
5. 추천 시니어 인재 목록 확인

## API 엔드포인트

백엔드 API 문서는 `http://localhost:8000/docs`에서 확인 가능합니다.

### 주요 엔드포인트

- `POST /api/analyze-career` - 시니어 경력 분석
- `POST /api/redesign-job` - 직무 재설계
- `GET /api/seniors` - 시니어 목록 조회
- `GET /api/jobs` - 일자리 목록 조회
- `GET /api/seniors/{id}` - 시니어 상세 조회
- `GET /api/jobs/{id}` - 일자리 상세 조회

## 프로젝트 구조

```
career_bridge/
├── app/                    # Next.js 프론트엔드
│   ├── login/             # 로그인 페이지
│   ├── senior/            # 시니어 대시보드
│   ├── company/           # 기업 대시보드
│   ├── lib/               # 유틸리티 (API, Store)
│   └── components/        # 재사용 컴포넌트
├── backend/               # Python 백엔드
│   ├── app/
│   │   ├── main.py       # FastAPI 메인 앱
│   │   ├── routes.py     # API 라우트
│   │   └── claude_service.py  # Claude API 서비스
│   └── data/             # 목업 데이터 (JSON)
│       ├── seniors.json  # 시니어 목업 데이터
│       └── jobs.json     # 일자리 목업 데이터
├── docs/                  # 문서
│   ├── proposal.md       # 공모전 제안서
│   └── prd.md           # 제품 요구사항 문서
└── README.md
```

## 문제 해결

### 백엔드 서버가 실행되지 않을 때

```bash
# Python 가상환경이 활성화되었는지 확인
# 의존성이 모두 설치되었는지 확인
pip list

# 환경 변수가 설정되었는지 확인
cat backend/.env  # Mac/Linux
type backend\.env  # Windows
```

### Claude API 오류가 발생할 때

1. `.env` 파일에 올바른 API Key가 설정되었는지 확인
2. Anthropic 계정에 크레딧이 남아있는지 확인
3. API Key가 유효한지 확인

### 프론트엔드와 백엔드가 연결되지 않을 때

1. 백엔드 서버가 `http://localhost:8000`에서 실행 중인지 확인
2. 프론트엔드의 `.env.local` 파일에서 `NEXT_PUBLIC_API_URL` 확인
3. CORS 설정 확인 (backend/app/main.py)

## 배포

### 프론트엔드 (Vercel)

**배포 URL**: https://career-bridge-blush.vercel.app/

Vercel 환경 변수 설정:
```
NEXT_PUBLIC_API_URL=https://career-bridge-backend-q136.onrender.com
```

### 백엔드 (Render)

**배포 URL**: https://career-bridge-backend-q136.onrender.com

⚠️ **중요**: Render 무료 플랜은 비활성 상태에서 자동으로 중지되며, 첫 요청 시 50초 정도 소요될 수 있습니다.

**이미 배포 완료!** 추가 배포가 필요한 경우:

1. [Render.com](https://render.com)에 로그인
2. "New Web Service" 클릭
3. GitHub 저장소 연결
4. 설정:
   - **Root Directory**: `backend`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. 환경 변수 추가:
   - `ANTHROPIC_API_KEY`: 실제 API 키 입력
6. Deploy 클릭

## 향후 개발 계획

- [ ] 실제 데이터베이스 연동 (PostgreSQL/Supabase)
- [ ] 실시간 채팅 기능
- [ ] 결제 시스템 통합
- [x] Vercel 배포 (완료)
- [x] 백엔드 배포 (Render - 완료)
- [ ] 모바일 반응형 개선
- [ ] 접근성 향상 (WCAG 2.1 AA 준수)

## 라이선스

본 프로젝트는 2025 미래한국 아이디어 공모전을 위한 프로토타입입니다.

## 문의

프로젝트 관련 문의사항은 Issues를 통해 남겨주세요.
