export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'converted';
export type PipelineStage = 'documentation' | 'application' | 'visa' | 'payment' | 'active';
export type Channel = 'referral' | 'podcast' | 'search' | 'event' | 'linkedin' | 'instagram';
export type ProgramType = 'english' | 'undergraduate' | 'masters' | 'phd';
export type Country = 'USA' | 'Canada' | 'UK' | 'Australia' | 'Ireland' | 'New Zealand';
export type City = 'Bogotá' | 'Medellín' | 'Cali' | 'Barranquilla' | 'Cartagena' | 'Bucaramanga' | 'Pereira' | 'Manizales';

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
