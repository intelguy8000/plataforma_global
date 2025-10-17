'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, DollarSign, Users, Target } from 'lucide-react';
import { KPICard } from '@/components/dashboard/kpi-card';
import {
  mockWebMetrics,
  mockMarketingCampaigns,
  getMarketingMetrics,
  mockChannelMetrics
} from '@/lib/data/mock-data';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { formatCOP } from '@/lib/utils';

export default function MarketingPage() {
  const marketingMetrics = getMarketingMetrics();

  // Format web metrics for chart
  const webTrafficData = mockWebMetrics.slice(-14).map(metric => ({
    date: metric.date.getDate(),
    visits: metric.visits,
    conversions: Math.floor(metric.visits * metric.conversionRate / 100)
  }));

  // Channel distribution for pie chart
  const channelDistribution = mockChannelMetrics.map(cm => ({
    name: cm.channel,
    value: cm.leads,
    revenue: cm.revenue
  }));

  const COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444', '#EC4899', '#14B8A6', '#F97316', '#06B6D4'];

  // ROI by campaign
  const roiData = mockMarketingCampaigns.map(c => ({
    name: c.name.length > 20 ? c.name.substring(0, 20) + '...' : c.name,
    roi: c.roi / 100, // Convert to percentage decimal
    investment: c.investment / 1000000 // In millions for display
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Marketing Dashboard</h1>
        <p className="text-muted-foreground">
          Analiza el performance de tus campañas y canales de marketing
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Inversión Total"
          value={marketingMetrics.totalInvestment}
          change={8.5}
          icon={DollarSign}
          format="currency"
        />
        <KPICard
          title="Leads Generados"
          value={marketingMetrics.totalLeads}
          change={12.3}
          icon={Users}
          format="number"
        />
        <KPICard
          title="ROI Promedio"
          value={marketingMetrics.overallROI}
          change={15.8}
          icon={TrendingUp}
          format="percentage"
        />
        <KPICard
          title="CAC Promedio"
          value={marketingMetrics.averageCAC}
          change={-5.2}
          icon={Target}
          format="currency"
        />
      </div>

      {/* Web Traffic Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Tráfico Web y Conversiones</CardTitle>
          <CardDescription>Últimos 14 días</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={webTrafficData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="date"
                className="text-xs"
                tickFormatter={(value) => `Día ${value}`}
              />
              <YAxis className="text-xs" />
              <Tooltip
                contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
              />
              <Line
                type="monotone"
                dataKey="visits"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ fill: '#3B82F6', r: 4 }}
                name="Visitas"
              />
              <Line
                type="monotone"
                dataKey="conversions"
                stroke="#10B981"
                strokeWidth={2}
                dot={{ fill: '#10B981', r: 4 }}
                name="Conversiones"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Channel Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Distribución de Leads por Canal</CardTitle>
            <CardDescription>Total: {marketingMetrics.totalLeads} leads</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={channelDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name} (${entry.value})`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {channelDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => `${value} leads`}
                  contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* ROI by Campaign */}
        <Card>
          <CardHeader>
            <CardTitle>ROI por Campaña</CardTitle>
            <CardDescription>Return on Investment (%)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={roiData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis type="number" className="text-xs" tickFormatter={(value) => `${value}%`} />
                <YAxis dataKey="name" type="category" className="text-xs" width={150} />
                <Tooltip
                  formatter={(value: number) => `${value.toFixed(0)}%`}
                  contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
                />
                <Bar dataKey="roi" fill="#10B981" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Campaign Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Performance de Campañas</CardTitle>
          <CardDescription>Todas las campañas activas y completadas</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaña</TableHead>
                <TableHead>Canal</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Inversión</TableHead>
                <TableHead className="text-right">Leads</TableHead>
                <TableHead className="text-right">Conversiones</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
                <TableHead className="text-right">CAC</TableHead>
                <TableHead className="text-right">ROI</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockMarketingCampaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell className="font-medium">{campaign.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {campaign.channel}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={campaign.status === 'active' ? 'default' : campaign.status === 'completed' ? 'secondary' : 'outline'}
                    >
                      {campaign.status === 'active' ? 'Activa' : campaign.status === 'completed' ? 'Completada' : 'Pausada'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{formatCOP(campaign.investment)}</TableCell>
                  <TableCell className="text-right">{campaign.leads}</TableCell>
                  <TableCell className="text-right">{campaign.conversions}</TableCell>
                  <TableCell className="text-right font-medium text-green-600">
                    {formatCOP(campaign.revenue)}
                  </TableCell>
                  <TableCell className="text-right">{formatCOP(campaign.cac)}</TableCell>
                  <TableCell className="text-right font-medium">
                    <span className="text-green-600">{(campaign.roi / 100).toFixed(0)}%</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Channel Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Métricas por Canal</CardTitle>
          <CardDescription>Performance detallado de cada canal de marketing</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Canal</TableHead>
                <TableHead className="text-right">Leads</TableHead>
                <TableHead className="text-right">Conversiones</TableHead>
                <TableHead className="text-right">Tasa Conv.</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
                <TableHead className="text-right">CAC</TableHead>
                <TableHead className="text-right">LTV</TableHead>
                <TableHead className="text-right">ROI</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockChannelMetrics.map((channel) => {
                const conversionRate = channel.leads > 0 ? (channel.conversions / channel.leads) * 100 : 0;
                return (
                  <TableRow key={channel.channel}>
                    <TableCell className="font-medium capitalize">{channel.channel}</TableCell>
                    <TableCell className="text-right">{channel.leads}</TableCell>
                    <TableCell className="text-right">{channel.conversions}</TableCell>
                    <TableCell className="text-right">{conversionRate.toFixed(1)}%</TableCell>
                    <TableCell className="text-right font-medium text-green-600">
                      {formatCOP(channel.revenue)}
                    </TableCell>
                    <TableCell className="text-right">{formatCOP(channel.cac)}</TableCell>
                    <TableCell className="text-right">{formatCOP(channel.ltv)}</TableCell>
                    <TableCell className="text-right">
                      <span className={channel.roi > 0 ? 'text-green-600 font-medium' : 'text-red-600'}>
                        {channel.roi.toFixed(0)}%
                      </span>
                    </TableCell>
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
