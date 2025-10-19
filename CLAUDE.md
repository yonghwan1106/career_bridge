# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Career Bridge is an AI-powered platform that matches senior professionals with companies by analyzing career histories and redesigning job roles. Built for the 2025 Future Korea Idea Competition.

**Core Value Proposition**: Convert senior expertise into flexible, part-time opportunities while helping companies redesign full-time roles into suitable positions for experienced professionals.

## Development Commands

### Frontend (Next.js 15)
```bash
npm run dev          # Start dev server with Turbopack (may use port 3003 if 3000 is occupied)
npm run build        # Production build with Turbopack
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Backend (FastAPI + Python)
```bash
cd backend
python -m venv venv                                    # Create virtual environment (first time)
source venv/bin/activate                               # Activate (Mac/Linux)
venv\Scripts\activate                                  # Activate (Windows)
pip install -r requirements.txt                        # Install dependencies
python -m uvicorn app.main:app --reload --port 8000   # Start dev server
```

**Critical**: Backend requires `ANTHROPIC_API_KEY` in `backend/.env` file to function.

### Cache Management
When experiencing build errors or dark mode issues:
```bash
rm -rf .next                    # Clear Next.js build cache
rm -rf node_modules/.cache      # Clear module cache
```

## Architecture

### Dual-Role System
The app serves two distinct user types with separate flows:

1. **Senior Users** (`/senior/*`)
   - Input: Free-form career text
   - AI Processing: Claude 3.5 Sonnet extracts skills, experiences, achievements
   - Output: Structured capability portfolio + matched job recommendations
   - Key Component: `AIAnalysisLoader` shows 4-step analysis progress

2. **Company Users** (`/company/*`)
   - Input: Job description (typically full-time roles)
   - AI Processing: Claude redesigns into flexible roles (part-time, project-based)
   - Output: Restructured positions + recommended senior candidates
   - Key Component: Visual cards with role breakdowns

### State Management Pattern
Uses **Zustand** for global state (not Redux):
- `app/lib/store.ts`: Authentication store with demo accounts
- No server-side session - client-side only authentication
- Demo accounts: `senior@demo.com` / `company@demo.com` (password: `password123`)

### API Communication
- Frontend → Backend via `app/lib/api.ts` (Axios wrapper)
- Backend uses `backend/data/*.json` for mock data (not a real database)
- All AI analysis happens server-side through Anthropic API

### Design System (Phase 2)
Located in `app/globals.css`:
- **3-Color Palette**: Primary (#F97316 orange), Secondary (#3B82F6 blue), Accent (#8B5CF6 purple)
- **Glass Morphism**: `.glass-card` class with backdrop-blur
- **Dark Mode**: Explicitly disabled - always uses light theme (see `@media (prefers-color-scheme: dark)`)
- **Typography**: 18px base (senior-friendly), 1.8 line-height

### Component Structure
```
app/components/
├── landing/          # 5-section landing page (HeroSection, ProblemSection, etc.)
├── features/         # Reusable features (AIAnalysisLoader, SkillsChart)
├── ui/              # Base components (Button, GlassCard)
└── Navigation.tsx   # Shared nav component
```

**Landing Page Flow**: Hero → Problem (animated stats) → Solution (3-step process) → Impact → CTA
- Each section has an `id` attribute for smooth scrolling from hero navigation buttons
- Section IDs: `#problem`, `#solution`, `#impact`, `#cta`

## Key Technical Patterns

### AI Analysis Flow (Senior Dashboard)
```typescript
// app/senior/page.tsx
const handleAnalyze = async () => {
  setAnalysisStep(1);  // Career text understanding
  setAnalysisStep(2);  // Skill extraction
  setAnalysisStep(3);  // Portfolio generation (actual API call)
  const result = await careerApi.analyzeCareer(careerText);
  setAnalysisStep(4);  // Job matching
  // Display SkillsChart with radar visualization
}
```

### Job Redesign Flow (Company Dashboard)
```typescript
// app/company/page.tsx
const handleRedesign = async () => {
  const result = await careerApi.redesignJob(jobDescription);
  // result.roles contains redesigned positions
  // Automatically queries matching seniors based on required skills
}
```

### Smooth Scroll Navigation
```typescript
// app/components/landing/HeroSection.tsx
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};
```

## Common Development Scenarios

### Adding New Landing Section
1. Create component in `app/components/landing/`
2. Import in `app/page.tsx`
3. Wrap with `<div id="section-name">` for navigation
4. Add navigation item to `HeroSection.tsx` `navItems` array

### Modifying AI Analysis
Backend file: `backend/app/claude_service.py`
- Uses structured prompts with Claude 3.5 Sonnet
- Returns JSON responses parsed by Pydantic models
- Error handling includes retry logic for API failures

### Updating Design System Colors
Edit `app/globals.css` `:root` variables:
```css
--primary-500: #F97316;    /* Change this */
--primary-600: #EA580C;    /* And this */
```
All components use these CSS variables via Tailwind's `primary-*` classes.

### Testing Without Backend
- Landing page (`/`) works fully without backend
- Dashboard pages (`/senior`, `/company`) require backend for AI features
- Mock data in `backend/data/` can be modified for testing different scenarios

## Critical Configuration Files

- `backend/.env`: Must contain `ANTHROPIC_API_KEY` (never commit this)
- `app/globals.css`: Contains dark mode override to force light theme
- `app/layout.tsx`: Root layout with forced `bg-white` to prevent dark background
- `CURRENT_STATUS.md`: Up-to-date development status and testing instructions

## Animation Libraries

- **Framer Motion**: Used for page transitions, card hovers, stagger animations
- **Recharts**: Radar charts in `SkillsChart` component (6-skill maximum display)
- **Lucide React**: Icon system (replaced emojis in Phase 2)

Pattern for animated components:
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: index * 0.1 }}
>
```

## Known Issues & Workarounds

1. **Port Conflicts**: Dev server may start on port 3003 instead of 3000 if another process is using it
2. **Turbopack Errors**: Requires complete `.next` folder deletion and restart
3. **Dark Mode Flash**: Fixed by inline style in `layout.tsx` (`style={{ backgroundColor: '#ffffff' }}`)
4. **Build Cache**: Next.js 15 + Turbopack sometimes needs `rm -rf .next node_modules/.cache`

## Documentation

- `docs/improvement_plan.md`: Full redesign strategy and competition positioning
- `docs/PHASE2_COMPLETION.md`: Detailed Phase 2 implementation report
- `CURRENT_STATUS.md`: Current feature status and setup instructions
- API docs available at `http://localhost:8000/docs` when backend is running
