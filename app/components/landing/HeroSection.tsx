'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowRight, AlertCircle, Lightbulb, TrendingUp, Rocket } from 'lucide-react';

export default function HeroSection() {
  const router = useRouter();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navItems = [
    { id: 'problem', label: '문제점', icon: AlertCircle },
    { id: 'solution', label: '해결책', icon: Lightbulb },
    { id: 'impact', label: '사회적 가치', icon: TrendingUp },
    { id: 'cta', label: '시작하기', icon: Rocket },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Logo/Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-8"
        >
          <Sparkles className="w-5 h-5 text-white" />
          <span className="text-white font-semibold">2025 미래한국 아이디어 공모전</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
        >
          경력을 자산으로,
          <br />
          은퇴를 기회로
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto"
        >
          AI가 시니어 전문가의 30년 경험을 분석하여
          <br className="hidden md:block" />
          기업과 연결하는 혁신적인 일자리 플랫폼
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={() => router.push('/login?role=senior')}
            className="group bg-white text-primary-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center gap-2"
          >
            시니어로 시작하기
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => router.push('/login?role=company')}
            className="group bg-white/10 backdrop-blur-sm text-white border-2 border-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
          >
            기업으로 시작하기
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* Demo Badge */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 text-white/80 text-sm"
        >
          데모 계정으로 무료 체험 가능 | senior@demo.com / company@demo.com
        </motion.p>

        {/* Section Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-16 flex flex-wrap justify-center gap-3"
        >
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(item.id)}
                className="group flex items-center gap-2 px-5 py-3 bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-xl text-white font-semibold hover:bg-white/20 hover:border-white/50 transition-all duration-300"
              >
                <Icon className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span>{item.label}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2"
          >
            <div className="w-1 h-3 bg-white/50 rounded-full"></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
