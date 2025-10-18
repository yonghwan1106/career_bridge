'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../lib/store';

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = login(email, password);
    
    if (success) {
      // 역할에 따라 리다이렉트
      if (email === 'senior@demo.com') {
        router.push('/senior');
      } else if (email === 'company@demo.com') {
        router.push('/company');
      }
    } else {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  // 데모 계정으로 자동 로그인
  const handleDemoLogin = (accountType: 'senior' | 'company') => {
    setError('');
    
    const credentials = {
      senior: { email: 'senior@demo.com', password: 'password123' },
      company: { email: 'company@demo.com', password: 'password123' }
    };
    
    const { email, password } = credentials[accountType];
    const success = login(email, password);
    
    if (success) {
      if (accountType === 'senior') {
        router.push('/senior');
      } else {
        router.push('/company');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">커리어 브릿지</h1>
          <p className="text-gray-600">AI 시니어 동반 성장 플랫폼</p>
        </div>

        {/* 빠른 데모 로그인 버튼 */}
        <div className="mb-6 space-y-3">
          <p className="text-sm font-semibold text-gray-700 text-center mb-3">
            빠른 체험하기 (클릭 한 번으로 로그인)
          </p>
          
          <button
            onClick={() => handleDemoLogin('senior')}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.02]"
          >
            <div className="flex items-center justify-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>시니어로 체험하기</span>
            </div>
            <p className="text-xs text-blue-100 mt-1">경력 분석 및 일자리 추천</p>
          </button>

          <button
            onClick={() => handleDemoLogin('company')}
            className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-lg transition duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.02]"
          >
            <div className="flex items-center justify-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span>기업으로 체험하기</span>
            </div>
            <p className="text-xs text-purple-100 mt-1">직무 재설계 및 인재 추천</p>
          </button>
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">또는 직접 입력</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              이메일
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
              placeholder="이메일을 입력하세요"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
              placeholder="비밀번호를 입력하세요"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 text-base"
          >
            로그인
          </button>
        </form>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-xs font-semibold text-gray-700 mb-2">데모 계정 정보</p>
          <div className="space-y-1 text-xs text-gray-600">
            <div>
              <p className="font-medium">시니어: senior@demo.com / password123</p>
            </div>
            <div>
              <p className="font-medium">기업: company@demo.com / password123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
