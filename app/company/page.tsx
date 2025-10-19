'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../lib/store';
import { careerApi } from '../lib/api';
import Navigation from '../components/Navigation';
import { Building2, Sparkles, Users, Workflow } from 'lucide-react';
import { motion } from 'framer-motion';
import type { JobRedesignResult, Senior } from '../types';

export default function CompanyDashboard() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const [jobDescription, setJobDescription] = useState('');
  const [redesignResult, setRedesignResult] = useState<JobRedesignResult | null>(null);
  const [seniors, setSeniors] = useState<Senior[]>([]);
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
        const allSkills = result.roles.flatMap(role => role.required_skills);
        const uniqueSkills = [...new Set(allSkills)].slice(0, 3);
        const seniorsResult = await careerApi.getSeniors(uniqueSkills.join(','));
        setSeniors(seniorsResult.seniors || []);
      }
    } catch (err) {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-secondary-50/30 to-accent-50/30">
      {/* Header */}
      <header className="glass-card shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-xl">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-secondary-600 to-accent-600 bg-clip-text text-transparent">
                커리어 브릿지
              </h1>
              <p className="text-sm text-gray-600">기업 대시보드</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-2.5 text-sm font-semibold text-gray-700 hover:text-gray-900 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 hover:border-secondary-400"
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
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 glass-card p-6 rounded-2xl"
        >
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-6 h-6 text-secondary-600" />
            <h2 className="text-2xl font-bold text-gray-900">환영합니다!</h2>
          </div>
          <p className="text-gray-600 text-lg">AI가 직무를 재설계하고 최적의 시니어 전문가를 추천해드립니다.</p>
        </motion.div>

        {/* 직무 기술서 입력 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl shadow-lg p-8 mb-8 border-2 border-gray-200 hover:border-secondary-300 transition-all duration-300"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-secondary-100 rounded-lg">
              <Workflow className="w-6 h-6 text-secondary-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">직무 기술서 입력</h3>
          </div>

          {/* 예시 직무 기술서 버튼 */}
          <div className="mb-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">빠른 테스트를 위한 예시 직무</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setJobDescription('건설 프로젝트 관리자 (정규직)\n\n담당 업무:\n- 대형 건설 프로젝트 전체 일정 관리 및 공정 관리\n- 협력업체 선정 및 계약 관리\n- 예산 수립 및 원가 관리\n- 현장 안전 관리 및 품질 관리 총괄\n- 설계 변경 및 인허가 업무 조율\n- 주간/월간 진행 보고서 작성\n- 발주처 및 이해관계자 커뮤니케이션\n\n필요 역량:\n- AutoCAD, BIM 등 설계 도구 활용 능력\n- 건설 공정 관리 경험 10년 이상\n- 예산 및 원가 관리 능력\n- 안전관리 및 품질관리 경험\n- 리더십 및 팀 관리 능력\n\n근무 조건:\n- 정규직 (주 5일, 8시간)\n- 서울 본사 및 현장 순회\n- 연봉 7000만원~1억원')}
                className="px-4 py-2 bg-gradient-to-r from-secondary-100 to-accent-100 hover:from-secondary-200 hover:to-accent-200 text-secondary-800 rounded-lg text-sm font-medium border border-secondary-300 hover:border-secondary-400 transition-all"
              >
                건설 PM (정규직)
              </button>
              <button
                onClick={() => setJobDescription('디지털 마케팅 총괄 (정규직)\n\n담당 업무:\n- 브랜드 전체 마케팅 전략 수립 및 실행\n- SNS 마케팅 및 퍼포먼스 마케팅 총괄\n- 신제품 런칭 캠페인 기획 및 실행\n- 마케팅 데이터 분석 및 ROI 측정\n- 외부 마케팅 에이전시 관리\n- 마케팅팀 (5명) 관리 및 육성\n- 월간 마케팅 성과 보고\n\n필요 역량:\n- 디지털 마케팅 전략 수립 및 실행 경험 10년 이상\n- Google Analytics, SQL 등 데이터 분석 능력\n- SNS 마케팅 및 바이럴 마케팅 전문성\n- 브랜드 전략 및 포지셔닝 경험\n- 팀 리딩 및 프로젝트 관리 능력\n\n근무 조건:\n- 정규직 (주 5일, 8시간)\n- 강남 본사 근무\n- 연봉 8000만원~1.2억원')}
                className="px-4 py-2 bg-gradient-to-r from-secondary-100 to-accent-100 hover:from-secondary-200 hover:to-accent-200 text-secondary-800 rounded-lg text-sm font-medium border border-secondary-300 hover:border-secondary-400 transition-all"
              >
                마케팅 총괄 (정규직)
              </button>
              <button
                onClick={() => setJobDescription('재무팀장 (정규직)\n\n담당 업무:\n- 재무제표 작성 및 분석 (월별, 분기별, 연간)\n- 예산 수립 및 재무 계획 총괄\n- 자금 관리 및 현금 흐름 분석\n- 세무 신고 및 회계 감사 대응\n- 투자 분석 및 M&A 재무실사 지원\n- ERP 시스템 관리 및 개선\n- 재무팀 (3명) 관리 및 업무 분장\n\n필요 역량:\n- 재무/회계 분야 경력 15년 이상\n- 재무제표 분석 및 재무 전략 수립 능력\n- SAP, Oracle 등 ERP 시스템 활용 능력\n- 세무 및 회계 감사 대응 경험\n- 투자 분석 및 M&A 실사 경험\n- CPA 또는 관련 자격증 우대\n\n근무 조건:\n- 정규직 (주 5일, 8시간)\n- 여의도 본사 근무\n- 연봉 9000만원~1.5억원')}
                className="px-4 py-2 bg-gradient-to-r from-secondary-100 to-accent-100 hover:from-secondary-200 hover:to-accent-200 text-secondary-800 rounded-lg text-sm font-medium border border-secondary-300 hover:border-secondary-400 transition-all"
              >
                재무팀장 (정규직)
              </button>
            </div>
          </div>

          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full h-56 px-5 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 text-base resize-none transition-all duration-200"
            placeholder="직무 기술서를 입력해주세요.&#10;&#10;예시:&#10;마케팅 총괄 (정규직)&#10;- SNS 마케팅 전략 수립 및 실행&#10;- 콘텐츠 제작 및 캠페인 기획&#10;- 데이터 분석 및 성과 측정&#10;- 주니어 마케터 관리 및 교육"
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
            onClick={handleRedesign}
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            className="mt-6 w-full bg-gradient-to-r from-secondary-600 to-accent-600 hover:from-secondary-700 hover:to-accent-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 text-lg shadow-lg hover:shadow-xl"
          >
            {loading ? 'AI 재설계 중...' : 'AI로 직무 재설계'}
          </motion.button>
        </motion.div>

        {/* 직무 재설계 결과 */}
        {redesignResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl shadow-lg p-8 mb-8 border-2 border-secondary-200"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-lg">
                <Workflow className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">AI 직무 재설계 제안</h3>
            </div>

            {redesignResult.analysis && (
              <div className="mb-8 p-6 bg-gradient-to-br from-secondary-50 to-accent-50/30 rounded-xl border-2 border-secondary-200">
                <h4 className="text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">AI 종합 분석</h4>
                <p className="text-base text-gray-700 leading-relaxed">{redesignResult.analysis}</p>
              </div>
            )}

            <div className="grid gap-6 md:grid-cols-2">
              {redesignResult.roles.map((role, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-secondary-400 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="text-lg font-bold text-gray-900 flex-1">{role.title}</h4>
                    <span className="px-3 py-1.5 bg-green-100 text-green-800 rounded-lg text-xs font-bold whitespace-nowrap ml-3">
                      {role.hours_per_week}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">{role.description}</p>

                  <div className="mb-4">
                    <h5 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <span className="w-1 h-4 bg-gradient-to-b from-secondary-500 to-accent-500 rounded-full"></span>
                      담당 업무
                    </h5>
                    <ul className="space-y-1.5">
                      {role.responsibilities.map((resp: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="text-secondary-600 font-bold mt-0.5">•</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <span className="w-1 h-4 bg-gradient-to-b from-accent-500 to-primary-500 rounded-full"></span>
                      필요 역량
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {role.required_skills.map((skill: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 bg-gradient-to-r from-accent-100 to-primary-100 text-accent-800 rounded-lg text-xs font-semibold border border-accent-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* 추천 시니어 인재 */}
        {seniors.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl shadow-lg p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent-100 rounded-lg">
                  <Users className="w-6 h-6 text-accent-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">추천 시니어 인재</h3>
              </div>
              <span className="px-4 py-2 bg-gradient-to-r from-accent-100 to-primary-100 text-accent-800 rounded-full text-sm font-bold">
                {seniors.length}명 발견
              </span>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {seniors.map((senior, index) => (
                <motion.div
                  key={senior.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-accent-400 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-lg font-bold text-gray-900">{senior.name}</h4>
                    <span className="px-3 py-1.5 bg-primary-100 text-primary-800 rounded-lg text-xs font-bold">
                      {senior.age}세
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">{senior.career_summary}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {senior.skills.slice(0, 4).map((skill: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-800 rounded-lg text-xs font-semibold border border-primary-200"
                      >
                        #{skill}
                      </span>
                    ))}
                  </div>
                  <div className="pt-4 border-t-2 border-gray-100 space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <span className="font-bold text-gray-700">희망:</span>
                      <span className="text-gray-600">{senior.work_preference}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-bold text-gray-700">가능 시간:</span>
                      <span className="text-gray-600">{senior.available_hours}</span>
                    </div>
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
