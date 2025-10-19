// API Response Types

export interface Skill {
  name: string;
  level?: number;
}

export interface CareerAnalysisResult {
  skills: string[];
  experiences: string[];
  achievements?: string[];
  raw_analysis?: string;
}

export interface JobRole {
  title: string;
  description: string;
  hours_per_week: string;
  responsibilities: string[];
  required_skills: string[];
}

export interface JobRedesignResult {
  analysis?: string;
  roles: JobRole[];
}

export interface Senior {
  id: string;
  name: string;
  age: number;
  career_summary: string;
  skills: string[];
  work_preference: string;
  available_hours: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  description: string;
  employment_type: string;
  hours_per_week: string;
  salary_range: string;
  location: string;
  posted_date: string;
  required_skills: string[];
}

export interface SeniorsResponse {
  seniors: Senior[];
}

export interface JobsResponse {
  jobs: Job[];
}
