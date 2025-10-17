'use client';

import { KPICard } from '@/components/dashboard/kpi-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Users, TrendingUp, Target } from 'lucide-react';
import {
  getCurrentMonthMetrics,
  mockLast30DaysMetrics,
  mockPipelineMetrics,
  getTopAdvisors,
  mockActivities
} from '@/lib/data/mock-data';
import { getYoYComparison } from '@/lib/data/historical-data';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { formatCOP } from '@/lib/utils';

export default function OverviewPage() {
  const currentMetrics = getCurrentMonthMetrics();
  const topAdvisors = getTopAdvisors(5);
  const yoyData = getYoYComparison();

  // Format data for revenue chart
  const revenueChartData = mockLast30DaysMetrics.map(metric => ({
    date: metric.date.getDate(),
    revenue: metric.revenue
  }));

  // Format YoY comparison data for chart
  const yoyChartData = yoyData.map(item => ({
    month: item.month.substring(0, 3), // First 3 letters (Ene, Feb, etc)
    '2023': item.year2023 / 1000000, // Convert to millions
    '2024': item.year2024 / 1000000
  }));

  // Format data for pipeline funnel
  const pipelineChartData = mockPipelineMetrics.map(metric => ({
    stage: metric.stage === 'documentation' ? 'Docs' :
           metric.stage === 'application' ? 'Aplicación' :
           metric.stage === 'visa' ? 'Visa' :
           metric.stage === 'payment' ? 'Pago' : 'Activo',
    count: metric.count,
    revenue: metric.revenue / 1000000 // in millions for chart
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground">
          Visión general de tu negocio y métricas clave
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Revenue MTD"
          value={currentMetrics.revenue}
          change={12.5}
          icon={DollarSign}
          format="currency"
        />
        <KPICard
          title="Nuevos Leads"
          value={currentMetrics.newLeads}
          change={8.2}
          icon={Users}
          format="number"
        />
        <KPICard
          title="Tasa Conversión"
          value={currentMetrics.conversionRate}
          change={3.1}
          icon={Target}
          format="percentage"
        />
        <KPICard
          title="Estudiantes Activos"
          value={currentMetrics.activeStudents}
          change={-2.4}
          icon={TrendingUp}
          format="number"
        />
      </div>

      {/* YoY Comparison Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Comparación Año a Año (YoY)</CardTitle>
          <CardDescription>Revenue mensual 2023 vs 2024 - Millones COP</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={yoyChartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="month"
                className="text-xs"
              />
              <YAxis
                className="text-xs"
                tickFormatter={(value) => `$${value}M`}
              />
              <Tooltip
                formatter={(value: number) => [`$${value.toFixed(1)}M COP`, '']}
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))'
                }}
              />
              <Legend
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="rect"
              />
              <Bar
                dataKey="2023"
                fill="#94A3B8"
                radius={[4, 4, 0, 0]}
                name="2023"
              />
              <Bar
                dataKey="2024"
                fill="#10B981"
                radius={[4, 4, 0, 0]}
                name="2024"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Revenue Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Tendencia de Revenue</CardTitle>
          <CardDescription>Últimos 30 días</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueChartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="date"
                className="text-xs"
                tickFormatter={(value) => `${value}`}
              />
              <YAxis
                className="text-xs"
                tickFormatter={(value) => `$${(value / 1000000).toFixed(0)}M`}
              />
              <Tooltip
                formatter={(value: number) => [formatCOP(value), 'Revenue']}
                labelFormatter={(label) => `Día ${label}`}
                contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#10B981"
                strokeWidth={2}
                dot={{ fill: '#10B981', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Pipeline Funnel */}
      <Card>
        <CardHeader>
          <CardTitle>Pipeline de Estudiantes</CardTitle>
          <CardDescription>Distribución por etapa</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={pipelineChartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="stage" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip
                formatter={(value: number, name: string) => [
                  name === 'count' ? value : `$${value.toFixed(1)}M`,
                  name === 'count' ? 'Estudiantes' : 'Revenue'
                ]}
                contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
              />
              <Bar dataKey="count" fill="#10B981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Top Advisors */}
        <Card>
          <CardHeader>
            <CardTitle>Top 5 Asesores</CardTitle>
            <CardDescription>Por performance este mes</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Asesor</TableHead>
                  <TableHead className="text-right">Conversiones</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topAdvisors.map((advisor) => (
                  <TableRow key={advisor.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-semibold">
                          {advisor.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{advisor.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {advisor.conversionRate.toFixed(1)}% tasa
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="secondary">{advisor.conversionsCount}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCOP(advisor.revenue)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>Últimas conversiones y eventos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div
                    className={`h-2 w-2 mt-2 rounded-full ${
                      activity.type === 'conversion'
                        ? 'bg-green-500'
                        : activity.type === 'payment'
                        ? 'bg-blue-500'
                        : activity.type === 'stage_change'
                        ? 'bg-yellow-500'
                        : 'bg-purple-500'
                    }`}
                  />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.studentName} · {activity.advisorName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(activity.timestamp, { addSuffix: true, locale: es })}
                    </p>
                  </div>
                  {activity.amount && (
                    <Badge variant="outline" className="text-green-600">
                      {formatCOP(activity.amount)}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
