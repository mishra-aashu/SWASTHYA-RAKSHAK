
export type Role = 'user' | 'kendra' | 'doctor' | 'admin';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string;
  role: Role;
  district: string;
  block?: string;
}

export interface Disease {
  id: string;
  name: string;
  name_hindi: string;
  category: 'viral' | 'bacterial' | 'waterborne' | 'vector-borne' | 'respiratory' | 'skin' | 'other';
  severity: 'low' | 'medium' | 'high' | 'critical';
  symptoms: string[];
}

export interface DiseaseReport {
  id: string;
  kendra_name: string;
  disease_name: string;
  disease_name_hindi: string;
  patient_count: number;
  severity: string;
  district: string;
  block: string;
  report_date: string;
  trend: 'increasing' | 'stable' | 'decreasing';
}

export interface HealthAlert {
  id: string;
  type: 'outbreak' | 'warning' | 'advisory' | 'info';
  severity: 'green' | 'yellow' | 'orange' | 'red';
  title: string;
  title_hindi: string;
  description: string;
  description_hindi: string;
  date: string;
}

export interface Prediction {
  disease: string;
  diseaseHindi: string;
  probability: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  peakExpected: string;
  preventionTips: string[];
  preventionTipsHindi: string[];
}
