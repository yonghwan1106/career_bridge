'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../lib/store';
import Navigation from '../../components/Navigation';
import { User, Mail, Phone, MapPin, Briefcase, Clock, Calendar, Save, BrainCircuit } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const [profile, setProfile] = useState({
    name: '홍길동',
    age: 62,
    email: user?.email || '',
    phone: '010-1234-5678',
    location: '서울 강남구',
    career_summary: '대형 건설사 현장 소장 30년 경력',
    work_preference: '주 2-3일, 프로젝트 기반',
    available_hours: '주 15-20시간',
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!user || user.role !== 'senior') {
      router.push('/login');
    }
  }, [user, router]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

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

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        {saved && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-6 bg-green-50 border-2 border-green-200 text-green-800 px-6 py-4 rounded-xl font-semibold flex items-center gap-3"
          >
            <Save className="w-5 h-5" />
            프로필이 성공적으로 저장되었습니다!
          </motion.div>
        )}

        {/* Profile Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl shadow-lg p-8 mb-8 border-2 border-primary-200"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white text-5xl font-bold shadow-xl">
                {profile.name[0]}
              </div>
              <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-lg border-2 border-primary-200">
                <User className="w-6 h-6 text-primary-600" />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{profile.name}</h2>
              <p className="text-lg text-gray-600 mb-4">{profile.career_summary}</p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <span className="px-4 py-2 bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-800 rounded-lg text-sm font-semibold border border-primary-200">
                  {profile.age}세
                </span>
                <span className="px-4 py-2 bg-gradient-to-r from-secondary-100 to-accent-100 text-secondary-800 rounded-lg text-sm font-semibold border border-secondary-200">
                  {profile.location}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Profile Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl shadow-lg p-8 border-2 border-gray-200"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <User className="w-6 h-6 text-primary-600" />
            </div>
            프로필 정보
          </h3>

          <div className="space-y-6">
            {/* Name and Age */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <User className="w-4 h-4 text-primary-600" />
                  이름
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 text-primary-600" />
                  나이
                </label>
                <input
                  type="number"
                  value={profile.age}
                  onChange={(e) => setProfile({...profile, age: parseInt(e.target.value)})}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Mail className="w-4 h-4 text-primary-600" />
                이메일
              </label>
              <input
                type="email"
                value={profile.email}
                disabled
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl bg-gray-100 text-gray-600 cursor-not-allowed"
              />
              <p className="mt-1 text-sm text-gray-500">이메일은 변경할 수 없습니다</p>
            </div>

            {/* Phone */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Phone className="w-4 h-4 text-primary-600" />
                연락처
              </label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({...profile, phone: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                placeholder="010-1234-5678"
              />
            </div>

            {/* Location */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <MapPin className="w-4 h-4 text-primary-600" />
                지역
              </label>
              <input
                type="text"
                value={profile.location}
                onChange={(e) => setProfile({...profile, location: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                placeholder="서울 강남구"
              />
            </div>

            {/* Career Summary */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Briefcase className="w-4 h-4 text-primary-600" />
                경력 요약
              </label>
              <textarea
                value={profile.career_summary}
                onChange={(e) => setProfile({...profile, career_summary: e.target.value})}
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all resize-none"
                placeholder="주요 경력을 간단히 요약해주세요"
              />
            </div>

            {/* Work Preference */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Briefcase className="w-4 h-4 text-primary-600" />
                희망 근무 형태
              </label>
              <input
                type="text"
                value={profile.work_preference}
                onChange={(e) => setProfile({...profile, work_preference: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                placeholder="주 2-3일, 프로젝트 기반"
              />
            </div>

            {/* Available Hours */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Clock className="w-4 h-4 text-primary-600" />
                가능 시간
              </label>
              <input
                type="text"
                value={profile.available_hours}
                onChange={(e) => setProfile({...profile, available_hours: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                placeholder="주 15-20시간"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row justify-end gap-4">
            <button
              onClick={() => router.push('/senior')}
              className="px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200 hover:border-gray-400"
            >
              취소
            </button>
            <motion.button
              onClick={handleSave}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              저장하기
            </motion.button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
