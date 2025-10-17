'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { mockStudents, mockPipelineMetrics, getCurrentMonthMetrics } from '@/lib/data/mock-data';
import { PipelineStage } from '@/types';
import { DollarSign, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';
import { cn, formatCOP } from '@/lib/utils';

const STAGE_CONFIG = {
  documentation: {
    label: 'Documentación',
    color: 'bg-blue-500',
    textColor: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-950'
  },
  application: {
    label: 'Aplicación',
    color: 'bg-purple-500',
    textColor: 'text-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-950'
  },
  visa: {
    label: 'Visa',
    color: 'bg-yellow-500',
    textColor: 'text-yellow-600',
    bgColor: 'bg-yellow-50 dark:bg-yellow-950'
  },
  payment: {
    label: 'Pago',
    color: 'bg-orange-500',
    textColor: 'text-orange-600',
    bgColor: 'bg-orange-50 dark:bg-orange-950'
  },
  active: {
    label: 'Activo',
    color: 'bg-green-500',
    textColor: 'text-green-600',
    bgColor: 'bg-green-50 dark:bg-green-950'
  }
};

export default function SalesPage() {
  const currentMetrics = getCurrentMonthMetrics();
  const stages: PipelineStage[] = ['documentation', 'application', 'visa', 'payment', 'active'];

  // Group students by stage
  const studentsByStage = stages.reduce((acc, stage) => {
    acc[stage] = mockStudents.filter(s => s.stage === stage);
    return acc;
  }, {} as Record<PipelineStage, typeof mockStudents>);

  // Calculate totals
  const totalRevenue = mockStudents.reduce((sum, s) => sum + s.revenue, 0);
  const projectedCloseMonth = mockStudents
    .filter(s => s.stage === 'payment')
    .reduce((sum, s) => sum + s.revenue, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Pipeline de Ventas</h1>
        <p className="text-muted-foreground">
          Gestiona el pipeline de estudiantes y proyecciones
        </p>
      </div>

      {/* Summary Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pipeline</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCOP(totalRevenue)}
            </div>
            <p className="text-xs text-muted-foreground">
              {mockStudents.length} estudiantes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Proyección Cierre</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCOP(projectedCloseMonth)}
            </div>
            <p className="text-xs text-muted-foreground">
              {studentsByStage.payment.length} en pago
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasa Conversión</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {currentMetrics.conversionRate.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Promedio del mes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tareas Urgentes</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              Requieren atención
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Pipeline Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Métricas de Conversión por Etapa</CardTitle>
          <CardDescription>Tasas de conversión y tiempo promedio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-5">
            {mockPipelineMetrics.map((metric) => {
              const config = STAGE_CONFIG[metric.stage];
              return (
                <div key={metric.stage} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className={cn('h-3 w-3 rounded-full', config.color)} />
                    <p className="text-sm font-medium">{config.label}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold">{metric.conversionRate}%</p>
                    <p className="text-xs text-muted-foreground">
                      {metric.averageDaysInStage} días promedio
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Kanban Pipeline */}
      <Card>
        <CardHeader>
          <CardTitle>Pipeline Kanban</CardTitle>
          <CardDescription>Arrastra estudiantes entre etapas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-5">
            {stages.map((stage) => {
              const config = STAGE_CONFIG[stage];
              const students = studentsByStage[stage];
              const stageRevenue = students.reduce((sum, s) => sum + s.revenue, 0);

              return (
                <div key={stage} className="space-y-3">
                  <div className={cn('rounded-lg p-3', config.bgColor)}>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={cn('font-semibold text-sm', config.textColor)}>
                        {config.label}
                      </h3>
                      <Badge variant="secondary" className="text-xs">
                        {students.length}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {formatCOP(stageRevenue)} total
                    </p>
                  </div>

                  <ScrollArea className="h-[500px]">
                    <div className="space-y-2">
                      {students.map((student) => (
                        <Card
                          key={student.id}
                          className="p-3 cursor-pointer hover:shadow-md transition-shadow"
                        >
                          <div className="space-y-2">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <p className="font-medium text-sm">{student.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {student.programType === 'english' ? 'Inglés' :
                                   student.programType === 'undergraduate' ? 'Pregrado' :
                                   student.programType === 'masters' ? 'Maestría' : 'PhD'}
                                </p>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {student.targetCountry}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <p className="text-xs text-muted-foreground">{student.city}</p>
                              <p className="text-sm font-semibold text-green-600">
                                {formatCOP(student.revenue)}
                              </p>
                            </div>
                            {student.university && (
                              <p className="text-xs text-muted-foreground truncate">
                                {student.university}
                              </p>
                            )}
                          </div>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Urgent Tasks */}
      <Card>
        <CardHeader>
          <CardTitle>Tareas Urgentes</CardTitle>
          <CardDescription>Requieren acción inmediata</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-red-50 dark:bg-red-950">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">Visa rechazada - Acción requerida</p>
                <p className="text-xs text-muted-foreground">Carlos Méndez · hace 2 horas</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-950">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">Documentación incompleta</p>
                <p className="text-xs text-muted-foreground">Ana Torres · hace 5 horas</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-950">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">Pago pendiente hace 7 días</p>
                <p className="text-xs text-muted-foreground">Luis Ramírez · hace 1 día</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
