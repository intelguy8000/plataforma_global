'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, TrendingUp, TrendingDown, Target, Activity } from 'lucide-react';
import { KPICard } from '@/components/dashboard/kpi-card';
import {
  mockFinancialMetrics,
  mockAnnualMetrics,
  mockConversionFunnel,
  mockExecutiveKPIs
} from '@/lib/data/mock-data';
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
  Legend
} from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { formatCOP } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

export default function AnalyticsPage() {
  // Get latest financial data
  const avgMargin = mockFinancialMetrics.reduce((sum, f) => sum + f.margin, 0) / mockFinancialMetrics.length;

  // Annual summary
  const yearToDateRevenue = mockAnnualMetrics.reduce((sum, m) => sum + m.revenue, 0);
  const yearToDateProfit = mockAnnualMetrics.reduce((sum, m) => sum + m.profit, 0);
  const yearToDateLeads = mockAnnualMetrics.reduce((sum, m) => sum + m.leads, 0);

  // Format annual data for chart
  const annualChartData = mockAnnualMetrics.map(m => ({
    month: m.month,
    revenue: m.revenue / 1000000, // In millions
    costs: m.costs / 1000000,
    profit: m.profit / 1000000,
    margin: ((m.profit / m.revenue) * 100)
  }));

  // Format financial metrics for trend
  const financialTrendData = mockFinancialMetrics.slice(-6).map(f => ({
    month: f.date.toLocaleDateString('es-ES', { month: 'short' }),
    revenue: f.revenue / 1000000,
    profit: f.netProfit / 1000000,
    margin: f.margin
  }));

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
                  if (name === 'margin') return [`${value.toFixed(1)}%`, 'Margen'];
                  return [`$${value.toFixed(0)}M`, name === 'revenue' ? 'Revenue' : name === 'costs' ? 'Costos' : 'Beneficio'];
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
                <TableHead className="text-right">Gastos Op.</TableHead>
                <TableHead className="text-right">Beneficio Neto</TableHead>
                <TableHead className="text-right">Margen</TableHead>
                <TableHead className="text-right">Cash Flow</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockFinancialMetrics.map((finance, index) => {
                const month = finance.date.toLocaleDateString('es-ES', { month: 'short', year: 'numeric' });
                return (
                  <TableRow key={index}>
                    <TableCell className="font-medium capitalize">{month}</TableCell>
                    <TableCell className="text-right font-medium text-green-600">
                      {formatCOP(finance.revenue)}
                    </TableCell>
                    <TableCell className="text-right text-red-600">
                      {formatCOP(finance.costs)}
                    </TableCell>
                    <TableCell className="text-right">{formatCOP(finance.grossProfit)}</TableCell>
                    <TableCell className="text-right text-red-600">
                      {formatCOP(finance.operatingExpenses)}
                    </TableCell>
                    <TableCell className="text-right font-medium text-green-600">
                      {formatCOP(finance.netProfit)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant={finance.margin > 40 ? 'default' : 'secondary'}>
                        {finance.margin.toFixed(1)}%
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className={finance.cashFlow > 0 ? 'text-green-600' : 'text-red-600'}>
                        {formatCOP(finance.cashFlow)}
                      </span>
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
              {mockAnnualMetrics.map((annual) => {
                const margin = (annual.profit / annual.revenue) * 100;
                return (
                  <TableRow key={annual.month}>
                    <TableCell className="font-medium">{annual.month}</TableCell>
                    <TableCell className="text-right font-medium text-green-600">
                      {formatCOP(annual.revenue)}
                    </TableCell>
                    <TableCell className="text-right text-red-600">
                      {formatCOP(annual.costs)}
                    </TableCell>
                    <TableCell className="text-right font-medium text-green-600">
                      {formatCOP(annual.profit)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant={margin > 60 ? 'default' : 'secondary'}>
                        {margin.toFixed(1)}%
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{annual.leads}</TableCell>
                    <TableCell className="text-right">{annual.conversions}</TableCell>
                    <TableCell className="text-right">{annual.students}</TableCell>
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
