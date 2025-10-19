import axios from 'axios';
import type { CareerAnalysisResult, JobRedesignResult, SeniorsResponse, JobsResponse, Senior, Job } from '../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const careerApi = {
  // 경력 분석
  analyzeCareer: async (careerText: string): Promise<CareerAnalysisResult> => {
    const response = await api.post<CareerAnalysisResult>('/analyze-career', { career_text: careerText });
    return response.data;
  },

  // 직무 재설계
  redesignJob: async (jobDescription: string): Promise<JobRedesignResult> => {
    const response = await api.post<JobRedesignResult>('/redesign-job', { job_description: jobDescription });
    return response.data;
  },

  // 시니어 목록 조회
  getSeniors: async (skills?: string): Promise<SeniorsResponse> => {
    const params = skills ? { skills } : {};
    const response = await api.get<SeniorsResponse>('/seniors', { params });
    return response.data;
  },

  // 일자리 목록 조회
  getJobs: async (skills?: string): Promise<JobsResponse> => {
    const params = skills ? { skills } : {};
    const response = await api.get<JobsResponse>('/jobs', { params });
    return response.data;
  },

  // 시니어 상세 조회
  getSeniorDetail: async (seniorId: string): Promise<Senior> => {
    const response = await api.get<Senior>(`/seniors/${seniorId}`);
    return response.data;
  },

  // 일자리 상세 조회
  getJobDetail: async (jobId: string): Promise<Job> => {
    const response = await api.get<Job>(`/jobs/${jobId}`);
    return response.data;
  },
};

export default api;
