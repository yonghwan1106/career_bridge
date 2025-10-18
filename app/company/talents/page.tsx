'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '../../lib/store';
import { careerApi } from '../../lib/api';

export default function TalentsPage() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [seniors, setSeniors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!user || user.role !== 'company') {
      router.push('/login');
      return;
    }
    loadSeniors();
  }, [user, router]);

  const loadSeniors = async () => {
    try {
      const result = await careerApi.getSeniors();
      setSeniors(result.seniors || []);
    } catch (err) {
      console.error('Failed to load seniors:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const filteredSeniors = seniors.filter(senior => 
    senior.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    senior.career_summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
    senior.skills.some((skill: string) => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (!user || user.role !== 'company') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link href="/company" className="text-blue-600 hover:text-blue-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">전체 인재 풀</h1>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            로그아웃
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <input
            type="text"
            placeholder="인재 검색 (이름, 경력, 역량)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">로딩 중...</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredSeniors.map((senior) => (
              <div key={senior.id} className="bg-white rounded-lg shadow hover:shadow-lg transition p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xl font-bold mr-4">
                      {senior.name[0]}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{senior.name}</h3>
                      <p className="text-sm text-gray-500">{senior.age}세</p>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-700 mb-4">{senior.career_summary}</p>

                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-gray-700 mb-2">핵심 역량</h4>
                  <div className="flex flex-wrap gap-1">
                    {senior.skills.slice(0, 4).map((skill: string, idx: number) => (
                      <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                        #{skill}
                      </span>
                    ))}
                    {senior.skills.length > 4 && (
                      <span className="px-2 py-1 bg-gray-50 text-gray-600 rounded text-xs">
                        +{senior.skills.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mb-4 text-sm text-gray-600">
                  <p>📍 {senior.location}</p>
                  <p>🕐 {senior.available_hours}</p>
                  <p>💼 {senior.work_preference}</p>
                </div>

                <div className="border-t pt-4">
                  <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition">
                    연락하기
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredSeniors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">검색 결과가 없습니다.</p>
          </div>
        )}
      </main>
    </div>
  );
}
