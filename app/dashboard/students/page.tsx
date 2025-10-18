'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, GraduationCap, Award, MapPin, BookOpen } from 'lucide-react';
import { KPICard } from '@/components/dashboard/kpi-card';
import {
  mockStudents,
  mockDemographicData,
  mockCityData,
  mockProgramPerformance,
  mockStudentSuccessMetrics
} from '@/lib/data/mock-data';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { formatCOP } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

export default function StudentsPage() {
  const totalStudents = mockStudents.length;
  const activeStudents = mockStudents.filter(s => s.status === 'active').length;
  const graduatedStudents = mockStudents.filter(s => s.status === 'graduated').length;
  const avgSatisfaction = mockStudents.reduce((sum, s) => sum + (s.satisfactionScore || 0), 0) / totalStudents;

  // Age distribution for chart
  const ageChartData = mockDemographicData.map(d => ({
    ageRange: d.ageRange,
    students: d.count,
    revenue: d.averageRevenue / 1000000 // In millions
  }));

  // Program distribution
  const programChartData = mockProgramPerformance.map(p => ({
    name: p.programType === 'english' ? 'Inglés' :
          p.programType === 'undergraduate' ? 'Pregrado' :
          p.programType === 'masters' ? 'Maestría' : 'PhD',
    value: p.students,
    revenue: p.revenue
  }));

  const COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B'];

  // Success metrics for radar chart
  const radarData = [
    { metric: 'Graduación', value: 87, fullMark: 100 },
    { metric: 'GPA', value: 76, fullMark: 100 },
    { metric: 'Satisfacción', value: 86, fullMark: 100 },
    { metric: 'Retención', value: 95, fullMark: 100 },
    { metric: 'Success Score', value: 85, fullMark: 100 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard de Estudiantes</h1>
        <p className="text-muted-foreground">
          Analiza la demografía, performance y éxito de tus estudiantes
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Total Estudiantes"
          value={totalStudents}
          change={5.3}
          icon={Users}
          format="number"
        />
        <KPICard
          title="Estudiantes Activos"
          value={activeStudents}
          change={8.1}
          icon={BookOpen}
          format="number"
        />
        <KPICard
          title="Graduados"
          value={graduatedStudents}
          change={12.5}
          icon={GraduationCap}
          format="number"
        />
        <KPICard
          title="Satisfacción Promedio"
          value={avgSatisfaction.toFixed(1)}
          change={4.2}
          icon={Award}
          format="number"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Age Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Distribución por Edad</CardTitle>
            <CardDescription>Estudiantes por rango de edad</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ageChartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="ageRange" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  formatter={(value: number, name: string) => [
                    name === 'students' ? value : `$${value.toFixed(0)}M`,
                    name === 'students' ? 'Estudiantes' : 'Revenue Prom.'
                  ]}
                  contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
                />
                <Bar dataKey="students" fill="#10B981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Program Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Distribución por Programa</CardTitle>
            <CardDescription>Total: {totalStudents} estudiantes</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={programChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name} (${entry.value})`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {programChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => `${value} estudiantes`}
                  contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Success Metrics Radar */}
      <Card>
        <CardHeader>
          <CardTitle>Métricas de Éxito</CardTitle>
          <CardDescription>Performance general de estudiantes vs benchmarks</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid stroke="hsl(var(--muted))" />
              <PolarAngleAxis dataKey="metric" className="text-xs" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} className="text-xs" />
              <Radar name="Actual" dataKey="value" stroke="#10B981" fill="#10B981" fillOpacity={0.5} />
              <Tooltip
                formatter={(value: number) => `${value}%`}
                contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Detailed Success Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Métricas de Éxito Detalladas</CardTitle>
          <CardDescription>Comparación con benchmarks de la industria</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockStudentSuccessMetrics.map((metric, index) => {
              // Calculate percentage vs meta
              let percentage: number;
              let performanceText: string;

              if (metric.isInverse) {
                // For inverse metrics (lower is better), calculate how much under the max benchmark
                // If value < benchmark, that's good (e.g., 6.8 < 8 = good)
                percentage = (1 - (metric.value / metric.benchmark)) * 100 + 100;
                // Cap at 100% if already at or better than benchmark
                if (metric.value <= metric.benchmark) {
                  const improvementRatio = (metric.benchmark - metric.value) / metric.benchmark;
                  percentage = 100 + (improvementRatio * 100); // Scale to show how much better
                } else {
                  percentage = (metric.benchmark / metric.value) * 100;
                }
                performanceText = metric.value <= metric.benchmark
                  ? `Bajo meta (${metric.value} de máx ${metric.benchmark})`
                  : `Sobre meta (${metric.value} de máx ${metric.benchmark})`;
              } else {
                // For normal metrics (higher is better)
                percentage = (metric.value / metric.benchmark) * 100;
                performanceText = `${percentage.toFixed(0)}% de la meta`;
              }

              // Determine color based on percentage ranges
              let color: string;
              let textColorClass: string;

              if (metric.isInverse) {
                // For inverse metrics, being under benchmark is good
                if (metric.value <= metric.benchmark) {
                  color = '#10B981'; // Green - good!
                  textColorClass = 'text-green-600';
                } else {
                  const overagePercentage = ((metric.value - metric.benchmark) / metric.benchmark) * 100;
                  if (overagePercentage > 50) {
                    color = '#EF4444'; // Red - way over
                    textColorClass = 'text-red-600';
                  } else {
                    color = '#F59E0B'; // Yellow - slightly over
                    textColorClass = 'text-yellow-600';
                  }
                }
              } else {
                // For normal metrics, use standard ranges
                if (percentage >= 80) {
                  color = '#10B981'; // Green
                  textColorClass = 'text-green-600';
                } else if (percentage >= 50) {
                  color = '#F59E0B'; // Yellow
                  textColorClass = 'text-yellow-600';
                } else {
                  color = '#EF4444'; // Red
                  textColorClass = 'text-red-600';
                }
              }

              // For gauge display, cap at 100%
              const gaugePercentage = Math.min(percentage, 100);

              return (
                <div key={index} className="flex flex-col items-center">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-sm font-medium text-center">{metric.metric}</span>
                    <Badge variant={metric.trend === 'up' ? 'default' : 'destructive'} className={metric.trend === 'down' ? 'bg-red-500 hover:bg-red-600' : ''}>
                      {metric.trend === 'up' ? '↑' : '↓'}
                    </Badge>
                  </div>

                  {/* CSS Gauge */}
                  <div className="relative w-40 h-40 mb-4">
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `conic-gradient(${color} ${gaugePercentage * 3.6}deg, #1f2937 ${gaugePercentage * 3.6}deg)`
                      }}
                    />
                    <div className="absolute inset-3 bg-background rounded-full flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold">{metric.value}</span>
                      <span className="text-xs text-muted-foreground mt-1">Meta: {metric.isInverse ? 'máx ' : ''}{metric.benchmark}</span>
                    </div>
                  </div>

                  <div className="text-center">
                    <span className={`text-sm font-semibold ${textColorClass}`}>
                      {performanceText}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* City Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Performance por Ciudad</CardTitle>
          <CardDescription>Estudiantes y revenue por ubicación</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ciudad</TableHead>
                <TableHead className="text-right">Leads</TableHead>
                <TableHead className="text-right">Estudiantes</TableHead>
                <TableHead className="text-right">Tasa Conversión</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
                <TableHead className="text-right">Revenue Promedio</TableHead>
                <TableHead className="text-right">Crecimiento</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockCityData
                .sort((a, b) => b.revenue - a.revenue)
                .map((city) => {
                  const conversionRate = city.leads > 0 ? (city.students / city.leads) * 100 : 0;
                  const avgRevenue = city.students > 0 ? city.revenue / city.students : 0;

                  return (
                    <TableRow key={city.city}>
                      <TableCell className="font-medium flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        {city.city}
                      </TableCell>
                      <TableCell className="text-right">{city.leads}</TableCell>
                      <TableCell className="text-right">{city.students}</TableCell>
                      <TableCell className="text-right">{conversionRate.toFixed(1)}%</TableCell>
                      <TableCell className="text-right font-medium text-green-600">
                        {formatCOP(city.revenue)}
                      </TableCell>
                      <TableCell className="text-right">{formatCOP(avgRevenue)}</TableCell>
                      <TableCell className="text-right">
                        <span className={city.growthRate > 1.5 ? 'text-green-600 font-medium' : 'text-muted-foreground'}>
                          +{city.growthRate.toFixed(1)}%
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Program Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Performance por Programa</CardTitle>
          <CardDescription>Análisis detallado de cada tipo de programa</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Programa</TableHead>
                <TableHead className="text-right">Estudiantes</TableHead>
                <TableHead className="text-right">Revenue Total</TableHead>
                <TableHead className="text-right">Revenue Promedio</TableHead>
                <TableHead className="text-right">Tasa Completación</TableHead>
                <TableHead className="text-right">Satisfacción</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockProgramPerformance.map((program) => {
                const programName = program.programType === 'english' ? 'Inglés' :
                                  program.programType === 'undergraduate' ? 'Pregrado' :
                                  program.programType === 'masters' ? 'Maestría' : 'PhD';

                return (
                  <TableRow key={program.programType}>
                    <TableCell className="font-medium">{programName}</TableCell>
                    <TableCell className="text-right">{program.students}</TableCell>
                    <TableCell className="text-right font-medium text-green-600">
                      {formatCOP(program.revenue)}
                    </TableCell>
                    <TableCell className="text-right">{formatCOP(program.averageRevenue)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center gap-2 justify-end">
                        <span>{program.completionRate.toFixed(1)}%</span>
                        <Progress value={program.completionRate} className="w-16 h-2" />
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center gap-1 justify-end">
                        {'★'.repeat(Math.round(program.satisfactionScore))}
                        <span className="text-xs text-muted-foreground ml-1">
                          ({program.satisfactionScore.toFixed(1)})
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Demographics Table */}
      <Card>
        <CardHeader>
          <CardTitle>Datos Demográficos</CardTitle>
          <CardDescription>Análisis demográfico completo</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rango de Edad</TableHead>
                <TableHead className="text-right">Estudiantes</TableHead>
                <TableHead className="text-right">Porcentaje</TableHead>
                <TableHead className="text-right">Revenue Promedio</TableHead>
                <TableHead className="text-right">Tasa de Conversión</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockDemographicData.map((demo) => (
                <TableRow key={demo.ageRange}>
                  <TableCell className="font-medium">{demo.ageRange} años</TableCell>
                  <TableCell className="text-right">{demo.count}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center gap-2 justify-end">
                      <span>{demo.percentage.toFixed(1)}%</span>
                      <Progress value={demo.percentage} className="w-16 h-2" />
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCOP(demo.averageRevenue)}
                  </TableCell>
                  <TableCell className="text-right">{demo.conversionRate.toFixed(1)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
