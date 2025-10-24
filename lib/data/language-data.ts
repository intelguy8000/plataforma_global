// Data específica para agencias de idiomas
// Este archivo complementa los datos existentes con información específica del sector

export type LanguageProgram = 'english' | 'french' | 'german' | 'portuguese' | 'italian' | 'chinese';
export type LanguageLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
export type CourseType = 'presencial' | 'virtual' | 'hibrido' | 'inmersion';
export type Certification = 'TOEFL' | 'IELTS' | 'Cambridge' | 'DELF' | 'DELE' | 'Goethe' | 'CELPE-Bras';

export interface LanguageCourse {
  id: string;
  name: string;
  program: LanguageProgram;
  level: LanguageLevel;
  type: CourseType;
  duration: number; // meses
  hoursPerWeek: number;
  price: number; // COP
  studentsEnrolled: number;
  capacity: number;
  startDate: Date;
  endDate: Date;
  instructor: string;
  status: 'active' | 'completed' | 'upcoming';
}

export interface CertificationExam {
  id: string;
  studentId: string;
  studentName: string;
  certification: Certification;
  examDate: Date;
  score?: number;
  maxScore: number;
  passed: boolean;
  targetLevel: LanguageLevel;
  preparationCourse?: string;
}

export interface LanguageStudent {
  id: string;
  name: string;
  email: string;
  program: LanguageProgram;
  currentLevel: LanguageLevel;
  targetLevel: LanguageLevel;
  courseType: CourseType;
  enrollmentDate: Date;
  progressPercentage: number; // 0-100
  attendanceRate: number; // 0-100
  averageGrade: number; // 0-100
  certificationGoal?: Certification;
  nextExamDate?: Date;
}

// Datos mock de cursos
export const mockLanguageCourses: LanguageCourse[] = [
  {
    id: 'course-1',
    name: 'English General A1',
    program: 'english',
    level: 'A1',
    type: 'presencial',
    duration: 3,
    hoursPerWeek: 8,
    price: 850000,
    studentsEnrolled: 18,
    capacity: 20,
    startDate: new Date(2025, 0, 15),
    endDate: new Date(2025, 3, 15),
    instructor: 'María González',
    status: 'active',
  },
  {
    id: 'course-2',
    name: 'English Business B2',
    program: 'english',
    level: 'B2',
    type: 'hibrido',
    duration: 4,
    hoursPerWeek: 6,
    price: 1200000,
    studentsEnrolled: 15,
    capacity: 15,
    startDate: new Date(2024, 11, 1),
    endDate: new Date(2025, 3, 1),
    instructor: 'Carlos Ramírez',
    status: 'active',
  },
  {
    id: 'course-3',
    name: 'TOEFL Preparation',
    program: 'english',
    level: 'B2',
    type: 'virtual',
    duration: 2,
    hoursPerWeek: 10,
    price: 950000,
    studentsEnrolled: 22,
    capacity: 25,
    startDate: new Date(2025, 1, 1),
    endDate: new Date(2025, 2, 30),
    instructor: 'Laura Martínez',
    status: 'active',
  },
  {
    id: 'course-4',
    name: 'IELTS Advanced C1',
    program: 'english',
    level: 'C1',
    type: 'virtual',
    duration: 3,
    hoursPerWeek: 8,
    price: 1400000,
    studentsEnrolled: 12,
    capacity: 15,
    startDate: new Date(2025, 0, 20),
    endDate: new Date(2025, 3, 20),
    instructor: 'Andrés López',
    status: 'active',
  },
  {
    id: 'course-5',
    name: 'French A2 Intensivo',
    program: 'french',
    level: 'A2',
    type: 'presencial',
    duration: 2,
    hoursPerWeek: 12,
    price: 1100000,
    studentsEnrolled: 10,
    capacity: 12,
    startDate: new Date(2025, 1, 10),
    endDate: new Date(2025, 3, 10),
    instructor: 'Sophie Dubois',
    status: 'active',
  },
];

// Datos mock de certificaciones
export const mockCertifications: CertificationExam[] = [
  {
    id: 'cert-1',
    studentId: 'st-1',
    studentName: 'Ana María Rodríguez',
    certification: 'TOEFL',
    examDate: new Date(2025, 2, 15),
    score: 95,
    maxScore: 120,
    passed: true,
    targetLevel: 'B2',
    preparationCourse: 'course-3',
  },
  {
    id: 'cert-2',
    studentId: 'st-2',
    studentName: 'Carlos Mendoza',
    certification: 'IELTS',
    examDate: new Date(2025, 3, 1),
    score: 7.5,
    maxScore: 9,
    passed: true,
    targetLevel: 'C1',
    preparationCourse: 'course-4',
  },
  {
    id: 'cert-3',
    studentId: 'st-3',
    studentName: 'Diana Torres',
    certification: 'Cambridge',
    examDate: new Date(2025, 2, 20),
    score: 180,
    maxScore: 230,
    passed: true,
    targetLevel: 'B2',
  },
  {
    id: 'cert-4',
    studentId: 'st-4',
    studentName: 'Juan Pérez',
    certification: 'TOEFL',
    examDate: new Date(2025, 4, 5),
    passed: false,
    targetLevel: 'B2',
    maxScore: 120,
  },
];

// Datos mock de estudiantes de idiomas
export const mockLanguageStudents: LanguageStudent[] = [
  {
    id: 'ls-1',
    name: 'Ana María Rodríguez',
    email: 'ana.rodriguez@example.com',
    program: 'english',
    currentLevel: 'B2',
    targetLevel: 'C1',
    courseType: 'virtual',
    enrollmentDate: new Date(2024, 10, 1),
    progressPercentage: 75,
    attendanceRate: 95,
    averageGrade: 88,
    certificationGoal: 'TOEFL',
    nextExamDate: new Date(2025, 5, 15),
  },
  {
    id: 'ls-2',
    name: 'Carlos Mendoza',
    email: 'carlos.mendoza@example.com',
    program: 'english',
    currentLevel: 'C1',
    targetLevel: 'C2',
    courseType: 'hibrido',
    enrollmentDate: new Date(2024, 8, 15),
    progressPercentage: 92,
    attendanceRate: 98,
    averageGrade: 92,
    certificationGoal: 'IELTS',
  },
  {
    id: 'ls-3',
    name: 'Diana Torres',
    email: 'diana.torres@example.com',
    program: 'french',
    currentLevel: 'A2',
    targetLevel: 'B1',
    courseType: 'presencial',
    enrollmentDate: new Date(2025, 0, 10),
    progressPercentage: 45,
    attendanceRate: 88,
    averageGrade: 82,
    certificationGoal: 'DELF',
    nextExamDate: new Date(2025, 6, 20),
  },
];

// Métricas de programas de idiomas
export const programMetrics = {
  english: {
    studentsEnrolled: 450,
    averageCompletion: 87,
    certificationRate: 78,
    revenue: 245000000, // COP
    growthRate: 15,
  },
  french: {
    studentsEnrolled: 85,
    averageCompletion: 82,
    certificationRate: 72,
    revenue: 48000000,
    growthRate: 22,
  },
  german: {
    studentsEnrolled: 42,
    averageCompletion: 79,
    certificationRate: 68,
    revenue: 22000000,
    growthRate: 8,
  },
  portuguese: {
    studentsEnrolled: 38,
    averageCompletion: 85,
    certificationRate: 75,
    revenue: 18000000,
    growthRate: 18,
  },
};

// Tasas de aprobación de certificaciones
export const certificationRates = {
  TOEFL: { attempts: 145, passed: 112, rate: 77.2 },
  IELTS: { attempts: 98, passed: 78, rate: 79.6 },
  Cambridge: { attempts: 67, passed: 54, rate: 80.6 },
  DELF: { attempts: 34, passed: 28, rate: 82.4 },
  Goethe: { attempts: 18, passed: 14, rate: 77.8 },
};

// Convenios con instituciones
export const institutionalAgreements = [
  {
    id: 'univ-1',
    name: 'University of Toronto',
    country: 'Canada',
    program: 'english',
    minLevel: 'B2' as LanguageLevel,
    studentsPlaced: 45,
    scholarshipsAvailable: 5,
  },
  {
    id: 'univ-2',
    name: 'McGill University',
    country: 'Canada',
    program: 'english',
    minLevel: 'C1' as LanguageLevel,
    studentsPlaced: 32,
    scholarshipsAvailable: 3,
  },
  {
    id: 'univ-3',
    name: 'Sorbonne University',
    country: 'France',
    program: 'french',
    minLevel: 'B2' as LanguageLevel,
    studentsPlaced: 18,
    scholarshipsAvailable: 2,
  },
  {
    id: 'univ-4',
    name: 'University of Sydney',
    country: 'Australia',
    program: 'english',
    minLevel: 'B2' as LanguageLevel,
    studentsPlaced: 28,
    scholarshipsAvailable: 4,
  },
];

// Funciones helper
export function getLevelName(level: LanguageLevel): string {
  const names = {
    A1: 'Principiante',
    A2: 'Elemental',
    B1: 'Intermedio',
    B2: 'Intermedio Alto',
    C1: 'Avanzado',
    C2: 'Maestría',
  };
  return names[level];
}

export function getProgramName(program: LanguageProgram): string {
  const names = {
    english: 'Inglés',
    french: 'Francés',
    german: 'Alemán',
    portuguese: 'Portugués',
    italian: 'Italiano',
    chinese: 'Chino Mandarín',
  };
  return names[program];
}

export function getCourseTypeName(type: CourseType): string {
  const names = {
    presencial: 'Presencial',
    virtual: 'Virtual',
    hibrido: 'Híbrido',
    inmersion: 'Inmersión',
  };
  return names[type];
}
