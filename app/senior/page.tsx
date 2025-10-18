'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../lib/store';
import { careerApi } from '../lib/api';

export default function SeniorDashboard() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  
  const [careerText, setCareerText] = useState('');
  const [portfolio, setPortfolio] = useState<any>(null);
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
    
    try {
      const result = await careerApi.analyzeCareer(careerText);
      setPortfolio(result);
      
      // 역량 기반으로 추천 일자리 조회
      if (result.skills && result.skills.length > 0) {
        const jobsResult = await careerApi.getJobs(result.skills.slice(0, 3).join(','));
        setJobs(jobsResult.jobs || []);
      }
    } catch (err: any) {
      setError('분석 중 오류가 발생했습니다. 백엔드 서버가 실행 중인지 확인해주세요.');
      console.error(err);
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">커리어 브릿지 - 시니어</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            로그아웃
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">환영합니다!</h2>
          <p className="text-gray-600">AI가 당신의 경력을 분석하여 최적의 일자리를 추천해드립니다.</p>
        </div>

        {/* 경력 입력 섹션 */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">경력 정보 입력</h3>
          <textarea
            value={careerText}
            onChange={(e) => setCareerText(e.target.value)}
            className="w-full h-48 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base resize-none"
            placeholder="경력 정보를 자유롭게 입력해주세요.&#10;&#10;예시:&#10;- 대형 건설사 현장 소장 30년 경력&#10;- AutoCAD, 공정 관리, 예산 수립 전문&#10;- 대형 프로젝트 안전사고 Zero 달성&#10;- 예산 대비 15% 절감 성과"
          />
          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 text-base"
          >
            {loading ? 'AI 분석 중...' : 'AI로 분석하기'}
          </button>
        </div>

        {/* 역량 포트폴리오 */}
        {portfolio && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">나의 역량 포트폴리오</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">핵심 역량</h4>
                <div className="flex flex-wrap gap-2">
                  {portfolio.skills.map((skill: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                    >
                      #{skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">주요 경험</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  {portfolio.experiences.map((exp: string, index: number) => (
                    <li key={index}>{exp}</li>
                  ))}
                </ul>
              </div>

              {portfolio.achievements && portfolio.achievements.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">주요 성과</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    {portfolio.achievements.map((achievement: string, index: number) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              )}

              {portfolio.raw_analysis && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">{portfolio.raw_analysis}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 추천 일자리 */}
        {jobs.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">추천 일자리</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {jobs.map((job) => (
                <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition">
                  <h4 className="font-semibold text-gray-900 mb-2">{job.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">{job.company}</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                      {job.employment_type}
                    </span>
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">
                      {job.hours_per_week}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{job.description.substring(0, 100)}...</p>
                  <p className="text-sm font-semibold text-blue-600">{job.salary_range}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
