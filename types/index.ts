export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'converted';
export type PipelineStage = 'documentation' | 'application' | 'visa' | 'payment' | 'active';
export type Channel = 'referral' | 'podcast' | 'search' | 'event' | 'linkedin' | 'instagram' | 'facebook' | 'google_ads' | 'whatsapp';
export type ProgramType = 'english' | 'undergraduate' | 'masters' | 'phd';
export type Country = 'USA' | 'Canada' | 'UK' | 'Australia' | 'Ireland' | 'New Zealand' | 'Germany';
export type City = 'Bogotá' | 'Medellín' | 'Cali' | 'Barranquilla' | 'Cartagena' | 'Bucaramanga' | 'Pereira' | 'Manizales';
export type AgeRange = '18-22' | '23-27' | '28-35' | '36+';
export type StudentStatus = 'active' | 'graduated' | 'dropped' | 'on_hold';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: City;
  status: LeadStatus;
  channel: Channel;
  programType: ProgramType;
  targetCountry: Country;
  advisorId: string;
  createdAt: Date;
  lastContactedAt?: Date;
  convertedAt?: Date;
  expectedRevenue: number;
  age?: number;
  webSource?: string;
  firstVisitDate?: Date;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

export interface Student {
  id: string;
  leadId: string;
  name: string;
  email: string;
  city: City;
  stage: PipelineStage;
  programType: ProgramType;
  targetCountry: Country;
  university?: string;
  advisorId: string;
  revenue: number;
  startDate: Date;
  expectedGraduationDate: Date;
  lastUpdated: Date;
  age: number;
  ageRange: AgeRange;
  status: StudentStatus;
  successScore?: number; // 0-100 score
  graduationStatus?: 'graduated' | 'in_progress';
  gpa?: number;
  satisfactionScore?: number; // 1-5 rating
}

export interface Advisor {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  leadsCount: number;
  conversionsCount: number;
  conversionRate: number;
  revenue: number;
  activeStudents: number;
  joinedAt: Date;
}

export interface MetricData {
  date: Date;
  revenue: number;
  leads: number;
  conversions: number;
  activeStudents: number;
}

export interface ChannelMetric {
  channel: Channel;
  leads: number;
  conversions: number;
  revenue: number;
  cac: number; // Customer Acquisition Cost
  ltv: number; // Lifetime Value
  roi: number;
}

export interface PipelineMetric {
  stage: PipelineStage;
  count: number;
  revenue: number;
  averageDaysInStage: number;
  conversionRate: number;
}

export interface Activity {
  id: string;
  type: 'conversion' | 'stage_change' | 'new_lead' | 'payment';
  title: string;
  description: string;
  studentName: string;
  advisorName: string;
  timestamp: Date;
  amount?: number;
}

export interface DashboardFilters {
  dateRange: {
    from: Date;
    to: Date;
  };
  country?: Country;
  advisorId?: string;
  programType?: ProgramType;
}

export interface KPICard {
  title: string;
  value: string | number;
  change: number; // percentage change
  trend: 'up' | 'down' | 'neutral';
  icon: string;
}

// Marketing Dashboard Types
export interface WebMetric {
  date: Date;
  visits: number;
  uniqueVisitors: number;
  pageViews: number;
  bounceRate: number;
  avgSessionDuration: number; // in seconds
  conversionRate: number;
  source: string;
}

export interface MarketingCampaign {
  id: string;
  name: string;
  channel: Channel;
  investment: number; // COP
  leads: number;
  conversions: number;
  revenue: number; // COP
  cac: number; // Customer Acquisition Cost in COP
  roi: number; // Return on Investment percentage
  startDate: Date;
  endDate?: Date;
  status: 'active' | 'paused' | 'completed';
}

export interface MarketingMetrics {
  totalInvestment: number;
  totalLeads: number;
  totalConversions: number;
  totalRevenue: number;
  averageCAC: number;
  averageLTV: number;
  overallROI: number;
  conversionRate: number;
}

// Estudiantes Dashboard Types
export interface DemographicData {
  ageRange: AgeRange;
  count: number;
  percentage: number;
  averageRevenue: number;
  conversionRate: number;
}

export interface CityData {
  city: City;
  students: number;
  leads: number;
  revenue: number;
  growthRate: number;
}

export interface ProgramPerformance {
  programType: ProgramType;
  students: number;
  revenue: number;
  averageRevenue: number;
  completionRate: number;
  satisfactionScore: number;
}

export interface StudentSuccessMetric {
  metric: string;
  value: number;
  benchmark: number;
  trend: 'up' | 'down' | 'neutral';
  isInverse?: boolean; // true for metrics where lower is better (abandono, tiempo)
}

// Analytics Dashboard Types
export interface FinancialMetric {
  date: Date;
  revenue: number;
  costs: number;
  grossProfit: number;
  margin: number; // percentage
  operatingExpenses: number;
  netProfit: number;
  cashFlow: number;
}

export interface AnnualMetric {
  month: string;
  revenue: number;
  costs: number;
  profit: number;
  leads: number;
  conversions: number;
  students: number;
}

export interface ConversionFunnel {
  stage: string;
  count: number;
  percentage: number;
  dropoffRate: number;
}

export interface ExecutiveKPI {
  category: string;
  name: string;
  value: number;
  target: number;
  achievement: number; // percentage
  trend: 'up' | 'down' | 'neutral';
}
