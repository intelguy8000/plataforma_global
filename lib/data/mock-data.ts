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

// Generate Advisors (Revenue in COP - tasa $4,000 COP/USD)
export const mockAdvisors: Advisor[] = [
  {
    id: 'adv-1',
    name: 'Patricia Gómez',
    email: 'patricia.gomez@estudiarenelexterior.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Patricia',
    leadsCount: 78,
    conversionsCount: 23,
    conversionRate: 29.5,
    revenue: 1380000000, // $345k USD -> $1,380M COP
    activeStudents: 18,
    joinedAt: new Date('2023-01-15')
  },
  {
    id: 'adv-2',
    name: 'Roberto Martínez',
    email: 'roberto.martinez@estudiarenelexterior.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Roberto',
    leadsCount: 65,
    conversionsCount: 19,
    conversionRate: 29.2,
    revenue: 1140000000, // $285k USD -> $1,140M COP
    activeStudents: 15,
    joinedAt: new Date('2023-02-20')
  },
  {
    id: 'adv-3',
    name: 'Claudia Ramírez',
    email: 'claudia.ramirez@estudiarenelexterior.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Claudia',
    leadsCount: 92,
    conversionsCount: 26,
    conversionRate: 28.3,
    revenue: 1560000000, // $390k USD -> $1,560M COP
    activeStudents: 21,
    joinedAt: new Date('2022-11-10')
  },
  {
    id: 'adv-4',
    name: 'Andrés Silva',
    email: 'andres.silva@estudiarenelexterior.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Andres',
    leadsCount: 55,
    conversionsCount: 14,
    conversionRate: 25.5,
    revenue: 840000000, // $210k USD -> $840M COP
    activeStudents: 11,
    joinedAt: new Date('2023-04-05')
  },
  {
    id: 'adv-5',
    name: 'Valentina Torres',
    email: 'valentina.torres@estudiarenelexterior.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Valentina',
    leadsCount: 70,
    conversionsCount: 21,
    conversionRate: 30.0,
    revenue: 1260000000, // $315k USD -> $1,260M COP
    activeStudents: 17,
    joinedAt: new Date('2023-03-12')
  },
  {
    id: 'adv-6',
    name: 'Daniel Mendoza',
    email: 'daniel.mendoza@estudiarenelexterior.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Daniel',
    leadsCount: 48,
    conversionsCount: 12,
    conversionRate: 25.0,
    revenue: 720000000, // $180k USD -> $720M COP
    activeStudents: 9,
    joinedAt: new Date('2023-05-18')
  },
  {
    id: 'adv-7',
    name: 'Carolina López',
    email: 'carolina.lopez@estudiarenelexterior.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carolina',
    leadsCount: 58,
    conversionsCount: 17,
    conversionRate: 29.3,
    revenue: 1020000000, // $255k USD -> $1,020M COP
    activeStudents: 14,
    joinedAt: new Date('2023-06-22')
  },
  {
    id: 'adv-8',
    name: 'Sebastián Vargas',
    email: 'sebastian.vargas@estudiarenelexterior.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sebastian',
    leadsCount: 34,
    conversionsCount: 8,
    conversionRate: 23.5,
    revenue: 480000000, // $120k USD -> $480M COP
    activeStudents: 6,
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
    expectedRevenue: getRandomNumber(32000000, 100000000), // $8k-$25k USD -> $32M-$100M COP
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
    revenue: getRandomNumber(60000000, 180000000), // $15k-$45k USD -> $60M-$180M COP
    leads: getRandomNumber(3, 12),
    conversions: getRandomNumber(0, 3),
    activeStudents: 120 + getRandomNumber(-5, 5)
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

  const cac = getRandomNumber(3200000, 10000000); // $800-$2,500 USD -> $3.2M-$10M COP
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
    amount: 60000000 // $15k USD -> $60M COP
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
    amount: 32000000 // $8k USD -> $32M COP
  },
  {
    id: 'act-5',
    type: 'conversion',
    title: 'Nueva Conversión',
    description: 'Firmó contrato',
    studentName: 'Valentina Silva',
    advisorName: 'Andrés Silva',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    amount: 72000000 // $18k USD -> $72M COP
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

// Marketing Campaigns
export const mockMarketingCampaigns: MarketingCampaign[] = [
  {
    id: 'camp-1',
    name: 'Becas de Verano 2024',
    channel: 'facebook',
    investment: 48000000, // $12k USD -> $48M COP
    leads: 145,
    conversions: 23,
    revenue: 1380000000, // $345k USD
    cac: 2087000, // ~$521 USD
    roi: 2775,
    startDate: new Date('2024-06-01'),
    endDate: new Date('2024-08-31'),
    status: 'completed'
  },
  {
    id: 'camp-2',
    name: 'Masters Excellence Program',
    channel: 'google_ads',
    investment: 60000000, // $15k USD
    leads: 98,
    conversions: 31,
    revenue: 1860000000, // $465k USD
    cac: 1935000, // ~$484 USD
    roi: 3000,
    startDate: new Date('2024-07-01'),
    status: 'active'
  },
  {
    id: 'camp-3',
    name: 'LinkedIn Professional Network',
    channel: 'linkedin',
    investment: 32000000, // $8k USD
    leads: 67,
    conversions: 18,
    revenue: 1080000000, // $270k USD
    cac: 1778000, // ~$444 USD
    roi: 3275,
    startDate: new Date('2024-05-15'),
    status: 'active'
  },
  {
    id: 'camp-4',
    name: 'Instagram Stories Campaign',
    channel: 'instagram',
    investment: 24000000, // $6k USD
    leads: 203,
    conversions: 15,
    revenue: 900000000, // $225k USD
    cac: 1182000, // ~$295 USD
    roi: 3650,
    startDate: new Date('2024-08-01'),
    status: 'active'
  },
  {
    id: 'camp-5',
    name: 'Podcast Sponsorship Series',
    channel: 'podcast',
    investment: 16000000, // $4k USD
    leads: 89,
    conversions: 12,
    revenue: 720000000, // $180k USD
    cac: 1348000, // ~$337 USD
    roi: 4400,
    startDate: new Date('2024-04-01'),
    endDate: new Date('2024-09-30'),
    status: 'completed'
  },
  {
    id: 'camp-6',
    name: 'WhatsApp Business Automation',
    channel: 'whatsapp',
    investment: 8000000, // $2k USD
    leads: 156,
    conversions: 8,
    revenue: 480000000, // $120k USD
    cac: 1000000, // $250 USD
    roi: 5900,
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

// Financial Metrics (last 12 months)
export const mockFinancialMetrics: FinancialMetric[] = Array.from({ length: 12 }, (_, i) => {
  const date = new Date();
  date.setMonth(date.getMonth() - (11 - i));

  const revenue = getRandomNumber(1800000000, 3600000000); // $450k-$900k USD -> $1.8B-$3.6B COP
  const costs = revenue * getRandomNumber(25, 40) / 100; // 25-40% of revenue
  const grossProfit = revenue - costs;
  const operatingExpenses = revenue * getRandomNumber(15, 25) / 100; // 15-25% of revenue
  const netProfit = grossProfit - operatingExpenses;

  return {
    date,
    revenue,
    costs,
    grossProfit,
    margin: (grossProfit / revenue) * 100,
    operatingExpenses,
    netProfit,
    cashFlow: netProfit + getRandomNumber(-200000000, 400000000) // some variance
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

// Conversion Funnel
export const mockConversionFunnel: ConversionFunnel[] = [
  {
    stage: 'Visitantes Web',
    count: 45000,
    percentage: 100,
    dropoffRate: 0
  },
  {
    stage: 'Leads Generados',
    count: 2250,
    percentage: 5.0,
    dropoffRate: 95.0
  },
  {
    stage: 'Leads Contactados',
    count: 1800,
    percentage: 4.0,
    dropoffRate: 20.0
  },
  {
    stage: 'Leads Calificados',
    count: 900,
    percentage: 2.0,
    dropoffRate: 50.0
  },
  {
    stage: 'Conversiones',
    count: 270,
    percentage: 0.6,
    dropoffRate: 70.0
  },
  {
    stage: 'Estudiantes Activos',
    count: 132,
    percentage: 0.29,
    dropoffRate: 51.1
  }
];

// Executive KPIs
export const mockExecutiveKPIs: ExecutiveKPI[] = [
  {
    category: 'Revenue',
    name: 'Ingresos Anuales',
    value: 28800000000, // $7.2M USD -> $28.8B COP
    target: 32000000000, // $8M USD -> $32B COP
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
    value: 2250,
    target: 2400,
    achievement: 93.8,
    trend: 'up'
  },
  {
    category: 'Growth',
    name: 'Tasa de Conversión',
    value: 27.5,
    target: 25,
    achievement: 110,
    trend: 'up'
  },
  {
    category: 'Efficiency',
    name: 'CAC Promedio',
    value: 1900000, // ~$475 USD
    target: 2400000, // ~$600 USD
    achievement: 126,
    trend: 'down'
  },
  {
    category: 'Efficiency',
    name: 'LTV/CAC Ratio',
    value: 6.8,
    target: 5.0,
    achievement: 136,
    trend: 'up'
  },
  {
    category: 'Customer',
    name: 'Estudiantes Activos',
    value: 132,
    target: 150,
    achievement: 88,
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
    value: 94.8,
    target: 90,
    achievement: 105.3,
    trend: 'up'
  }
];
