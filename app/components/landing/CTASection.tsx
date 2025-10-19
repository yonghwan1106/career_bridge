'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowRight, Download, Github } from 'lucide-react';

export default function CTASection() {
  const router = useRouter();

  return (
    <section className="py-20 bg-gradient-to-br from-primary-600 via-accent-600 to-secondary-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            지금 바로 커리어 브릿지를 경험하세요
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            데모 계정으로 무료 체험 가능합니다
            <br />
            AI 기반 경력 분석과 직무 재설계를 직접 경험해보세요
          </p>

          {/* Main CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={() => router.push('/login')}
              className="group bg-white text-primary-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              시니어 계정으로 시작
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => router.push('/login')}
              className="group bg-white text-secondary-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              기업 계정으로 시작
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Demo Account Info */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto mb-12">
            <p className="text-white font-semibold mb-3">데모 계정 정보</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-white/10 rounded-lg p-3">
                <p className="text-white/80 mb-1">시니어 계정</p>
                <p className="text-white font-mono">senior@demo.com</p>
                <p className="text-white font-mono">password123</p>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <p className="text-white/80 mb-1">기업 계정</p>
                <p className="text-white font-mono">company@demo.com</p>
                <p className="text-white font-mono">password123</p>
              </div>
            </div>
          </div>

          {/* Additional Links */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <p className="text-white/80 text-sm">또는 프로젝트에 대해 더 알아보기:</p>
            <div className="flex gap-4">
              <button
                className="flex items-center gap-2 text-white hover:text-white/80 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span className="text-sm">제안서 다운로드</span>
              </button>
              <button
                className="flex items-center gap-2 text-white hover:text-white/80 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span className="text-sm">GitHub</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
