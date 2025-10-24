// Mock data para los nuevos módulos del sistema
import type {
  User,
  SystemComponent,
  DataSyncLog,
  SystemMetrics,
  Alert,
  Integration,
  ServiceHealth,
} from '@/types';

// ============================================
// USUARIOS Y ROLES
// ============================================

export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'Juan Sebastián',
    email: 'juan@jgsl.co',
    role: 'admin',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Juan',
    department: 'Dirección',
    phone: '+57 300 123 4567',
    lastLogin: new Date(2025, 9, 24, 9, 30),
    createdAt: new Date(2023, 0, 15),
    permissions: {
      viewDashboard: true,
      viewSales: true,
      viewMarketing: true,
      viewStudents: true,
      viewAnalytics: true,
      manageUsers: true,
      manageIntegrations: true,
      viewSystemArchitecture: true,
      exportData: true,
      configureAlerts: true,
    },
  },
  {
    id: 'user-2',
    name: 'María González',
    email: 'maria.gonzalez@jgsl.co',
    role: 'manager',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    department: 'Operaciones',
    phone: '+57 310 234 5678',
    lastLogin: new Date(2025, 9, 24, 8, 15),
    createdAt: new Date(2023, 2, 10),
    permissions: {
      viewDashboard: true,
      viewSales: true,
      viewMarketing: true,
      viewStudents: true,
      viewAnalytics: true,
      manageUsers: false,
      manageIntegrations: false,
      viewSystemArchitecture: true,
      exportData: true,
      configureAlerts: true,
    },
  },
  {
    id: 'user-3',
    name: 'Carlos Ramírez',
    email: 'carlos.ramirez@jgsl.co',
    role: 'advisor',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
    department: 'Asesoría Académica',
    phone: '+57 320 345 6789',
    lastLogin: new Date(2025, 9, 23, 18, 45),
    createdAt: new Date(2023, 5, 20),
    permissions: {
      viewDashboard: true,
      viewSales: true,
      viewMarketing: false,
      viewStudents: true,
      viewAnalytics: false,
      manageUsers: false,
      manageIntegrations: false,
      viewSystemArchitecture: false,
      exportData: false,
      configureAlerts: false,
    },
  },
  {
    id: 'user-4',
    name: 'Laura Martínez',
    email: 'laura.martinez@jgsl.co',
    role: 'marketing',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Laura',
    department: 'Marketing Digital',
    phone: '+57 315 456 7890',
    lastLogin: new Date(2025, 9, 24, 7, 0),
    createdAt: new Date(2023, 8, 5),
    permissions: {
      viewDashboard: true,
      viewSales: false,
      viewMarketing: true,
      viewStudents: false,
      viewAnalytics: true,
      manageUsers: false,
      manageIntegrations: false,
      viewSystemArchitecture: false,
      exportData: true,
      configureAlerts: false,
    },
  },
  {
    id: 'user-5',
    name: 'Andrés López',
    email: 'andres.lopez@jgsl.co',
    role: 'advisor',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Andres',
    department: 'Asesoría Académica',
    phone: '+57 318 567 8901',
    lastLogin: new Date(2025, 9, 24, 10, 20),
    createdAt: new Date(2024, 1, 12),
    permissions: {
      viewDashboard: true,
      viewSales: true,
      viewMarketing: false,
      viewStudents: true,
      viewAnalytics: false,
      manageUsers: false,
      manageIntegrations: false,
      viewSystemArchitecture: false,
      exportData: false,
      configureAlerts: false,
    },
  },
  {
    id: 'user-6',
    name: 'Diana Torres',
    email: 'diana.torres@jgsl.co',
    role: 'advisor',
    status: 'inactive',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Diana',
    department: 'Asesoría Académica',
    phone: '+57 312 678 9012',
    lastLogin: new Date(2025, 8, 15, 16, 30),
    createdAt: new Date(2023, 10, 8),
    permissions: {
      viewDashboard: true,
      viewSales: true,
      viewMarketing: false,
      viewStudents: true,
      viewAnalytics: false,
      manageUsers: false,
      manageIntegrations: false,
      viewSystemArchitecture: false,
      exportData: false,
      configureAlerts: false,
    },
  },
];

// ============================================
// ARQUITECTURA DE SISTEMAS
// ============================================

export const systemComponents: SystemComponent[] = [
  {
    id: 'comp-1',
    name: 'Base de Datos Cliente (MySQL)',
    type: 'database',
    status: 'online',
    uptime: 99.8,
    lastSync: new Date(2025, 9, 24, 8, 0),
    responseTime: 45,
    description: 'Base de datos principal del cliente con información de estudiantes y cursos',
  },
  {
    id: 'comp-2',
    name: 'Servicio ETL/Sync',
    type: 'service',
    status: 'online',
    uptime: 99.5,
    lastSync: new Date(2025, 9, 24, 8, 0),
    responseTime: 120,
    description: 'Proceso de sincronización que se ejecuta cada 8 horas',
    dependencies: ['comp-1'],
  },
  {
    id: 'comp-3',
    name: 'Data Warehouse',
    type: 'database',
    status: 'online',
    uptime: 99.9,
    lastSync: new Date(2025, 9, 24, 8, 15),
    responseTime: 32,
    description: 'Almacén de datos intermedio optimizado para analytics',
    dependencies: ['comp-2'],
  },
  {
    id: 'comp-4',
    name: 'API Plataforma Global',
    type: 'api',
    status: 'online',
    uptime: 99.95,
    responseTime: 28,
    description: 'API REST que alimenta el dashboard principal',
    dependencies: ['comp-3'],
  },
  {
    id: 'comp-5',
    name: 'Dashboard Web',
    type: 'service',
    status: 'online',
    uptime: 99.92,
    responseTime: 180,
    description: 'Aplicación frontend (Next.js)',
    dependencies: ['comp-4'],
  },
  {
    id: 'comp-6',
    name: 'WhatsApp Business API',
    type: 'integration',
    status: 'online',
    uptime: 98.5,
    lastSync: new Date(2025, 9, 24, 9, 45),
    responseTime: 250,
    description: 'Integración con WhatsApp para comunicación con estudiantes',
  },
  {
    id: 'comp-7',
    name: 'Sistema de Pagos (PayU)',
    type: 'integration',
    status: 'online',
    uptime: 99.7,
    responseTime: 190,
    description: 'Pasarela de pagos para procesamiento de transacciones',
  },
];

export const syncLogs: DataSyncLog[] = [
  {
    id: 'log-1',
    componentId: 'comp-2',
    timestamp: new Date(2025, 9, 24, 8, 0),
    status: 'synced',
    recordsProcessed: 1247,
    duration: 45,
  },
  {
    id: 'log-2',
    componentId: 'comp-2',
    timestamp: new Date(2025, 9, 24, 0, 0),
    status: 'synced',
    recordsProcessed: 1189,
    duration: 42,
  },
  {
    id: 'log-3',
    componentId: 'comp-2',
    timestamp: new Date(2025, 9, 23, 16, 0),
    status: 'synced',
    recordsProcessed: 1312,
    duration: 48,
  },
  {
    id: 'log-4',
    componentId: 'comp-2',
    timestamp: new Date(2025, 9, 23, 8, 0),
    status: 'synced',
    recordsProcessed: 1201,
    duration: 43,
  },
  {
    id: 'log-5',
    componentId: 'comp-2',
    timestamp: new Date(2025, 9, 23, 0, 0),
    status: 'error',
    recordsProcessed: 0,
    duration: 5,
    errorMessage: 'Connection timeout - retrying...',
  },
];

export const systemMetrics: SystemMetrics = {
  uptime: 99.87,
  totalRequests: 2847392,
  avgResponseTime: 87,
  errorRate: 0.13,
  lastSyncTime: new Date(2025, 9, 24, 8, 0),
  nextSyncTime: new Date(2025, 9, 24, 16, 0),
  dataFreshness: 2.5,
};

// ============================================
// ALERTAS Y NOTIFICACIONES
// ============================================

export const mockAlerts: Alert[] = [
  {
    id: 'alert-1',
    title: 'Pago pendiente - Estudiante en riesgo',
    message: 'Ana María Rodríguez tiene un pago pendiente desde hace 7 días. Curso: English Advanced B2.',
    severity: 'warning',
    category: 'business',
    status: 'unread',
    timestamp: new Date(2025, 9, 24, 9, 15),
    actionUrl: '/dashboard/sales',
  },
  {
    id: 'alert-2',
    title: 'Sincronización completada',
    message: 'Se sincronizaron 1,247 registros exitosamente desde la base de datos del cliente.',
    severity: 'info',
    category: 'system',
    status: 'read',
    timestamp: new Date(2025, 9, 24, 8, 5),
  },
  {
    id: 'alert-3',
    title: 'Meta de conversión alcanzada',
    message: 'Se superó la meta mensual de conversiones: 66 conversiones (meta: 50).',
    severity: 'info',
    category: 'business',
    status: 'read',
    timestamp: new Date(2025, 9, 23, 18, 30),
  },
  {
    id: 'alert-4',
    title: 'Estudiante próximo a graduación',
    message: 'Carlos Mendoza completa su programa English C1 en 2 semanas. Programar encuesta de satisfacción.',
    severity: 'info',
    category: 'student',
    status: 'unread',
    timestamp: new Date(2025, 9, 23, 14, 20),
    actionUrl: '/dashboard/students',
  },
  {
    id: 'alert-5',
    title: 'Tasa de conversión baja - Instagram',
    message: 'La campaña de Instagram tiene una conversión de 2.1% (por debajo del promedio de 8%).',
    severity: 'warning',
    category: 'business',
    status: 'read',
    timestamp: new Date(2025, 9, 23, 11, 0),
    actionUrl: '/dashboard/marketing',
  },
  {
    id: 'alert-6',
    title: 'Nuevo lead calificado',
    message: '15 nuevos leads calificados registrados hoy. Asignar a asesores disponibles.',
    severity: 'info',
    category: 'business',
    status: 'read',
    timestamp: new Date(2025, 9, 24, 7, 45),
  },
  {
    id: 'alert-7',
    title: 'Error de sincronización resuelto',
    message: 'El error de conexión del 23/10 a las 00:00 fue resuelto automáticamente.',
    severity: 'info',
    category: 'system',
    status: 'resolved',
    timestamp: new Date(2025, 9, 23, 0, 15),
    resolvedAt: new Date(2025, 9, 23, 0, 20),
  },
  {
    id: 'alert-8',
    title: 'Margen de ganancia en descenso',
    message: 'El margen neto disminuyó a 52% (vs 57% promedio). Revisar costos operativos.',
    severity: 'warning',
    category: 'financial',
    status: 'unread',
    timestamp: new Date(2025, 9, 22, 16, 0),
    actionUrl: '/dashboard/analytics',
  },
];

// ============================================
// INTEGRACIONES
// ============================================

export const mockIntegrations: Integration[] = [
  {
    id: 'int-1',
    name: 'Base de Datos Cliente',
    type: 'database',
    provider: 'MySQL 8.0',
    status: 'connected',
    lastSync: new Date(2025, 9, 24, 8, 0),
    syncFrequency: 'Cada 8 horas',
    recordsSynced: 1247,
    configuration: {
      endpoint: 'mysql://cliente-db.example.com:3306',
      database: 'idiomas_db',
      enabled: true,
    },
    healthCheck: {
      status: 'online',
      lastChecked: new Date(2025, 9, 24, 9, 50),
      latency: 45,
    },
  },
  {
    id: 'int-2',
    name: 'WhatsApp Business',
    type: 'messaging',
    provider: 'Meta',
    status: 'connected',
    lastSync: new Date(2025, 9, 24, 9, 45),
    syncFrequency: 'Tiempo real',
    recordsSynced: 342,
    configuration: {
      apiKey: 'wa_••••••••••••',
      enabled: true,
    },
    healthCheck: {
      status: 'online',
      lastChecked: new Date(2025, 9, 24, 9, 50),
      latency: 250,
    },
  },
  {
    id: 'int-3',
    name: 'PayU',
    type: 'payment',
    provider: 'PayU Colombia',
    status: 'connected',
    lastSync: new Date(2025, 9, 24, 9, 30),
    syncFrequency: 'Cada hora',
    recordsSynced: 89,
    configuration: {
      apiKey: 'pk_••••••••••••',
      enabled: true,
    },
    healthCheck: {
      status: 'online',
      lastChecked: new Date(2025, 9, 24, 9, 50),
      latency: 190,
    },
  },
  {
    id: 'int-4',
    name: 'HubSpot CRM',
    type: 'crm',
    provider: 'HubSpot',
    status: 'connected',
    lastSync: new Date(2025, 9, 24, 9, 0),
    syncFrequency: 'Cada 2 horas',
    recordsSynced: 554,
    configuration: {
      apiKey: 'hs_••••••••••••',
      enabled: true,
    },
    healthCheck: {
      status: 'online',
      lastChecked: new Date(2025, 9, 24, 9, 50),
      latency: 320,
    },
  },
  {
    id: 'int-5',
    name: 'Mailchimp',
    type: 'email',
    provider: 'Mailchimp',
    status: 'connected',
    lastSync: new Date(2025, 9, 24, 8, 30),
    syncFrequency: 'Cada 4 horas',
    recordsSynced: 1823,
    configuration: {
      apiKey: 'mc_••••••••••••',
      enabled: true,
    },
    healthCheck: {
      status: 'online',
      lastChecked: new Date(2025, 9, 24, 9, 50),
      latency: 280,
    },
  },
  {
    id: 'int-6',
    name: 'Google Analytics',
    type: 'crm',
    provider: 'Google',
    status: 'disconnected',
    syncFrequency: 'Cada hora',
    recordsSynced: 0,
    configuration: {
      enabled: false,
    },
    healthCheck: {
      status: 'offline',
      lastChecked: new Date(2025, 9, 20, 15, 0),
      latency: 0,
    },
  },
];

// ============================================
// SALUD DEL SISTEMA
// ============================================

export const serviceHealthData: ServiceHealth[] = [
  {
    serviceName: 'API Gateway',
    status: 'online',
    uptime: 99.95,
    responseTime: 28,
    metrics: [
      {
        name: 'CPU Usage',
        value: 34,
        unit: '%',
        status: 'healthy',
        threshold: 80,
        description: 'Uso del procesador',
      },
      {
        name: 'Memory Usage',
        value: 58,
        unit: '%',
        status: 'healthy',
        threshold: 85,
        description: 'Uso de memoria RAM',
      },
      {
        name: 'Request Rate',
        value: 1247,
        unit: 'req/min',
        status: 'healthy',
        threshold: 5000,
        description: 'Solicitudes por minuto',
      },
    ],
  },
  {
    serviceName: 'Database',
    status: 'online',
    uptime: 99.9,
    responseTime: 32,
    lastIncident: new Date(2025, 8, 12, 3, 15),
    metrics: [
      {
        name: 'Connections',
        value: 47,
        unit: 'active',
        status: 'healthy',
        threshold: 100,
        description: 'Conexiones activas',
      },
      {
        name: 'Query Time',
        value: 32,
        unit: 'ms',
        status: 'healthy',
        threshold: 100,
        description: 'Tiempo promedio de consulta',
      },
      {
        name: 'Storage',
        value: 67,
        unit: '%',
        status: 'warning',
        threshold: 80,
        description: 'Uso de almacenamiento',
      },
    ],
  },
  {
    serviceName: 'Cache (Redis)',
    status: 'online',
    uptime: 99.87,
    responseTime: 8,
    metrics: [
      {
        name: 'Hit Rate',
        value: 94,
        unit: '%',
        status: 'healthy',
        threshold: 85,
        description: 'Tasa de aciertos de caché',
      },
      {
        name: 'Memory',
        value: 42,
        unit: '%',
        status: 'healthy',
        threshold: 90,
        description: 'Uso de memoria',
      },
    ],
  },
  {
    serviceName: 'CDN',
    status: 'online',
    uptime: 99.98,
    responseTime: 15,
    metrics: [
      {
        name: 'Bandwidth',
        value: 3.2,
        unit: 'GB/h',
        status: 'healthy',
        threshold: 10,
        description: 'Ancho de banda utilizado',
      },
      {
        name: 'Cache Hit',
        value: 96,
        unit: '%',
        status: 'healthy',
        threshold: 90,
        description: 'Contenido servido desde caché',
      },
    ],
  },
];

// Función helper para obtener cantidad de alertas no leídas
export function getUnreadAlertsCount(): number {
  return mockAlerts.filter((alert) => alert.status === 'unread').length;
}

// Función helper para obtener integraciones activas
export function getActiveIntegrationsCount(): number {
  return mockIntegrations.filter((int) => int.status === 'connected').length;
}

// Función helper para obtener usuarios activos
export function getActiveUsersCount(): number {
  return mockUsers.filter((user) => user.status === 'active').length;
}
