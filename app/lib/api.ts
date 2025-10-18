import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const careerApi = {
  // 경력 분석
  analyzeCareer: async (careerText: string) => {
    const response = await api.post('/analyze-career', { career_text: careerText });
    return response.data;
  },
  
  // 직무 재설계
  redesignJob: async (jobDescription: string) => {
    const response = await api.post('/redesign-job', { job_description: jobDescription });
    return response.data;
  },
  
  // 시니어 목록 조회
  getSeniors: async (skills?: string) => {
    const params = skills ? { skills } : {};
    const response = await api.get('/seniors', { params });
    return response.data;
  },
  
  // 일자리 목록 조회
  getJobs: async (skills?: string) => {
    const params = skills ? { skills } : {};
    const response = await api.get('/jobs', { params });
    return response.data;
  },
  
  // 시니어 상세 조회
  getSeniorDetail: async (seniorId: string) => {
    const response = await api.get(`/seniors/${seniorId}`);
    return response.data;
  },
  
  // 일자리 상세 조회
  getJobDetail: async (jobId: string) => {
    const response = await api.get(`/jobs/${jobId}`);
    return response.data;
  },
};

export default api;
