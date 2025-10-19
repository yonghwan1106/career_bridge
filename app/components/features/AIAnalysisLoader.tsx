'use client';

import { motion } from 'framer-motion';
import { BrainCircuit, CheckCircle, Loader2 } from 'lucide-react';

interface Step {
  id: number;
  label: string;
  status: 'completed' | 'in_progress' | 'pending';
}

interface AIAnalysisLoaderProps {
  currentStep: number;
  totalSteps?: number;
}

export default function AIAnalysisLoader({ currentStep, totalSteps = 4 }: AIAnalysisLoaderProps) {
  const steps: Step[] = [
    { id: 1, label: '경력 텍스트 이해 완료', status: currentStep >= 1 ? 'completed' : 'pending' },
    { id: 2, label: '핵심 역량 추출 중', status: currentStep === 2 ? 'in_progress' : currentStep > 2 ? 'completed' : 'pending' },
    { id: 3, label: '역량 포트폴리오 생성', status: currentStep === 3 ? 'in_progress' : currentStep > 3 ? 'completed' : 'pending' },
    { id: 4, label: '추천 일자리 검색', status: currentStep === 4 ? 'in_progress' : currentStep > 4 ? 'completed' : 'pending' }
  ];

  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="bg-gradient-to-br from-accent-50 to-primary-50 rounded-2xl p-8 border-2 border-accent-200">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <BrainCircuit className="w-8 h-8 text-accent-600" />
        </motion.div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">
            AI가 경력을 분석하고 있습니다...
          </h3>
          <p className="text-sm text-gray-600">잠시만 기다려주세요</p>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-3 mb-6">
        {steps.map((step) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: step.id * 0.1 }}
            className="flex items-center gap-3"
          >
            {step.status === 'completed' && (
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
            )}
            {step.status === 'in_progress' && (
              <Loader2 className="w-5 h-5 text-accent-600 animate-spin flex-shrink-0" />
            )}
            {step.status === 'pending' && (
              <div className="w-5 h-5 border-2 border-gray-300 rounded-full flex-shrink-0"></div>
            )}
            <span className={`text-sm ${
              step.status === 'completed' ? 'text-green-700 font-semibold' :
              step.status === 'in_progress' ? 'text-accent-700 font-semibold' :
              'text-gray-500'
            }`}>
              {step.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="relative">
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
            className="h-full bg-gradient-to-r from-accent-500 to-primary-500 rounded-full"
          />
        </div>
        <p className="text-xs text-gray-600 mt-2 text-center font-semibold">
          {Math.round(progress)}% 완료
        </p>
      </div>
    </div>
  );
}
