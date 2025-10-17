import {
  Advisor,
  Lead,
  Student,
  MetricData,
  ChannelMetric,
  PipelineMetric,
  Activity,
  LeadStatus,
  PipelineStage,
  Channel,
  ProgramType,
  Country,
  City,
  AgeRange,
  StudentStatus,
  WebMetric,
  MarketingCampaign,
  MarketingMetrics,
  DemographicData,
  CityData,
  ProgramPerformance,
  StudentSuccessMetric,
  FinancialMetric,
  AnnualMetric,
  ConversionFunnel,
  ExecutiveKPI
} from '@/types';

// Helper functions
const getRandomElement = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const getRandomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomDate = (daysAgo: number) => {
  const date = new Date();
  date.setDate(date.getDate() - getRandomNumber(0, daysAgo));
  return date;
};

// Constants
const FIRST_NAMES = [
  'Juan', 'María', 'Carlos', 'Ana', 'Luis', 'Laura', 'Diego', 'Valentina',
  'Andrés', 'Camila', 'Santiago', 'Daniela', 'Felipe', 'Isabella', 'Sebastián',
  'Sofía', 'Mateo', 'Gabriela', 'Alejandro', 'Paula', 'David', 'Carolina',
  'Miguel', 'Catalina', 'Nicolás', 'Juliana', 'Oscar', 'Natalia', 'Ricardo',
  'Melissa', 'Fernando', 'Andrea', 'Javier', 'Marcela', 'Eduardo', 'Diana'
];

const LAST_NAMES = [
  'García', 'Rodríguez', 'Martínez', 'López', 'González', 'Pérez', 'Sánchez',
  'Ramírez', 'Torres', 'Flores', 'Rivera', 'Gómez', 'Díaz', 'Cruz', 'Morales',
  'Reyes', 'Jiménez', 'Hernández', 'Ruiz', 'Mendoza', 'Ortiz', 'Vargas',
  'Castro', 'Rojas', 'Medina', 'Silva', 'Ramos', 'Romero', 'Gutiérrez'
];

const CITIES: City[] = ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena', 'Bucaramanga', 'Pereira', 'Manizales'];
const CHANNELS: Channel[] = ['referral', 'podcast', 'search', 'event', 'linkedin', 'instagram', 'facebook', 'google_ads', 'whatsapp'];
const PROGRAM_TYPES: ProgramType[] = ['english', 'undergraduate', 'masters', 'phd'];
const COUNTRIES: Country[] = ['USA', 'Canada', 'UK', 'Australia', 'Ireland', 'New Zealand', 'Germany'];
const LEAD_STATUSES: LeadStatus[] = ['new', 'contacted', 'qualified', 'converted'];
const PIPELINE_STAGES: PipelineStage[] = ['documentation', 'application', 'visa', 'payment', 'active'];
const AGE_RANGES: AgeRange[] = ['18-22', '23-27', '28-35', '36+'];
const STUDENT_STATUSES: StudentStatus[] = ['active', 'graduated', 'dropped', 'on_hold'];

const WEB_SOURCES = ['Google Organic', 'Facebook Ads', 'Instagram', 'LinkedIn', 'Direct', 'Email Campaign', 'Referral'];
const UTM_SOURCES = ['google', 'facebook', 'instagram', 'linkedin', 'email', 'referral'];
const UTM_MEDIUMS = ['cpc', 'social', 'email', 'organic', 'referral'];
const UTM_CAMPAIGNS = ['summer-2024', 'masters-promo', 'english-launch', 'becas-especiales', 'webinar-series'];

// Helper to convert age to age range
const getAgeRange = (age: number): AgeRange => {
  if (age <= 22) return '18-22';
  if (age <= 27) return '23-27';
  if (age <= 35) return '28-35';
  return '36+';
};

const UNIVERSITIES = [
  'Harvard University', 'MIT', 'Stanford University', 'University of Toronto',
  'McGill University', 'Oxford University', 'Cambridge University', 'Imperial College London',
  'University of Sydney', 'Australian National University', 'Trinity College Dublin',
  'University of Auckland', 'UCLA', 'UC Berkeley', 'Yale University', 'Princeton University'
];

// Generate Advisors (Realistic scale - $60k USD/month = 240M COP/month for all advisors)
// Each advisor handles ~62 leads/month, ~7-8 conversions/month
export const mockAdvisors: Advisor[] = [
  {
    id: 'adv-1',
    name: 'Patricia Gómez',
    email: 'patricia.gomez@estudiarenelexterior.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Patricia',
    leadsCount: 78,
    conversionsCount: 11,
    conversionRate: 14.1,
    revenue: 44_000_000, // ~$11k USD per month
    activeStudents: 9,
    joinedAt: new Date('2023-01-15')
  },
  {
    id: 'adv-2',
    name: 'Roberto Martínez',
    email: 'roberto.martinez@estudiarenelexterior.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Roberto',
    leadsCount: 65,
    conversionsCount: 9,
    conversionRate: 13.8,
    revenue: 36_000_000, // ~$9k USD
    activeStudents: 7,
    joinedAt: new Date('2023-02-20')
  },
  {
    id: 'adv-3',
    name: 'Claudia Ramírez',
    email: 'claudia.ramirez@estudiarenelexterior.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Claudia',
    leadsCount: 92,
    conversionsCount: 13,
    conversionRate: 14.1,
    revenue: 52_000_000, // ~$13k USD
    activeStudents: 11,
    joinedAt: new Date('2022-11-10')
  },
  {
    id: 'adv-4',
    name: 'Andrés Silva',
    email: 'andres.silva@estudiarenelexterior.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Andres',
    leadsCount: 55,
    conversionsCount: 7,
    conversionRate: 12.7,
    revenue: 28_000_000, // ~$7k USD
    activeStudents: 5,
    joinedAt: new Date('2023-04-05')
  },
  {
    id: 'adv-5',
    name: 'Valentina Torres',
    email: 'valentina.torres@estudiarenelexterior.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Valentina',
    leadsCount: 70,
    conversionsCount: 10,
    conversionRate: 14.3,
    revenue: 40_000_000, // ~$10k USD
    activeStudents: 8,
    joinedAt: new Date('2023-03-12')
  },
  {
    id: 'adv-6',
    name: 'Daniel Mendoza',
    email: 'daniel.mendoza@estudiarenelexterior.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Daniel',
    leadsCount: 48,
    conversionsCount: 6,
    conversionRate: 12.5,
    revenue: 24_000_000, // ~$6k USD
    activeStudents: 5,
    joinedAt: new Date('2023-05-18')
  },
  {
    id: 'adv-7',
    name: 'Carolina López',
    email: 'carolina.lopez@estudiarenelexterior.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carolina',
    leadsCount: 58,
    conversionsCount: 8,
    conversionRate: 13.8,
    revenue: 32_000_000, // ~$8k USD
    activeStudents: 7,
    joinedAt: new Date('2023-06-22')
  },
  {
    id: 'adv-8',
    name: 'Sebastián Vargas',
    email: 'sebastian.vargas@estudiarenelexterior.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sebastian',
    leadsCount: 34,
    conversionsCount: 4,
    conversionRate: 11.8,
    revenue: 16_000_000, // ~$4k USD
    activeStudents: 3,
    joinedAt: new Date('2023-08-01')
  }
];

// Generate Leads
const generateLead = (index: number): Lead => {
  const firstName = getRandomElement(FIRST_NAMES);
  const lastName = getRandomElement(LAST_NAMES);
  const status = getRandomElement(LEAD_STATUSES);
  const createdAt = getRandomDate(90);
  const firstVisitDate = new Date(createdAt.getTime() - getRandomNumber(1, 14) * 24 * 60 * 60 * 1000);

  return {
    id: `lead-${index}`,
    name: `${firstName} ${lastName}`,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${index}@email.com`,
    phone: `+57 ${getRandomNumber(300, 350)} ${getRandomNumber(100, 999)} ${getRandomNumber(1000, 9999)}`,
    city: getRandomElement(CITIES),
    status,
    channel: getRandomElement(CHANNELS),
    programType: getRandomElement(PROGRAM_TYPES),
    targetCountry: getRandomElement(COUNTRIES),
    advisorId: getRandomElement(mockAdvisors).id,
    createdAt,
    lastContactedAt: status !== 'new' ? new Date(createdAt.getTime() + getRandomNumber(1, 7) * 24 * 60 * 60 * 1000) : undefined,
    convertedAt: status === 'converted' ? new Date(createdAt.getTime() + getRandomNumber(14, 60) * 24 * 60 * 60 * 1000) : undefined,
    expectedRevenue: getRandomNumber(2_000_000, 8_000_000), // $500-$2k USD -> 2M-8M COP (avg ~4M)
    age: getRandomNumber(18, 45),
    webSource: getRandomElement(WEB_SOURCES),
    firstVisitDate,
    utmSource: getRandomElement(UTM_SOURCES),
    utmMedium: getRandomElement(UTM_MEDIUMS),
    utmCampaign: getRandomElement(UTM_CAMPAIGNS)
  };
};

export const mockLeads: Lead[] = Array.from({ length: 500 }, (_, i) => generateLead(i + 1));

// Generate Students (converted leads)
const convertedLeads = mockLeads.filter(lead => lead.status === 'converted');
export const mockStudents: Student[] = convertedLeads.map((lead, index) => {
  const age = lead.age || getRandomNumber(18, 45);
  const stage = getRandomElement(PIPELINE_STAGES);
  const isGraduated = stage === 'active' && Math.random() > 0.7;

  return {
    id: `student-${index + 1}`,
    leadId: lead.id,
    name: lead.name,
    email: lead.email,
    city: lead.city,
    stage,
    programType: lead.programType,
    targetCountry: lead.targetCountry,
    university: getRandomElement(UNIVERSITIES),
    advisorId: lead.advisorId,
    revenue: lead.expectedRevenue,
    startDate: lead.convertedAt!,
    expectedGraduationDate: new Date(lead.convertedAt!.getTime() + (lead.programType === 'english' ? 180 : lead.programType === 'masters' ? 730 : 1460) * 24 * 60 * 60 * 1000),
    lastUpdated: getRandomDate(30),
    age,
    ageRange: getAgeRange(age),
    status: isGraduated ? 'graduated' : getRandomElement(STUDENT_STATUSES),
    successScore: getRandomNumber(65, 100),
    graduationStatus: isGraduated ? 'graduated' : 'in_progress',
    gpa: Math.round((getRandomNumber(30, 45) / 10) * 10) / 10, // 3.0 - 4.5
    satisfactionScore: getRandomNumber(3, 5)
  };
});

// Generate Historical Metrics (last 90 days)
export const mockHistoricalMetrics: MetricData[] = Array.from({ length: 90 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (89 - i));

  return {
    date,
    revenue: getRandomNumber(6_000_000, 10_000_000), // ~$1.5k-2.5k USD daily -> 6M-10M COP
    leads: getRandomNumber(14, 20), // ~500 leads/month = ~16/day
    conversions: getRandomNumber(1, 3), // ~60 conversions/month = ~2/day
    activeStudents: 55 + getRandomNumber(-3, 3)
  };
});

// Last 30 days for trending
export const mockLast30DaysMetrics = mockHistoricalMetrics.slice(-30);

// Channel Metrics
export const mockChannelMetrics: ChannelMetric[] = CHANNELS.map(channel => {
  const leads = mockLeads.filter(l => l.channel === channel).length;
  const conversions = mockLeads.filter(l => l.channel === channel && l.status === 'converted').length;
  const revenue = mockLeads
    .filter(l => l.channel === channel && l.status === 'converted')
    .reduce((sum, l) => sum + l.expectedRevenue, 0);

  const cac = getRandomNumber(800_000, 2_000_000); // $200-$500 USD -> 800k-2M COP
  const ltv = revenue / Math.max(conversions, 1);

  return {
    channel,
    leads,
    conversions,
    revenue,
    cac,
    ltv,
    roi: ((ltv - cac) / cac) * 100
  };
});

// Pipeline Metrics
export const mockPipelineMetrics: PipelineMetric[] = PIPELINE_STAGES.map(stage => {
  const studentsInStage = mockStudents.filter(s => s.stage === stage);
  const count = studentsInStage.length;
  const revenue = studentsInStage.reduce((sum, s) => sum + s.revenue, 0);

  return {
    stage,
    count,
    revenue,
    averageDaysInStage: getRandomNumber(7, 45),
    conversionRate: getRandomNumber(60, 95)
  };
});

// Recent Activities
export const mockActivities: Activity[] = [
  {
    id: 'act-1',
    type: 'conversion',
    title: 'Nueva Conversión',
    description: 'Completó pago inicial',
    studentName: 'María González',
    advisorName: 'Patricia Gómez',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    amount: 4_200_000 // ~$1,050 USD
  },
  {
    id: 'act-2',
    type: 'stage_change',
    title: 'Cambio de Etapa',
    description: 'Avanzó a etapa de Visa',
    studentName: 'Carlos Ramírez',
    advisorName: 'Roberto Martínez',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000)
  },
  {
    id: 'act-3',
    type: 'new_lead',
    title: 'Nuevo Lead',
    description: 'Registrado desde Instagram',
    studentName: 'Ana Torres',
    advisorName: 'Claudia Ramírez',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000)
  },
  {
    id: 'act-4',
    type: 'payment',
    title: 'Pago Recibido',
    description: 'Segundo pago procesado',
    studentName: 'Luis Mendoza',
    advisorName: 'Valentina Torres',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
    amount: 3_800_000 // ~$950 USD
  },
  {
    id: 'act-5',
    type: 'conversion',
    title: 'Nueva Conversión',
    description: 'Firmó contrato',
    studentName: 'Valentina Silva',
    advisorName: 'Andrés Silva',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    amount: 5_200_000 // ~$1,300 USD
  },
  {
    id: 'act-6',
    type: 'stage_change',
    title: 'Cambio de Etapa',
    description: 'Documentación completada',
    studentName: 'Diego Vargas',
    advisorName: 'Carolina López',
    timestamp: new Date(Date.now() - 36 * 60 * 60 * 1000)
  }
];

// Current Month KPIs
const currentDate = new Date();
const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

export const getCurrentMonthMetrics = () => {
  const leadsThisMonth = mockLeads.filter(l => l.createdAt >= firstDayOfMonth);
  const conversionsThisMonth = mockLeads.filter(l => l.convertedAt && l.convertedAt >= firstDayOfMonth);
  const revenueThisMonth = conversionsThisMonth.reduce((sum, l) => sum + l.expectedRevenue, 0);

  return {
    revenue: revenueThisMonth,
    newLeads: leadsThisMonth.length,
    conversions: conversionsThisMonth.length,
    conversionRate: leadsThisMonth.length > 0 ? (conversionsThisMonth.length / leadsThisMonth.length) * 100 : 0,
    activeStudents: mockStudents.filter(s => s.stage === 'active').length
  };
};

// Top Advisors
export const getTopAdvisors = (limit: number = 5) => {
  return [...mockAdvisors]
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, limit);
};

// City Distribution
export const getCityDistribution = () => {
  return CITIES.map(city => ({
    city,
    leads: mockLeads.filter(l => l.city === city).length,
    conversions: mockLeads.filter(l => l.city === city && l.status === 'converted').length
  }));
};

// ============ MARKETING DASHBOARD DATA ============

// Web Metrics (last 30 days)
export const mockWebMetrics: WebMetric[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));

  const visits = getRandomNumber(800, 2000);
  const uniqueVisitors = Math.floor(visits * 0.7);
  const pageViews = visits * getRandomNumber(2, 4);

  return {
    date,
    visits,
    uniqueVisitors,
    pageViews,
    bounceRate: getRandomNumber(35, 65),
    avgSessionDuration: getRandomNumber(120, 420), // 2-7 minutes in seconds
    conversionRate: getRandomNumber(2, 8) / 10, // 0.2% - 0.8%
    source: getRandomElement(WEB_SOURCES)
  };
});

// Marketing Campaigns (Realistic scale)
export const mockMarketingCampaigns: MarketingCampaign[] = [
  {
    id: 'camp-1',
    name: 'Becas de Verano 2024',
    channel: 'facebook',
    investment: 2_500_000, // ~$625 USD
    leads: 145,
    conversions: 18,
    revenue: 72_000_000, // ~$18k USD
    cac: 139_000, // ~$35 USD
    roi: 2780,
    startDate: new Date('2024-06-01'),
    endDate: new Date('2024-08-31'),
    status: 'completed'
  },
  {
    id: 'camp-2',
    name: 'Masters Excellence Program',
    channel: 'google_ads',
    investment: 3_200_000, // ~$800 USD
    leads: 98,
    conversions: 14,
    revenue: 84_000_000, // ~$21k USD
    cac: 229_000, // ~$57 USD
    roi: 2525,
    startDate: new Date('2024-07-01'),
    status: 'active'
  },
  {
    id: 'camp-3',
    name: 'LinkedIn Professional Network',
    channel: 'linkedin',
    investment: 1_800_000, // ~$450 USD
    leads: 67,
    conversions: 11,
    revenue: 66_000_000, // ~$16.5k USD
    cac: 164_000, // ~$41 USD
    roi: 3567,
    startDate: new Date('2024-05-15'),
    status: 'active'
  },
  {
    id: 'camp-4',
    name: 'Instagram Stories Campaign',
    channel: 'instagram',
    investment: 1_200_000, // ~$300 USD
    leads: 203,
    conversions: 12,
    revenue: 48_000_000, // ~$12k USD
    cac: 100_000, // ~$25 USD
    roi: 3900,
    startDate: new Date('2024-08-01'),
    status: 'active'
  },
  {
    id: 'camp-5',
    name: 'Podcast Sponsorship Series',
    channel: 'podcast',
    investment: 1_000_000, // ~$250 USD
    leads: 89,
    conversions: 10,
    revenue: 50_000_000, // ~$12.5k USD
    cac: 100_000, // ~$25 USD
    roi: 4900,
    startDate: new Date('2024-04-01'),
    endDate: new Date('2024-09-30'),
    status: 'completed'
  },
  {
    id: 'camp-6',
    name: 'WhatsApp Business Automation',
    channel: 'whatsapp',
    investment: 500_000, // ~$125 USD
    leads: 156,
    conversions: 8,
    revenue: 32_000_000, // ~$8k USD
    cac: 63_000, // ~$16 USD
    roi: 6300,
    startDate: new Date('2024-09-01'),
    status: 'active'
  }
];

// Marketing Overall Metrics
export const getMarketingMetrics = (): MarketingMetrics => {
  const totalInvestment = mockMarketingCampaigns.reduce((sum, c) => sum + c.investment, 0);
  const totalLeads = mockMarketingCampaigns.reduce((sum, c) => sum + c.leads, 0);
  const totalConversions = mockMarketingCampaigns.reduce((sum, c) => sum + c.conversions, 0);
  const totalRevenue = mockMarketingCampaigns.reduce((sum, c) => sum + c.revenue, 0);

  return {
    totalInvestment,
    totalLeads,
    totalConversions,
    totalRevenue,
    averageCAC: totalInvestment / totalConversions,
    averageLTV: totalRevenue / totalConversions,
    overallROI: ((totalRevenue - totalInvestment) / totalInvestment) * 100,
    conversionRate: (totalConversions / totalLeads) * 100
  };
};

// ============ ESTUDIANTES DASHBOARD DATA ============

// Demographic Data by Age Range
export const mockDemographicData: DemographicData[] = AGE_RANGES.map(ageRange => {
  const studentsInRange = mockStudents.filter(s => s.ageRange === ageRange);
  const count = studentsInRange.length;
  const totalStudents = mockStudents.length;
  const revenue = studentsInRange.reduce((sum, s) => sum + s.revenue, 0);

  // Get leads in same age range
  const leadsInRange = mockLeads.filter(l => l.age && getAgeRange(l.age) === ageRange);
  const conversionsInRange = leadsInRange.filter(l => l.status === 'converted').length;

  return {
    ageRange,
    count,
    percentage: (count / totalStudents) * 100,
    averageRevenue: count > 0 ? revenue / count : 0,
    conversionRate: leadsInRange.length > 0 ? (conversionsInRange / leadsInRange.length) * 100 : 0
  };
});

// City Performance Data
export const mockCityData: CityData[] = CITIES.map(city => {
  const cityStudents = mockStudents.filter(s => s.city === city);
  const cityLeads = mockLeads.filter(l => l.city === city);
  const revenue = cityStudents.reduce((sum, s) => sum + s.revenue, 0);

  return {
    city,
    students: cityStudents.length,
    leads: cityLeads.length,
    revenue,
    growthRate: getRandomNumber(5, 25) / 10 // 0.5% - 2.5%
  };
});

// Program Performance
export const mockProgramPerformance: ProgramPerformance[] = PROGRAM_TYPES.map(programType => {
  const programStudents = mockStudents.filter(s => s.programType === programType);
  const count = programStudents.length;
  const revenue = programStudents.reduce((sum, s) => sum + s.revenue, 0);
  const completedStudents = programStudents.filter(s => s.graduationStatus === 'graduated');
  const satisfaction = programStudents.reduce((sum, s) => sum + (s.satisfactionScore || 0), 0);

  return {
    programType,
    students: count,
    revenue,
    averageRevenue: count > 0 ? revenue / count : 0,
    completionRate: count > 0 ? (completedStudents.length / count) * 100 : 0,
    satisfactionScore: count > 0 ? satisfaction / count : 0
  };
});

// Student Success Metrics
export const mockStudentSuccessMetrics: StudentSuccessMetric[] = [
  {
    metric: 'Tasa de Graduación',
    value: 87,
    benchmark: 75,
    trend: 'up'
  },
  {
    metric: 'GPA Promedio',
    value: 3.8,
    benchmark: 3.5,
    trend: 'up'
  },
  {
    metric: 'Satisfacción Promedio',
    value: 4.3,
    benchmark: 4.0,
    trend: 'up'
  },
  {
    metric: 'Tasa de Abandono',
    value: 5.2,
    benchmark: 8.0,
    trend: 'down'
  },
  {
    metric: 'Success Score',
    value: 85,
    benchmark: 78,
    trend: 'up'
  },
  {
    metric: 'Tiempo Promedio a Graduación (meses)',
    value: 18,
    benchmark: 24,
    trend: 'down'
  }
];

// ============ ANALYTICS DASHBOARD DATA ============

// Financial Metrics (last 12 months) - Realistic scale
export const mockFinancialMetrics: FinancialMetric[] = Array.from({ length: 12 }, (_, i) => {
  const date = new Date();
  date.setMonth(date.getMonth() - (11 - i));

  const revenue = getRandomNumber(180_000_000, 280_000_000); // $45k-$70k USD -> 180M-280M COP
  const costs = revenue * getRandomNumber(35, 42) / 100; // 35-42% of revenue
  const grossProfit = revenue - costs;
  const operatingExpenses = revenue * getRandomNumber(15, 22) / 100; // 15-22% of revenue
  const netProfit = grossProfit - operatingExpenses;

  return {
    date,
    revenue,
    costs,
    grossProfit,
    margin: (grossProfit / revenue) * 100,
    operatingExpenses,
    netProfit,
    cashFlow: netProfit + getRandomNumber(-10_000_000, 20_000_000) // some variance
  };
});

// Annual Metrics by Month
export const mockAnnualMetrics: AnnualMetric[] = [
  'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
  'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
].map((month, i) => {
  const monthMetrics = mockHistoricalMetrics.filter(m => {
    const metricMonth = m.date.getMonth();
    const currentMonth = new Date().getMonth();
    return metricMonth === (currentMonth - (11 - i) + 12) % 12;
  });

  const revenue = monthMetrics.reduce((sum, m) => sum + m.revenue, 0);
  const leads = monthMetrics.reduce((sum, m) => sum + m.leads, 0);
  const conversions = monthMetrics.reduce((sum, m) => sum + m.conversions, 0);
  const costs = revenue * 0.35; // 35% average cost

  return {
    month,
    revenue,
    costs,
    profit: revenue - costs,
    leads,
    conversions,
    students: getRandomNumber(100, 135)
  };
});

// Conversion Funnel (Realistic scale - proportional to ~500 leads/month)
export const mockConversionFunnel: ConversionFunnel[] = [
  {
    stage: 'Visitantes Web',
    count: 45000,
    percentage: 100,
    dropoffRate: 0
  },
  {
    stage: 'Leads Generados',
    count: 500,
    percentage: 1.1,
    dropoffRate: 98.9
  },
  {
    stage: 'Leads Contactados',
    count: 400,
    percentage: 0.89,
    dropoffRate: 20.0
  },
  {
    stage: 'Leads Calificados',
    count: 180,
    percentage: 0.4,
    dropoffRate: 55.0
  },
  {
    stage: 'Conversiones',
    count: 60,
    percentage: 0.13,
    dropoffRate: 66.7
  },
  {
    stage: 'Estudiantes Activos',
    count: 55,
    percentage: 0.12,
    dropoffRate: 8.3
  }
];

// Executive KPIs (Realistic scale - ~$720k USD/year = ~2.9B COP/year)
export const mockExecutiveKPIs: ExecutiveKPI[] = [
  {
    category: 'Revenue',
    name: 'Ingresos Anuales',
    value: 2_880_000_000, // $720k USD -> 2.88B COP (12 months * 240M)
    target: 3_200_000_000, // $800k USD -> 3.2B COP
    achievement: 90,
    trend: 'up'
  },
  {
    category: 'Revenue',
    name: 'Margen Neto',
    value: 42,
    target: 40,
    achievement: 105,
    trend: 'up'
  },
  {
    category: 'Growth',
    name: 'Nuevos Leads (anual)',
    value: 6000, // ~500/month * 12
    target: 6400,
    achievement: 93.8,
    trend: 'up'
  },
  {
    category: 'Growth',
    name: 'Tasa de Conversión',
    value: 12.0, // Realistic conversion rate
    target: 14.0,
    achievement: 85.7,
    trend: 'up'
  },
  {
    category: 'Efficiency',
    name: 'CAC Promedio',
    value: 1_200_000, // ~$300 USD
    target: 1_600_000, // ~$400 USD
    achievement: 133,
    trend: 'down'
  },
  {
    category: 'Efficiency',
    name: 'LTV/CAC Ratio',
    value: 3.3, // 4M avg commission / 1.2M CAC
    target: 3.0,
    achievement: 110,
    trend: 'up'
  },
  {
    category: 'Customer',
    name: 'Estudiantes Activos',
    value: 55,
    target: 65,
    achievement: 84.6,
    trend: 'up'
  },
  {
    category: 'Customer',
    name: 'Satisfacción Promedio',
    value: 4.3,
    target: 4.0,
    achievement: 107.5,
    trend: 'up'
  },
  {
    category: 'Customer',
    name: 'Tasa de Retención',
    value: 92.0,
    target: 90,
    achievement: 102.2,
    trend: 'up'
  }
];
