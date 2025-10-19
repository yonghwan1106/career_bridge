'use client';

import HeroSection from './components/landing/HeroSection';
import ProblemSection from './components/landing/ProblemSection';
import SolutionSection from './components/landing/SolutionSection';
import ImpactSection from './components/landing/ImpactSection';
import CTASection from './components/landing/CTASection';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <div id="problem">
        <ProblemSection />
      </div>
      <div id="solution">
        <SolutionSection />
      </div>
      <div id="impact">
        <ImpactSection />
      </div>
      <div id="cta">
        <CTASection />
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 커리어 브릿지 (Career Bridge) - 2025 미래한국 아이디어 공모전 제안 프로젝트
          </p>
        </div>
      </footer>
    </main>
  );
}
