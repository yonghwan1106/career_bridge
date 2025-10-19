'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../lib/store';
import { careerApi } from '../lib/api';
import Navigation from '../components/Navigation';
import AIAnalysisLoader from '../components/features/AIAnalysisLoader';
import SkillsChart from '../components/features/SkillsChart';
import { BrainCircuit, Sparkles, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import type { CareerAnalysisResult, Job } from '../types';

export default function SeniorDashboard() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const [careerText, setCareerText] = useState('');
  const [portfolio, setPortfolio] = useState<CareerAnalysisResult | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [analysisStep, setAnalysisStep] = useState(0);

  // 인증 확인 - useEffect 내부로 이동
  useEffect(() => {
    if (!user || user.role !== 'senior') {
      router.push('/login');
    }
  }, [user, router]);

  const handleAnalyze = async () => {
    if (!careerText.trim()) {
      setError('경력 정보를 입력해주세요.');
      return;
    }

    setLoading(true);
    setError('');
    setAnalysisStep(0);

    try {
      // Step 1: 경력 텍스트 이해
      setAnalysisStep(1);
      await new Promise(resolve => setTimeout(resolve, 800));

      // Step 2: 핵심 역량 추출
      setAnalysisStep(2);
      await new Promise(resolve => setTimeout(resolve, 800));

      // Step 3: 역량 포트폴리오 생성
      setAnalysisStep(3);
      const result = await careerApi.analyzeCareer(careerText);
      setPortfolio(result);

      // Step 4: 추천 일자리 검색
      setAnalysisStep(4);
      if (result.skills && result.skills.length > 0) {
        const jobsResult = await careerApi.getJobs(result.skills.slice(0, 3).join(','));
        setJobs(jobsResult.jobs || []);
      }

      // 완료
      setAnalysisStep(5);
    } catch (err) {
      setError('분석 중 오류가 발생했습니다. 백엔드 서버가 실행 중인지 확인해주세요.');
      console.error(err);
      setAnalysisStep(0);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  // 인증되지 않은 경우 로딩 표시
  if (!user || user.role !== 'senior') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">로그인 페이지로 이동 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-primary-50/30 to-secondary-50/30">
      {/* Header */}
      <header className="glass-card shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl">
              <BrainCircuit className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                커리어 브릿지
              </h1>
              <p className="text-sm text-gray-600">시니어 대시보드</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-2.5 text-sm font-semibold text-gray-700 hover:text-gray-900 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 hover:border-primary-400"
          >
            로그아웃
          </button>
        </div>
      </header>

      {/* Navigation */}
      <Navigation
        items={[
          { name: 'AI 역량 분석', href: '/senior', icon: '🤖' },
          { name: '전체 일자리', href: '/senior/jobs', icon: '💼' },
          { name: '내 프로필', href: '/senior/profile', icon: '👤' }
        ]}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 glass-card p-6 rounded-2xl"
        >
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-6 h-6 text-primary-600" />
            <h2 className="text-2xl font-bold text-gray-900">환영합니다!</h2>
          </div>
          <p className="text-gray-600 text-lg">AI가 당신의 경력을 분석하여 최적의 일자리를 추천해드립니다.</p>
        </motion.div>

        {/* 경력 입력 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl shadow-lg p-8 mb-8 border-2 border-gray-200 hover:border-primary-300 transition-all duration-300"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary-100 rounded-lg">
              <BrainCircuit className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">경력 정보 입력</h3>
          </div>
          <textarea
            value={careerText}
            onChange={(e) => setCareerText(e.target.value)}
            className="w-full h-56 px-5 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base resize-none transition-all duration-200"
            placeholder="경력 정보를 자유롭게 입력해주세요.&#10;&#10;예시:&#10;- 대형 건설사 현장 소장 30년 경력&#10;- AutoCAD, 공정 관리, 예산 수립 전문&#10;- 대형 프로젝트 안전사고 Zero 달성&#10;- 예산 대비 15% 절감 성과"
          />
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 bg-red-50 border-2 border-red-200 text-red-700 px-5 py-4 rounded-xl text-sm font-medium"
            >
              {error}
            </motion.div>
          )}
          <motion.button
            onClick={handleAnalyze}
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            className="mt-6 w-full bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 text-lg shadow-lg hover:shadow-xl"
          >
            {loading ? 'AI 분석 중...' : 'AI로 분석하기'}
          </motion.button>
        </motion.div>

        {/* AI Analysis Loader */}
        {loading && analysisStep > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <AIAnalysisLoader currentStep={analysisStep} totalSteps={4} />
          </motion.div>
        )}

        {/* 역량 포트폴리오 */}
        {portfolio && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl shadow-lg p-8 mb-8 border-2 border-primary-200"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">나의 역량 포트폴리오</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
              {/* Left Column: Skills Chart */}
              <div>
                <SkillsChart skills={portfolio.skills} />
              </div>

              {/* Right Column: Details */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-gradient-to-b from-primary-500 to-secondary-500 rounded-full"></span>
                    핵심 역량
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {portfolio.skills.map((skill: string, index: number) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="px-4 py-2 bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-800 rounded-xl text-sm font-semibold border-2 border-primary-200 hover:border-primary-400 transition-all cursor-default"
                      >
                        #{skill}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-gradient-to-b from-secondary-500 to-accent-500 rounded-full"></span>
                    주요 경험
                  </h4>
                  <ul className="space-y-2">
                    {portfolio.experiences.map((exp: string, index: number) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-start gap-3 text-gray-700 bg-white p-3 rounded-lg border border-gray-200"
                      >
                        <span className="text-secondary-600 font-bold mt-0.5">•</span>
                        <span>{exp}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {portfolio.achievements && portfolio.achievements.length > 0 && (
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-6 bg-gradient-to-b from-accent-500 to-primary-500 rounded-full"></span>
                      주요 성과
                    </h4>
                    <ul className="space-y-2">
                      {portfolio.achievements.map((achievement: string, index: number) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-start gap-3 text-gray-700 bg-gradient-to-r from-accent-50 to-primary-50 p-3 rounded-lg border border-accent-200"
                        >
                          <span className="text-accent-600 font-bold mt-0.5">★</span>
                          <span>{achievement}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {portfolio.raw_analysis && (
              <div className="mt-6 p-6 bg-gradient-to-br from-gray-50 to-primary-50/30 rounded-xl border-2 border-gray-200">
                <h4 className="text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">AI 종합 분석</h4>
                <p className="text-base text-gray-700 leading-relaxed">{portfolio.raw_analysis}</p>
              </div>
            )}
          </motion.div>
        )}

        {/* 추천 일자리 */}
        {jobs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl shadow-lg p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-secondary-100 rounded-lg">
                  <Sparkles className="w-6 h-6 text-secondary-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">추천 일자리</h3>
              </div>
              <span className="px-4 py-2 bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-800 rounded-full text-sm font-bold">
                {jobs.length}개 발견
              </span>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {jobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-primary-400 hover:shadow-xl transition-all duration-300"
                >
                  <h4 className="text-lg font-bold text-gray-900 mb-2">{job.title}</h4>
                  <p className="text-sm text-gray-600 mb-3 font-medium">{job.company}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-3 py-1.5 bg-green-100 text-green-800 rounded-lg text-xs font-bold">
                      {job.employment_type}
                    </span>
                    <span className="px-3 py-1.5 bg-purple-100 text-purple-800 rounded-lg text-xs font-bold">
                      {job.hours_per_week}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-4 line-clamp-2">{job.description}</p>
                  <div className="pt-4 border-t-2 border-gray-100">
                    <p className="text-lg font-bold text-primary-600">{job.salary_range}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
