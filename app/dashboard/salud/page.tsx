'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { serviceHealthData, systemMetrics } from '@/lib/data/system-data';
import {
  Activity,
  CheckCircle2,
  AlertTriangle,
  Server,
  Clock,
  Zap,
  TrendingUp,
  Database,
} from 'lucide-react';

export default function SaludPage() {
  const getHealthColor = (status: string) => {
    if (status === 'healthy') return 'text-green-600';
    if (status === 'warning') return 'text-yellow-600';
    return 'text-red-600';
  };


  const getStatusIcon = (status: string) => {
    if (status === 'online') return <CheckCircle2 className="h-5 w-5 text-green-600" />;
    if (status === 'degraded') return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
    return <AlertTriangle className="h-5 w-5 text-red-600" />;
  };

  const getStatusBadge = (status: string) => {
    if (status === 'online') {
      return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Online</Badge>;
    }
    if (status === 'degraded') {
      return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">Degradado</Badge>;
    }
    return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">Offline</Badge>;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-CO', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getProgressColor = (value: number, threshold: number, isInverse?: boolean) => {
    if (isInverse) {
      // Para métricas donde menor es mejor
      if (value < threshold * 0.5) return 'bg-green-600';
      if (value < threshold * 0.8) return 'bg-yellow-600';
      return 'bg-red-600';
    } else {
      // Para métricas donde mayor es mejor
      if (value >= threshold * 0.8) return 'bg-green-600';
      if (value >= threshold * 0.5) return 'bg-yellow-600';
      return 'bg-red-600';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Salud del Sistema</h1>
        <p className="text-muted-foreground">
          Monitoreo en tiempo real de servicios y métricas de rendimiento
        </p>
      </div>

      {/* KPI Cards Principales */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uptime Global</CardTitle>
            <Activity className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{systemMetrics.uptime}%</div>
            <Progress value={systemMetrics.uptime} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">Últimos 30 días</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tiempo de Respuesta</CardTitle>
            <Zap className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.avgResponseTime}ms</div>
            <Progress value={(systemMetrics.avgResponseTime / 200) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">Promedio global</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasa de Error</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.errorRate}%</div>
            <Progress value={systemMetrics.errorRate * 10} className="mt-2 bg-red-200" />
            <p className="text-xs text-muted-foreground mt-2">Muy bajo - sistema estable</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(systemMetrics.totalRequests / 1000000).toFixed(1)}M
            </div>
            <p className="text-xs text-muted-foreground mt-2">Últimas 24 horas</p>
          </CardContent>
        </Card>
      </div>

      {/* Estado de Servicios */}
      <div className="grid gap-6 md:grid-cols-2">
        {serviceHealthData.map((service) => (
          <Card key={service.serviceName}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950">
                    <Server className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle>{service.serviceName}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      {getStatusIcon(service.status)}
                      <span>Uptime: {service.uptime}%</span>
                    </CardDescription>
                  </div>
                </div>
                {getStatusBadge(service.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Tiempo de respuesta:</span>
                  <div className="font-bold text-lg">{service.responseTime}ms</div>
                </div>
                {service.lastIncident && (
                  <div>
                    <span className="text-muted-foreground">Último incidente:</span>
                    <div className="font-medium text-sm">{formatDate(service.lastIncident)}</div>
                  </div>
                )}
              </div>

              <div className="space-y-3 pt-2 border-t">
                <h4 className="font-medium text-sm">Métricas Detalladas</h4>
                {service.metrics.map((metric, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{metric.description}</span>
                      <div className="flex items-center gap-2">
                        <span className={`font-bold ${getHealthColor(metric.status)}`}>
                          {metric.value}
                          {metric.unit}
                        </span>
                        <div
                          className={`w-3 h-3 rounded-full ${
                            metric.status === 'healthy'
                              ? 'bg-green-600'
                              : metric.status === 'warning'
                              ? 'bg-yellow-600'
                              : 'bg-red-600'
                          }`}
                        />
                      </div>
                    </div>
                    <Progress
                      value={(metric.value / metric.threshold) * 100}
                      className={getProgressColor(metric.value, metric.threshold)}
                    />
                    <div className="text-xs text-muted-foreground text-right">
                      Umbral: {metric.threshold}
                      {metric.unit}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabla de Resumen */}
      <Card>
        <CardHeader>
          <CardTitle>Resumen de Servicios</CardTitle>
          <CardDescription>Vista consolidada del estado de todos los servicios</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium">Servicio</th>
                  <th className="text-left p-4 font-medium">Estado</th>
                  <th className="text-left p-4 font-medium">Uptime</th>
                  <th className="text-left p-4 font-medium">Respuesta</th>
                  <th className="text-left p-4 font-medium">Métricas</th>
                  <th className="text-left p-4 font-medium">Último Incidente</th>
                </tr>
              </thead>
              <tbody>
                {serviceHealthData.map((service) => (
                  <tr key={service.serviceName} className="border-b hover:bg-muted/50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950">
                          <Server className="h-5 w-5 text-blue-600" />
                        </div>
                        <span className="font-medium">{service.serviceName}</span>
                      </div>
                    </td>
                    <td className="p-4">{getStatusBadge(service.status)}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-green-600">{service.uptime}%</span>
                        <Progress value={service.uptime} className="w-16" />
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="font-mono text-sm">{service.responseTime}ms</span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-1">
                        {service.metrics.map((metric, idx) => (
                          <div
                            key={idx}
                            className={`w-2 h-2 rounded-full ${
                              metric.status === 'healthy'
                                ? 'bg-green-600'
                                : metric.status === 'warning'
                                ? 'bg-yellow-600'
                                : 'bg-red-600'
                            }`}
                            title={`${metric.name}: ${metric.status}`}
                          />
                        ))}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-sm">
                        {service.lastIncident ? formatDate(service.lastIncident) : 'Sin incidentes'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Información Adicional */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Frescura de Datos</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.dataFreshness}h</div>
            <p className="text-xs text-muted-foreground">
              Última sync: {formatDate(systemMetrics.lastSyncTime)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Próxima Sincronización</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.ceil(
                (systemMetrics.nextSyncTime.getTime() - new Date().getTime()) / (1000 * 60 * 60)
              )}
              h
            </div>
            <p className="text-xs text-muted-foreground">
              Programada: {formatDate(systemMetrics.nextSyncTime)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Servicios Online</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {serviceHealthData.filter((s) => s.status === 'online').length}/
              {serviceHealthData.length}
            </div>
            <p className="text-xs text-muted-foreground">100% operacionales</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
