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
  City
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
const CHANNELS: Channel[] = ['referral', 'podcast', 'search', 'event', 'linkedin', 'instagram'];
const PROGRAM_TYPES: ProgramType[] = ['english', 'undergraduate', 'masters', 'phd'];
const COUNTRIES: Country[] = ['USA', 'Canada', 'UK', 'Australia', 'Ireland', 'New Zealand'];
const LEAD_STATUSES: LeadStatus[] = ['new', 'contacted', 'qualified', 'converted'];
const PIPELINE_STAGES: PipelineStage[] = ['documentation', 'application', 'visa', 'payment', 'active'];

const UNIVERSITIES = [
  'Harvard University', 'MIT', 'Stanford University', 'University of Toronto',
  'McGill University', 'Oxford University', 'Cambridge University', 'Imperial College London',
  'University of Sydney', 'Australian National University', 'Trinity College Dublin',
  'University of Auckland', 'UCLA', 'UC Berkeley', 'Yale University', 'Princeton University'
];

// Generate Advisors
export const mockAdvisors: Advisor[] = [
  {
    id: 'adv-1',
    name: 'Patricia Gómez',
    email: 'patricia.gomez@estudiarenelexterior.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Patricia',
    leadsCount: 78,
    conversionsCount: 23,
    conversionRate: 29.5,
    revenue: 345000,
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
    revenue: 285000,
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
    revenue: 390000,
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
    revenue: 210000,
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
    revenue: 315000,
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
    revenue: 180000,
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
    revenue: 255000,
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
    revenue: 120000,
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
    expectedRevenue: getRandomNumber(8000, 25000)
  };
};

export const mockLeads: Lead[] = Array.from({ length: 500 }, (_, i) => generateLead(i + 1));

// Generate Students (converted leads)
const convertedLeads = mockLeads.filter(lead => lead.status === 'converted');
export const mockStudents: Student[] = convertedLeads.map((lead, index) => ({
  id: `student-${index + 1}`,
  leadId: lead.id,
  name: lead.name,
  email: lead.email,
  city: lead.city,
  stage: getRandomElement(PIPELINE_STAGES),
  programType: lead.programType,
  targetCountry: lead.targetCountry,
  university: getRandomElement(UNIVERSITIES),
  advisorId: lead.advisorId,
  revenue: lead.expectedRevenue,
  startDate: lead.convertedAt!,
  expectedGraduationDate: new Date(lead.convertedAt!.getTime() + (lead.programType === 'english' ? 180 : lead.programType === 'masters' ? 730 : 1460) * 24 * 60 * 60 * 1000),
  lastUpdated: getRandomDate(30)
}));

// Generate Historical Metrics (last 90 days)
export const mockHistoricalMetrics: MetricData[] = Array.from({ length: 90 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (89 - i));

  return {
    date,
    revenue: getRandomNumber(15000, 45000),
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

  const cac = getRandomNumber(800, 2500);
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
    amount: 15000
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
    amount: 8000
  },
  {
    id: 'act-5',
    type: 'conversion',
    title: 'Nueva Conversión',
    description: 'Firmó contrato',
    studentName: 'Valentina Silva',
    advisorName: 'Andrés Silva',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    amount: 18000
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
