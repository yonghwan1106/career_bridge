'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../lib/store';
import { careerApi } from '../lib/api';
import Navigation from '../components/Navigation';

export default function CompanyDashboard() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  
  const [jobDescription, setJobDescription] = useState('');
  const [redesignResult, setRedesignResult] = useState<any>(null);
  const [seniors, setSeniors] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 인증 확인 - useEffect 내부로 이동
  useEffect(() => {
    if (!user || user.role !== 'company') {
      router.push('/login');
    }
  }, [user, router]);

  const handleRedesign = async () => {
    if (!jobDescription.trim()) {
      setError('직무 기술서를 입력해주세요.');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const result = await careerApi.redesignJob(jobDescription);
      setRedesignResult(result);
      
      // 필요 역량 기반으로 추천 시니어 조회
      if (result.roles && result.roles.length > 0) {
        const allSkills = result.roles.flatMap((role: any) => role.required_skills);
        const uniqueSkills = [...new Set(allSkills)].slice(0, 3);
        const seniorsResult = await careerApi.getSeniors(uniqueSkills.join(','));
        setSeniors(seniorsResult.seniors || []);
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
  if (!user || user.role !== 'company') {
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
          <h1 className="text-2xl font-bold text-gray-900">커리어 브릿지 - 기업</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            로그아웃
          </button>
        </div>
      </header>

      {/* Navigation */}
      <Navigation
        items={[
          { name: 'AI 직무 재설계', href: '/company', icon: '🔧' },
          { name: '인재 풀', href: '/company/talents', icon: '👥' },
          { name: '내 채용공고', href: '/company/my-jobs', icon: '📋' }
        ]}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">환영합니다!</h2>
          <p className="text-gray-600">AI가 직무를 재설계하고 최적의 시니어 전문가를 추천해드립니다.</p>
        </div>

        {/* 직무 기술서 입력 섹션 */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">직무 기술서 입력</h3>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full h-48 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base resize-none"
            placeholder="직무 기술서를 입력해주세요.&#10;&#10;예시:&#10;마케팅 총괄 (정규직)&#10;- SNS 마케팅 전략 수립 및 실행&#10;- 콘텐츠 제작 및 캠페인 기획&#10;- 데이터 분석 및 성과 측정&#10;- 주니어 마케터 관리 및 교육"
          />
          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}
          <button
            onClick={handleRedesign}
            disabled={loading}
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 text-base"
          >
            {loading ? 'AI 재설계 중...' : 'AI로 직무 재설계'}
          </button>
        </div>

        {/* 직무 재설계 결과 */}
        {redesignResult && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">AI 직무 재설계 제안</h3>
            
            {redesignResult.analysis && (
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-700">{redesignResult.analysis}</p>
              </div>
            )}

            <div className="grid gap-4 md:grid-cols-2">
              {redesignResult.roles.map((role: any, index: number) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">{role.title}</h4>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs whitespace-nowrap ml-2">
                      {role.hours_per_week}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{role.description}</p>
                  
                  <div className="mb-3">
                    <h5 className="text-xs font-medium text-gray-700 mb-2">담당 업무</h5>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                      {role.responsibilities.map((resp: string, idx: number) => (
                        <li key={idx}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="text-xs font-medium text-gray-700 mb-2">필요 역량</h5>
                    <div className="flex flex-wrap gap-1">
                      {role.required_skills.map((skill: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 추천 시니어 인재 */}
        {seniors.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">추천 시니어 인재</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {seniors.map((senior) => (
                <div key={senior.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-900">{senior.name}</h4>
                    <span className="text-sm text-gray-500">{senior.age}세</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{senior.career_summary}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {senior.skills.slice(0, 4).map((skill: string, index: number) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                      >
                        #{skill}
                      </span>
                    ))}
                  </div>
                  <div className="text-sm text-gray-500">
                    <p>희망: {senior.work_preference}</p>
                    <p>가능 시간: {senior.available_hours}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
