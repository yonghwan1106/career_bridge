'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { TrendingUp, AlertCircle, Users } from 'lucide-react';

export default function ProblemSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const problems = [
    {
      icon: <Users className="w-12 h-12 text-primary-600" />,
      number: 20,
      suffix: '%',
      title: '65세 이상 인구',
      description: '초고령사회 진입',
      detail: '2025년 대한민국은 초고령사회로 공식 진입합니다'
    },
    {
      icon: <AlertCircle className="w-12 h-12 text-primary-600" />,
      number: 38.1,
      suffix: '%',
      title: 'OECD 최고',
      description: '노인 빈곤율',
      detail: 'OECD 평균 13.1%의 약 3배에 달하는 수치'
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-primary-600" />,
      number: null,
      suffix: '',
      title: '전문성을 가진',
      description: '시니어 인력 경제활동 배제',
      detail: '수십 년 경력이 사장되는 비효율'
    }
  ];

  // 애니메이션 카운터 컴포넌트
  const AnimatedNumber = ({ value, suffix, delay }: { value: number; suffix: string; delay: number }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isInView) return;

      const timer = setTimeout(() => {
        const duration = 2500; // 2.5초
        const steps = 60;
        const increment = value / steps;
        let current = 0;

        const interval = setInterval(() => {
          current += increment;
          if (current >= value) {
            setCount(value);
            clearInterval(interval);
          } else {
            setCount(current);
          }
        }, duration / steps);

        return () => clearInterval(interval);
      }, delay);

      return () => clearTimeout(timer);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isInView]);

    const displayValue = value % 1 !== 0 ? count.toFixed(1) : Math.floor(count);

    return <>{displayValue}{suffix}</>;
  };

  return (
    <section ref={ref} className="py-20 bg-gray-900" style={{ backgroundColor: '#111827', color: '#ffffff' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#ffffff' }}>
            우리가 풀고자 하는 문제
          </h2>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: '#d1d5db' }}>
            초고령사회 진입과 노인 빈곤, 그리고 전문 인력의 경제활동 배제라는
            <br className="hidden md:block" />
            국가적 위기를 AI 기술로 해결합니다
          </p>
        </motion.div>

        {/* Problem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-primary-500 transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/20"
              style={{ backgroundColor: '#1f2937', color: '#ffffff' }}
            >
              <div className="mb-6">{problem.icon}</div>

              <div className="mb-4">
                {problem.number !== null ? (
                  <div className="text-5xl font-bold text-primary-500">
                    <AnimatedNumber value={problem.number} suffix={problem.suffix} delay={index * 200} />
                  </div>
                ) : (
                  <div className="text-5xl font-bold text-primary-500">∞</div>
                )}
              </div>

              <h3 className="text-xl font-semibold mb-2" style={{ color: '#ffffff' }}>{problem.title}</h3>
              <p className="text-primary-400 font-medium mb-3" style={{ color: '#fb923c' }}>{problem.description}</p>
              <p className="text-sm leading-relaxed" style={{ color: '#d1d5db' }}>{problem.detail}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-block bg-primary-500/10 border border-primary-500/30 rounded-xl px-8 py-4">
            <p className="text-lg" style={{ color: '#ffffff' }}>
              <span className="font-semibold" style={{ color: '#fb923c' }}>국가 위기:</span> 생산가능인구 감소 + 복지 비용 증가
            </p>
            <p className="text-lg mt-2" style={{ color: '#ffffff' }}>
              <span className="font-semibold" style={{ color: '#fb923c' }}>개인 위기:</span> 경제적 자립 불가 + 전문성 사장
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
