'use client';

import { motion } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

interface SkillsChartProps {
  skills: string[];
}

export default function SkillsChart({ skills }: SkillsChartProps) {
  // 스킬을 차트 데이터로 변환 (랜덤 점수 부여 - 실제로는 AI 분석 결과 사용)
  const chartData = skills.slice(0, 6).map((skill) => ({
    skill: skill.length > 10 ? skill.substring(0, 10) + '...' : skill,
    value: 70 + Math.random() * 30, // 70-100 사이의 값
    fullLabel: skill
  }));

  return (
    <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-6 border-2 border-primary-200">
      <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
        역량 레이더 차트
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={chartData}>
          <PolarGrid stroke="#D1D5DB" />
          <PolarAngleAxis
            dataKey="skill"
            tick={{ fill: '#374151', fontSize: 12 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: '#6B7280', fontSize: 10 }}
          />
          <Radar
            name="역량 점수"
            dataKey="value"
            stroke="#F97316"
            fill="#F97316"
            fillOpacity={0.6}
            animationDuration={1000}
          />
        </RadarChart>
      </ResponsiveContainer>

      <div className="mt-6 grid grid-cols-2 gap-3">
        {chartData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg p-3 border border-primary-200"
          >
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700 truncate flex-1" title={item.fullLabel}>
                {item.fullLabel}
              </span>
              <span className="text-xs font-bold text-primary-600 ml-2">
                {Math.round(item.value)}%
              </span>
            </div>
            <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${item.value}%` }}
                transition={{ duration: 1, delay: index * 0.1 }}
                className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
