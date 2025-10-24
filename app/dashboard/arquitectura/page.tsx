'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { systemComponents, syncLogs, systemMetrics } from '@/lib/data/system-data';
import {
  Database,
  Server,
  Cloud,
  Activity,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Zap,
} from 'lucide-react';
import type { SystemStatus } from '@/types';

export default function ArquitecturaPage() {
  const getStatusColor = (status: SystemStatus) => {
    const colors = {
      online: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      degraded: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      offline: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    };
    return colors[status];
  };

  const getStatusIcon = (status: SystemStatus) => {
    if (status === 'online') return <CheckCircle2 className="h-4 w-4" />;
    if (status === 'degraded') return <AlertCircle className="h-4 w-4" />;
    return <AlertCircle className="h-4 w-4" />;
  };

  const getComponentIcon = (type: string) => {
    if (type === 'database') return <Database className="h-8 w-8" />;
    if (type === 'api') return <Cloud className="h-8 w-8" />;
    if (type === 'service') return <Server className="h-8 w-8" />;
    return <Activity className="h-8 w-8" />;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-CO', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getTimeUntilNextSync = () => {
    const now = new Date();
    const diff = systemMetrics.nextSyncTime.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Arquitectura del Sistema</h1>
        <p className="text-muted-foreground">
          Visualización de componentes, flujo de datos y estado de sincronización
        </p>
      </div>

      {/* Métricas Generales del Sistema */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uptime del Sistema</CardTitle>
            <Activity className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{systemMetrics.uptime}%</div>
            <p className="text-xs text-muted-foreground">Disponibilidad total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Última Sincronización</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatDate(systemMetrics.lastSyncTime)}</div>
            <p className="text-xs text-muted-foreground">Hace {systemMetrics.dataFreshness}h</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Próxima Sincronización</CardTitle>
            <Zap className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getTimeUntilNextSync()}</div>
            <p className="text-xs text-muted-foreground">Automática cada 8 horas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tiempo de Respuesta</CardTitle>
            <Activity className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.avgResponseTime}ms</div>
            <p className="text-xs text-muted-foreground">Promedio global</p>
          </CardContent>
        </Card>
      </div>

      {/* Diagrama de Arquitectura */}
      <Card>
        <CardHeader>
          <CardTitle>Flujo de Datos del Sistema</CardTitle>
          <CardDescription>
            Arquitectura completa desde la base de datos del cliente hasta la plataforma web
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative p-8">
            {/* Componentes en capas verticales */}
            <div className="space-y-8">
              {/* Layer 1: Cliente Database */}
              <div className="flex items-center justify-center">
                <div className="text-center space-y-2 w-64">
                  <div className="flex items-center justify-center">
                    {getComponentIcon('database')}
                  </div>
                  <h3 className="font-bold">{systemComponents[0].name}</h3>
                  <Badge className={getStatusColor(systemComponents[0].status)}>
                    {getStatusIcon(systemComponents[0].status)}
                    <span className="ml-1">{systemComponents[0].status}</span>
                  </Badge>
                  <div className="text-sm text-muted-foreground">
                    Uptime: {systemComponents[0].uptime}%
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Respuesta: {systemComponents[0].responseTime}ms
                  </div>
                </div>
              </div>

              {/* Arrow down */}
              <div className="flex justify-center">
                <ArrowRight className="h-8 w-8 text-muted-foreground rotate-90" />
              </div>

              {/* Layer 2: ETL Service */}
              <div className="flex items-center justify-center">
                <div className="text-center space-y-2 w-64 bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border-2 border-blue-300 dark:border-blue-700">
                  <div className="flex items-center justify-center">
                    {getComponentIcon('service')}
                  </div>
                  <h3 className="font-bold">{systemComponents[1].name}</h3>
                  <Badge className={getStatusColor(systemComponents[1].status)}>
                    {getStatusIcon(systemComponents[1].status)}
                    <span className="ml-1">{systemComponents[1].status}</span>
                  </Badge>
                  <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    Sincronización cada 8 horas
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Último sync: {formatDate(systemComponents[1].lastSync!)}
                  </div>
                </div>
              </div>

              {/* Arrow down */}
              <div className="flex justify-center">
                <ArrowRight className="h-8 w-8 text-muted-foreground rotate-90" />
              </div>

              {/* Layer 3: Data Warehouse */}
              <div className="flex items-center justify-center">
                <div className="text-center space-y-2 w-64">
                  <div className="flex items-center justify-center">
                    {getComponentIcon('database')}
                  </div>
                  <h3 className="font-bold">{systemComponents[2].name}</h3>
                  <Badge className={getStatusColor(systemComponents[2].status)}>
                    {getStatusIcon(systemComponents[2].status)}
                    <span className="ml-1">{systemComponents[2].status}</span>
                  </Badge>
                  <div className="text-sm text-muted-foreground">
                    Uptime: {systemComponents[2].uptime}%
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Respuesta: {systemComponents[2].responseTime}ms
                  </div>
                </div>
              </div>

              {/* Arrow down */}
              <div className="flex justify-center">
                <ArrowRight className="h-8 w-8 text-muted-foreground rotate-90" />
              </div>

              {/* Layer 4: API */}
              <div className="flex items-center justify-center">
                <div className="text-center space-y-2 w-64">
                  <div className="flex items-center justify-center">
                    {getComponentIcon('api')}
                  </div>
                  <h3 className="font-bold">{systemComponents[3].name}</h3>
                  <Badge className={getStatusColor(systemComponents[3].status)}>
                    {getStatusIcon(systemComponents[3].status)}
                    <span className="ml-1">{systemComponents[3].status}</span>
                  </Badge>
                  <div className="text-sm text-muted-foreground">
                    Uptime: {systemComponents[3].uptime}%
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Respuesta: {systemComponents[3].responseTime}ms
                  </div>
                </div>
              </div>

              {/* Arrow down */}
              <div className="flex justify-center">
                <ArrowRight className="h-8 w-8 text-muted-foreground rotate-90" />
              </div>

              {/* Layer 5: Dashboard */}
              <div className="flex items-center justify-center">
                <div className="text-center space-y-2 w-64 bg-green-50 dark:bg-green-950 p-4 rounded-lg border-2 border-green-300 dark:border-green-700">
                  <div className="flex items-center justify-center">
                    {getComponentIcon('service')}
                  </div>
                  <h3 className="font-bold">{systemComponents[4].name}</h3>
                  <Badge className={getStatusColor(systemComponents[4].status)}>
                    {getStatusIcon(systemComponents[4].status)}
                    <span className="ml-1">{systemComponents[4].status}</span>
                  </Badge>
                  <div className="text-sm font-medium text-green-600 dark:text-green-400">
                    Plataforma Global Analytics
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Respuesta: {systemComponents[4].responseTime}ms
                  </div>
                </div>
              </div>
            </div>

            {/* Integraciones laterales */}
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 space-y-4">
              <div className="text-center space-y-2 w-48">
                <div className="flex items-center justify-center">
                  {getComponentIcon('integration')}
                </div>
                <h4 className="font-medium text-sm">{systemComponents[5].name}</h4>
                <Badge className={getStatusColor(systemComponents[5].status)} variant="outline">
                  {systemComponents[5].status}
                </Badge>
              </div>
              <div className="text-center space-y-2 w-48">
                <div className="flex items-center justify-center">
                  {getComponentIcon('integration')}
                </div>
                <h4 className="font-medium text-sm">{systemComponents[6].name}</h4>
                <Badge className={getStatusColor(systemComponents[6].status)} variant="outline">
                  {systemComponents[6].status}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Historial de Sincronización */}
      <Card>
        <CardHeader>
          <CardTitle>Historial de Sincronizaciones</CardTitle>
          <CardDescription>
            Últimas ejecuciones del proceso ETL de sincronización
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {syncLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div>
                    {log.status === 'synced' ? (
                      <CheckCircle2 className="h-8 w-8 text-green-600" />
                    ) : (
                      <AlertCircle className="h-8 w-8 text-red-600" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium">
                      {log.status === 'synced' ? 'Sincronización exitosa' : 'Error de sincronización'}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {formatDate(log.timestamp)}
                    </div>
                    {log.errorMessage && (
                      <div className="text-sm text-red-600 mt-1">{log.errorMessage}</div>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">
                    {log.recordsProcessed.toLocaleString('es-CO')}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    registros en {log.duration}s
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Estado de Componentes */}
      <Card>
        <CardHeader>
          <CardTitle>Estado Detallado de Componentes</CardTitle>
          <CardDescription>Monitoreo en tiempo real de todos los servicios</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium">Componente</th>
                  <th className="text-left p-4 font-medium">Tipo</th>
                  <th className="text-left p-4 font-medium">Estado</th>
                  <th className="text-left p-4 font-medium">Uptime</th>
                  <th className="text-left p-4 font-medium">Respuesta</th>
                  <th className="text-left p-4 font-medium">Última Sincronización</th>
                </tr>
              </thead>
              <tbody>
                {systemComponents.map((component) => (
                  <tr key={component.id} className="border-b hover:bg-muted/50">
                    <td className="p-4">
                      <div className="font-medium">{component.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {component.description}
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline">{component.type}</Badge>
                    </td>
                    <td className="p-4">
                      <Badge className={getStatusColor(component.status)}>
                        {getStatusIcon(component.status)}
                        <span className="ml-1">{component.status}</span>
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="font-medium">{component.uptime}%</div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium">{component.responseTime}ms</div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm">
                        {component.lastSync ? formatDate(component.lastSync) : 'N/A'}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
