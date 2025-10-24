'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockAlerts, getUnreadAlertsCount } from '@/lib/data/system-data';
import {
  Bell,
  BellOff,
  AlertCircle,
  AlertTriangle,
  Info,
  CheckCircle2,
  X,
  Check,
  Settings,
} from 'lucide-react';
import type { AlertSeverity, AlertCategory } from '@/types';

export default function AlertasPage() {
  const unreadCount = getUnreadAlertsCount();
  const criticalAlerts = mockAlerts.filter((a) => a.severity === 'critical').length;
  const warningAlerts = mockAlerts.filter((a) => a.severity === 'warning').length;
  const resolvedAlerts = mockAlerts.filter((a) => a.status === 'resolved').length;

  const getSeverityIcon = (severity: AlertSeverity) => {
    if (severity === 'critical') return <AlertCircle className="h-5 w-5" />;
    if (severity === 'warning') return <AlertTriangle className="h-5 w-5" />;
    return <Info className="h-5 w-5" />;
  };

  const getSeverityBadge = (severity: AlertSeverity) => {
    const variants = {
      critical: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      info: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    };
    const labels = {
      critical: 'Crítica',
      warning: 'Advertencia',
      info: 'Informativa',
    };
    return <Badge className={variants[severity]}>{labels[severity]}</Badge>;
  };

  const getCategoryBadge = (category: AlertCategory) => {
    const labels = {
      system: 'Sistema',
      business: 'Negocio',
      student: 'Estudiante',
      financial: 'Financiero',
    };
    return <Badge variant="outline">{labels[category]}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    if (status === 'unread') {
      return <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300">No leída</Badge>;
    }
    if (status === 'resolved') {
      return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Resuelta</Badge>;
    }
    return <Badge variant="secondary">Leída</Badge>;
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `Hace ${minutes}m`;
    if (hours < 24) return `Hace ${hours}h`;
    return `Hace ${days}d`;
  };

  const formatFullDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-CO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const filterAlerts = (status?: string) => {
    if (status === 'unread') return mockAlerts.filter((a) => a.status === 'unread');
    if (status === 'resolved') return mockAlerts.filter((a) => a.status === 'resolved');
    return mockAlerts;
  };

  const renderAlertsList = (alerts: typeof mockAlerts) => (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`p-4 border rounded-lg ${
            alert.status === 'unread' ? 'bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-900' : ''
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex gap-3 flex-1">
              <div className="mt-1">{getSeverityIcon(alert.severity)}</div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold">{alert.title}</h3>
                  {getSeverityBadge(alert.severity)}
                  {getCategoryBadge(alert.category)}
                  {getStatusBadge(alert.status)}
                </div>
                <p className="text-sm text-muted-foreground">{alert.message}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{formatDate(alert.timestamp)}</span>
                  <span>{formatFullDate(alert.timestamp)}</span>
                  {alert.resolvedAt && (
                    <span className="text-green-600">
                      Resuelta: {formatFullDate(alert.resolvedAt)}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              {alert.status === 'unread' && (
                <Button variant="ghost" size="sm" title="Marcar como leída">
                  <Check className="h-4 w-4" />
                </Button>
              )}
              {alert.status !== 'resolved' && (
                <Button variant="ghost" size="sm" title="Resolver">
                  <CheckCircle2 className="h-4 w-4" />
                </Button>
              )}
              <Button variant="ghost" size="sm" title="Descartar">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {alert.actionUrl && (
            <div className="mt-3 ml-8">
              <Button variant="outline" size="sm">
                Ver detalles
              </Button>
            </div>
          )}
        </div>
      ))}
      {alerts.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <BellOff className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No hay alertas en esta categoría</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Centro de Alertas</h1>
          <p className="text-muted-foreground">
            Notificaciones y alertas del sistema en tiempo real
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Settings className="h-4 w-4" />
          Configurar Alertas
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertas Activas</CardTitle>
            <Bell className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{unreadCount}</div>
            <p className="text-xs text-muted-foreground">Requieren atención</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Críticas</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{criticalAlerts}</div>
            <p className="text-xs text-muted-foreground">Alta prioridad</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Advertencias</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{warningAlerts}</div>
            <p className="text-xs text-muted-foreground">Prioridad media</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resueltas</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{resolvedAlerts}</div>
            <p className="text-xs text-muted-foreground">Últimas 24h</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs de Alertas */}
      <Card>
        <CardHeader>
          <CardTitle>Todas las Alertas</CardTitle>
          <CardDescription>
            Filtra y gestiona las notificaciones del sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">
                Todas ({mockAlerts.length})
              </TabsTrigger>
              <TabsTrigger value="unread">
                No leídas ({unreadCount})
              </TabsTrigger>
              <TabsTrigger value="resolved">
                Resueltas ({resolvedAlerts})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              {renderAlertsList(filterAlerts())}
            </TabsContent>

            <TabsContent value="unread" className="mt-6">
              {renderAlertsList(filterAlerts('unread'))}
            </TabsContent>

            <TabsContent value="resolved" className="mt-6">
              {renderAlertsList(filterAlerts('resolved'))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Configuración de Alertas */}
      <Card>
        <CardHeader>
          <CardTitle>Configuración de Notificaciones</CardTitle>
          <CardDescription>
            Personaliza qué alertas quieres recibir y cómo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                title: 'Alertas de Sistema',
                description: 'Errores de sincronización, caídas de servicio, problemas técnicos',
                enabled: true,
              },
              {
                title: 'Alertas de Negocio',
                description: 'Conversiones, metas alcanzadas, métricas importantes',
                enabled: true,
              },
              {
                title: 'Alertas de Estudiantes',
                description: 'Pagos pendientes, graduaciones próximas, seguimientos',
                enabled: true,
              },
              {
                title: 'Alertas Financieras',
                description: 'Cambios en márgenes, costos elevados, proyecciones',
                enabled: false,
              },
            ].map((config, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="space-y-1">
                  <h4 className="font-medium">{config.title}</h4>
                  <p className="text-sm text-muted-foreground">{config.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    className={
                      config.enabled
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
                    }
                  >
                    {config.enabled ? 'Activada' : 'Desactivada'}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
