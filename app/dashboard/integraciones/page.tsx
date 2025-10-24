'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockIntegrations, getActiveIntegrationsCount } from '@/lib/data/system-data';
import {
  Database,
  MessageCircle,
  CreditCard,
  Mail,
  Globe,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Settings,
  Plus,
  RefreshCw,
} from 'lucide-react';
import type { IntegrationType, IntegrationStatus } from '@/types';

export default function IntegracionesPage() {
  const activeIntegrations = getActiveIntegrationsCount();
  const totalIntegrations = mockIntegrations.length;
  const disconnectedIntegrations = mockIntegrations.filter(
    (int) => int.status === 'disconnected' || int.status === 'error'
  ).length;

  const getTypeIcon = (type: IntegrationType) => {
    const icons = {
      database: <Database className="h-8 w-8" />,
      messaging: <MessageCircle className="h-8 w-8" />,
      payment: <CreditCard className="h-8 w-8" />,
      email: <Mail className="h-8 w-8" />,
      crm: <Globe className="h-8 w-8" />,
    };
    return icons[type];
  };

  const getStatusIcon = (status: IntegrationStatus) => {
    if (status === 'connected') return <CheckCircle2 className="h-5 w-5 text-green-600" />;
    if (status === 'error') return <XCircle className="h-5 w-5 text-red-600" />;
    if (status === 'disconnected') return <XCircle className="h-5 w-5 text-gray-400" />;
    return <AlertCircle className="h-5 w-5 text-yellow-600" />;
  };

  const getStatusBadge = (status: IntegrationStatus) => {
    const variants = {
      connected: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      disconnected: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
      error: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      configuring: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    };
    const labels = {
      connected: 'Conectada',
      disconnected: 'Desconectada',
      error: 'Error',
      configuring: 'Configurando',
    };
    return <Badge className={variants[status]}>{labels[status]}</Badge>;
  };

  const getHealthStatusBadge = (status: string) => {
    if (status === 'online') {
      return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Online</Badge>;
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Integraciones</h1>
          <p className="text-muted-foreground">
            Gestiona las conexiones con sistemas externos y APIs
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nueva Integración
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Integraciones</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalIntegrations}</div>
            <p className="text-xs text-muted-foreground">Configuradas en el sistema</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Activas</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeIntegrations}</div>
            <p className="text-xs text-muted-foreground">
              {((activeIntegrations / totalIntegrations) * 100).toFixed(0)}% del total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inactivas</CardTitle>
            <XCircle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{disconnectedIntegrations}</div>
            <p className="text-xs text-muted-foreground">Requieren atención</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Datos Sincronizados</CardTitle>
            <RefreshCw className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockIntegrations
                .reduce((sum, int) => sum + int.recordsSynced, 0)
                .toLocaleString('es-CO')}
            </div>
            <p className="text-xs text-muted-foreground">Últimas 24 horas</p>
          </CardContent>
        </Card>
      </div>

      {/* Grid de Integraciones */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockIntegrations.map((integration) => (
          <Card key={integration.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-3 rounded-lg ${
                      integration.status === 'connected'
                        ? 'bg-green-50 dark:bg-green-950 text-green-600'
                        : 'bg-gray-50 dark:bg-gray-950 text-gray-400'
                    }`}
                  >
                    {getTypeIcon(integration.type)}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{integration.name}</CardTitle>
                    <CardDescription className="text-xs">{integration.provider}</CardDescription>
                  </div>
                </div>
                <div>{getStatusIcon(integration.status)}</div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Estado:</span>
                {getStatusBadge(integration.status)}
              </div>

              {integration.lastSync && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Última sincronización:</span>
                  <span className="text-sm font-medium">{formatDate(integration.lastSync)}</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Frecuencia:</span>
                <span className="text-sm font-medium">{integration.syncFrequency}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Registros sincronizados:</span>
                <span className="text-sm font-medium">
                  {integration.recordsSynced.toLocaleString('es-CO')}
                </span>
              </div>

              <div className="pt-2 border-t">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Health Check:</span>
                  {getHealthStatusBadge(integration.healthCheck.status)}
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Latencia:</span>
                  <span>{integration.healthCheck.latency}ms</span>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Última verificación:</span>
                  <span>{formatDate(integration.healthCheck.lastChecked)}</span>
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Settings className="h-4 w-4 mr-2" />
                  Configurar
                </Button>
                {integration.status === 'connected' ? (
                  <Button variant="outline" size="sm" className="flex-1">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Sincronizar
                  </Button>
                ) : (
                  <Button variant="default" size="sm" className="flex-1">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Conectar
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabla Detallada */}
      <Card>
        <CardHeader>
          <CardTitle>Detalles de Integraciones</CardTitle>
          <CardDescription>Vista completa de todas las conexiones configuradas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium">Integración</th>
                  <th className="text-left p-4 font-medium">Tipo</th>
                  <th className="text-left p-4 font-medium">Estado</th>
                  <th className="text-left p-4 font-medium">Health</th>
                  <th className="text-left p-4 font-medium">Latencia</th>
                  <th className="text-left p-4 font-medium">Última Sync</th>
                  <th className="text-left p-4 font-medium">Registros</th>
                </tr>
              </thead>
              <tbody>
                {mockIntegrations.map((integration) => (
                  <tr key={integration.id} className="border-b hover:bg-muted/50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-lg ${
                            integration.status === 'connected'
                              ? 'bg-green-50 dark:bg-green-950 text-green-600'
                              : 'bg-gray-50 dark:bg-gray-950 text-gray-400'
                          }`}
                        >
                          {getTypeIcon(integration.type)}
                        </div>
                        <div>
                          <div className="font-medium">{integration.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {integration.provider}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline">{integration.type}</Badge>
                    </td>
                    <td className="p-4">{getStatusBadge(integration.status)}</td>
                    <td className="p-4">{getHealthStatusBadge(integration.healthCheck.status)}</td>
                    <td className="p-4">
                      <span className="font-mono text-sm">
                        {integration.healthCheck.latency}ms
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm">
                        {integration.lastSync ? formatDate(integration.lastSync) : 'N/A'}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="font-medium">
                        {integration.recordsSynced.toLocaleString('es-CO')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Integraciones Disponibles */}
      <Card>
        <CardHeader>
          <CardTitle>Integraciones Disponibles</CardTitle>
          <CardDescription>
            Conecta nuevos servicios para expandir las capacidades de tu plataforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                name: 'Zoom',
                type: 'Videoconferencia',
                description: 'Clases virtuales y reuniones',
                icon: '🎥',
              },
              {
                name: 'Slack',
                type: 'Comunicación',
                description: 'Notificaciones en tiempo real',
                icon: '💬',
              },
              {
                name: 'Google Calendar',
                type: 'Calendario',
                description: 'Sincronización de horarios',
                icon: '📅',
              },
            ].map((available, idx) => (
              <div
                key={idx}
                className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="text-3xl">{available.icon}</div>
                  <Button variant="ghost" size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <h4 className="font-medium">{available.name}</h4>
                <p className="text-xs text-muted-foreground mb-1">{available.type}</p>
                <p className="text-sm text-muted-foreground">{available.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
