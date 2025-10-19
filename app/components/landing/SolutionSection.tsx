'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { BrainCircuit, Wrench, Handshake, ArrowRight } from 'lucide-react';

export default function SolutionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const steps = [
    {
      icon: <BrainCircuit className="w-16 h-16 text-accent-600" />,
      title: 'AI 분석',
      subtitle: '경력을 역량 포트폴리오로 변환',
      description: '30년 경력을 핵심 역량, 주요 경험, 성과로 분해하여 시장 가치를 명확히 합니다',
      features: [
        '자연어 처리 기반 경력 분석',
        '구체적 역량 태그 추출',
        '시장 수요 매칭 점수 산출'
      ]
    },
    {
      icon: <Wrench className="w-16 h-16 text-accent-600" />,
      title: '직무 재설계',
      subtitle: '전일제를 유연한 역할로 재구성',
      description: '정규직 직무를 파트타임, 프로젝트, 멘토링 등 유연한 형태로 분할 제안합니다',
      features: [
        '워크셰어링 기반 직무 분할',
        '필요한 만큼만 고용',
        '비용 효율적 인력 활용'
      ]
    },
    {
      icon: <Handshake className="w-16 h-16 text-accent-600" />,
      title: '스마트 매칭',
      subtitle: '최적의 인재와 기업을 연결',
      description: 'AI 알고리즘으로 역량 기반 매칭을 수행하여 양쪽 모두에게 최적의 기회를 제공합니다',
      features: [
        '역량 기반 정밀 매칭',
        '실시간 추천 시스템',
        '상호 만족도 극대화'
      ]
    }
  ];

  return (
    <section ref={ref} className="py-20 bg-gradient-warm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            커리어 브릿지가 제공하는 솔루션
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            AI 기술로 시니어의 전문성과 기업의 수요를
            <br className="hidden md:block" />
            지능적으로 연결하는 3단계 프로세스
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 h-full border-2 border-transparent hover:border-accent-300"
              >
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-accent-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className="mb-6 mt-2">{step.icon}</div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-accent-600 font-semibold mb-4">
                  {step.subtitle}
                </p>

                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {step.description}
                </p>

                {/* Features */}
                <ul className="space-y-3">
                  {step.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-accent-600 rounded-full mt-2"></div>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Arrow (except for last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-8 transform -translate-y-1/2 z-10">
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                  >
                    <ArrowRight className="w-16 h-16 text-accent-400" />
                  </motion.div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-block bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl px-8 py-6 border-2 border-primary-200">
            <p className="text-lg text-gray-900 font-semibold">
              💡 단순한 구인구직이 아닌, <span className="text-primary-600">AI 기반 사회혁신 플랫폼</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
