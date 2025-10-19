'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { DollarSign, Heart, TrendingUp } from 'lucide-react';

export default function ImpactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const impacts = [
    {
      icon: <DollarSign className="w-12 h-12 text-primary-600" />,
      title: '경제적 임팩트',
      items: [
        '노인 빈곤율 감소',
        '복지 비용 절감',
        '중소기업 경쟁력 강화'
      ]
    },
    {
      icon: <Heart className="w-12 h-12 text-primary-600" />,
      title: '사회적 임팩트',
      items: [
        '세대 간 지식 이전',
        '사회적 고립 해소',
        '존엄성 회복'
      ]
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-primary-600" />,
      title: '정책 기여',
      items: [
        'GDP 성장 기여',
        '세수 증대',
        '고용률 증가'
      ]
    }
  ];

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            기대되는 사회적 가치
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            단순한 구인구직을 넘어, 사회 문제를 해결하는
            <br className="hidden md:block" />
            경제적·사회적·정책적 트리플 임팩트
          </p>
        </motion.div>

        {/* Impact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {impacts.map((impact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-8 border-2 border-primary-100 hover:border-primary-300 transition-all duration-300 hover:shadow-xl"
            >
              <div className="mb-6">{impact.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {impact.title}
              </h3>
              <ul className="space-y-3">
                {impact.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <span className="text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
