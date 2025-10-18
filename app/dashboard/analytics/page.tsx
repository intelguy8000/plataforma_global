'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, TrendingUp, TrendingDown, Target, Activity } from 'lucide-react';
import { KPICard } from '@/components/dashboard/kpi-card';
import {
  mockConversionFunnel,
  mockExecutiveKPIs
} from '@/lib/data/mock-data';
import { getLastNMonths } from '@/lib/data/historical-data';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import {
  LineChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Legend,
  Cell
} from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { formatCOP } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

export default function AnalyticsPage() {
  // Get historical data from static source
  const last12Months = getLastNMonths(12);
  const last6Months = getLastNMonths(6);

  // Calculate averages and totals
  const avgMargin = last12Months.reduce((sum, m) => sum + m.marginPercentage, 0) / last12Months.length;

  // Year to date summary
  const yearToDateRevenue = last12Months.reduce((sum, m) => sum + m.revenue, 0);
  const yearToDateProfit = last12Months.reduce((sum, m) => sum + m.netProfit, 0);
  const yearToDateLeads = last12Months.reduce((sum, m) => sum + m.leads, 0);

  // Format annual data for chart
  const annualChartData = last12Months.map(m => ({
    month: format(m.date, 'MMM', { locale: es }),
    revenue: m.revenue / 1000000, // In millions
    costs: m.costs / 1000000,
    profit: m.netProfit / 1000000,
    margin: m.marginPercentage
  }));

  // Format financial metrics for trend
  const financialTrendData = last6Months.map(m => ({
    month: format(m.date, 'MMM', { locale: es }),
    revenue: m.revenue / 1000000,
    profit: m.netProfit / 1000000,
    margin: m.marginPercentage
  }));

  // Revenue projections - Historical + Forecast
  const avgGrowthRate = 0.08; // 8% monthly growth
  const lastRevenue = last12Months[last12Months.length - 1].revenue;

  const projectionMonths = ['Nov', 'Dic'];
  const projectedData = projectionMonths.map((month, index) => ({
    month,
    revenue: (lastRevenue * Math.pow(1 + avgGrowthRate, index + 1)) / 1000000,
    isProjection: true,
    marginPercentage: avgMargin
  }));

  const revenueProjectionData = [
    ...last12Months.map(m => ({
      month: format(m.date, 'MMM', { locale: es }),
      revenue: m.revenue / 1000000,
      isProjection: false,
      marginPercentage: m.marginPercentage
    })),
    ...projectedData
  ];

  // KPI categories
  const kpiByCategory = {
    Revenue: mockExecutiveKPIs.filter(k => k.category === 'Revenue'),
    Growth: mockExecutiveKPIs.filter(k => k.category === 'Growth'),
    Efficiency: mockExecutiveKPIs.filter(k => k.category === 'Efficiency'),
    Customer: mockExecutiveKPIs.filter(k => k.category === 'Customer')
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics & Finanzas</h1>
        <p className="text-muted-foreground">
          Vista ejecutiva con métricas financieras y análisis anual
        </p>
      </div>

      {/* Main KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Revenue Anual (YTD)"
          value={yearToDateRevenue}
          change={18.5}
          icon={DollarSign}
          format="currency"
        />
        <KPICard
          title="Beneficio Neto (YTD)"
          value={yearToDateProfit}
          change={22.3}
          icon={TrendingUp}
          format="currency"
        />
        <KPICard
          title="Margen Promedio"
          value={avgMargin}
          change={3.8}
          icon={Target}
          format="percentage"
        />
        <KPICard
          title="Leads Anuales"
          value={yearToDateLeads}
          change={12.1}
          icon={Activity}
          format="number"
        />
      </div>

      {/* Annual Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Anual</CardTitle>
          <CardDescription>Revenue, costos y beneficio por mes</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={annualChartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" className="text-xs" />
              <YAxis
                yAxisId="left"
                className="text-xs"
                tickFormatter={(value) => `$${value}M`}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                className="text-xs"
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                formatter={(value: number, name: string) => {
                  if (name === 'Margen %') return [`${value.toFixed(1)}%`, 'Margen'];
                  return [`$${value.toFixed(0)}M`, name === 'Revenue' ? 'Revenue' : name === 'Costos' ? 'Costos' : 'Beneficio'];
                }}
                contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="revenue" fill="#3B82F6" name="Revenue" radius={[8, 8, 0, 0]} />
              <Bar yAxisId="left" dataKey="costs" fill="#EF4444" name="Costos" radius={[8, 8, 0, 0]} />
              <Line yAxisId="right" type="monotone" dataKey="margin" stroke="#10B981" strokeWidth={3} name="Margen %" />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Revenue Projections */}
      <Card>
        <CardHeader>
          <CardTitle>Proyección de Revenue 2025</CardTitle>
          <CardDescription>Histórico + Proyección próximos meses (8% crecimiento mensual)</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={revenueProjectionData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" className="text-xs" />
              <YAxis
                yAxisId="left"
                className="text-xs"
                tickFormatter={(value) => `$${value}M`}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                className="text-xs"
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload || !payload.length) return null;

                  const data = payload[0].payload;
                  const isProjection = data.isProjection;
                  const revenue = data.revenue;
                  const margin = data.marginPercentage;

                  return (
                    <div className="bg-background border border-border p-3 rounded shadow-lg">
                      <p className="font-medium mb-1">{data.month}</p>
                      <p className="text-sm text-blue-600">
                        {isProjection ? 'Proyectado' : 'Revenue'}: ${revenue.toFixed(0)}M
                      </p>
                      <p className="text-sm text-green-600">
                        {isProjection ? '% Margen Proyectado' : '% Margen'}: {margin.toFixed(1)}%
                      </p>
                    </div>
                  );
                }}
              />
              <Bar
                yAxisId="left"
                dataKey="revenue"
                name="Revenue"
                radius={[8, 8, 0, 0]}
              >
                {revenueProjectionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.isProjection ? '#93C5FD' : '#3B82F6'} />
                ))}
              </Bar>
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="marginPercentage"
                stroke="#10B981"
                strokeWidth={2}
                name="% Margen"
                dot={{ fill: '#10B981', r: 4 }}
                strokeDasharray="0"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Financial Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Tendencia Financiera</CardTitle>
            <CardDescription>Últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={financialTrendData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" tickFormatter={(value) => `$${value}M`} />
                <Tooltip
                  formatter={(value: number, name: string) => {
                    if (name === 'margin') return [`${value.toFixed(1)}%`, 'Margen'];
                    return [`$${value.toFixed(0)}M`, name === 'revenue' ? 'Revenue' : 'Beneficio'];
                  }}
                  contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={{ fill: '#3B82F6', r: 4 }}
                  name="Revenue"
                />
                <Line
                  type="monotone"
                  dataKey="profit"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={{ fill: '#10B981', r: 4 }}
                  name="Beneficio"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Conversion Funnel */}
        <Card>
          <CardHeader>
            <CardTitle>Embudo de Conversión</CardTitle>
            <CardDescription>Del visitante web al estudiante activo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockConversionFunnel.map((stage, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{stage.stage}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">{stage.count.toLocaleString('es-ES')}</span>
                      <Badge variant="outline">{stage.percentage.toFixed(2)}%</Badge>
                    </div>
                  </div>
                  <Progress value={(stage.count / mockConversionFunnel[0].count) * 100} className="h-2" />
                  {index < mockConversionFunnel.length - 1 && (
                    <p className="text-xs text-red-500">
                      Drop-off: {stage.dropoffRate.toFixed(1)}%
                    </p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Executive KPIs by Category */}
      <div className="grid gap-4 md:grid-cols-2">
        {Object.entries(kpiByCategory).map(([category, kpis]) => (
          <Card key={category}>
            <CardHeader>
              <CardTitle>KPIs Ejecutivos - {category}</CardTitle>
              <CardDescription>Objetivos y logros</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {kpis.map((kpi, index) => {
                  const isAboveTarget = kpi.achievement >= 100;
                  const displayValue = kpi.name.includes('CAC') || kpi.name.includes('Ingresos') || kpi.name.includes('Promedio')
                    ? formatCOP(kpi.value)
                    : kpi.value.toFixed(1);

                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{kpi.name}</span>
                        <div className="flex items-center gap-2">
                          {kpi.trend === 'up' ? (
                            <TrendingUp className="h-4 w-4 text-green-600" />
                          ) : kpi.trend === 'down' ? (
                            <TrendingDown className="h-4 w-4 text-red-600" />
                          ) : null}
                          <span className={`text-sm font-semibold ${isAboveTarget ? 'text-green-600' : 'text-yellow-600'}`}>
                            {kpi.achievement.toFixed(0)}%
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Actual: {displayValue}</span>
                        <span>
                          Target: {kpi.name.includes('CAC') || kpi.name.includes('Ingresos')
                            ? formatCOP(kpi.target)
                            : kpi.target.toFixed(1)}
                        </span>
                      </div>
                      <Progress value={Math.min(kpi.achievement, 100)} className="h-2" />
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Financial Details Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detalle Financiero Mensual</CardTitle>
          <CardDescription>Últimos 12 meses de métricas financieras</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mes</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
                <TableHead className="text-right">Costos</TableHead>
                <TableHead className="text-right">Beneficio Bruto</TableHead>
                <TableHead className="text-right">Beneficio Neto</TableHead>
                <TableHead className="text-right">Margen</TableHead>
                <TableHead className="text-right">CAC</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {last12Months.map((m, index) => {
                const month = format(m.date, 'MMM yyyy', { locale: es });
                return (
                  <TableRow key={index}>
                    <TableCell className="font-medium capitalize">{month}</TableCell>
                    <TableCell className="text-right font-medium text-green-600">
                      {formatCOP(m.revenue)}
                    </TableCell>
                    <TableCell className="text-right text-red-600">
                      {formatCOP(m.costs)}
                    </TableCell>
                    <TableCell className="text-right">{formatCOP(m.grossProfit)}</TableCell>
                    <TableCell className="text-right font-medium text-green-600">
                      {formatCOP(m.netProfit)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant={m.marginPercentage > 40 ? 'default' : 'secondary'}>
                        {m.marginPercentage.toFixed(1)}%
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCOP(m.cac)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Annual Summary Table */}
      <Card>
        <CardHeader>
          <CardTitle>Resumen Anual por Mes</CardTitle>
          <CardDescription>Consolidado de todas las métricas clave</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mes</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
                <TableHead className="text-right">Costos</TableHead>
                <TableHead className="text-right">Beneficio</TableHead>
                <TableHead className="text-right">Margen</TableHead>
                <TableHead className="text-right">Leads</TableHead>
                <TableHead className="text-right">Conversiones</TableHead>
                <TableHead className="text-right">Estudiantes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {last12Months.map((m, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{format(m.date, 'MMMM', { locale: es })}</TableCell>
                    <TableCell className="text-right font-medium text-green-600">
                      {formatCOP(m.revenue)}
                    </TableCell>
                    <TableCell className="text-right text-red-600">
                      {formatCOP(m.costs)}
                    </TableCell>
                    <TableCell className="text-right font-medium text-green-600">
                      {formatCOP(m.netProfit)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant={m.marginPercentage > 60 ? 'default' : 'secondary'}>
                        {m.marginPercentage.toFixed(1)}%
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{m.leads}</TableCell>
                    <TableCell className="text-right">{m.conversions}</TableCell>
                    <TableCell className="text-right">{m.activeStudents}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
