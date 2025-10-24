'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockUsers, getActiveUsersCount } from '@/lib/data/system-data';
import { Users, UserCheck, UserX, Shield, Plus, Edit, Trash2 } from 'lucide-react';
import type { UserRole } from '@/types';

export default function UsuariosPage() {
  const activeUsers = getActiveUsersCount();
  const totalUsers = mockUsers.length;
  const inactiveUsers = totalUsers - activeUsers;

  const getRoleBadge = (role: UserRole) => {
    const variants: Record<UserRole, { label: string; color: string }> = {
      admin: { label: 'Administrador', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' },
      manager: { label: 'Manager', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' },
      advisor: { label: 'Asesor', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' },
      marketing: { label: 'Marketing', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' },
    };

    const { label, color } = variants[role];
    return <Badge className={color}>{label}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    if (status === 'active') {
      return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Activo</Badge>;
    }
    return <Badge variant="secondary">Inactivo</Badge>;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-CO', {
      year: 'numeric',
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
          <h1 className="text-3xl font-bold">Gestión de Usuarios</h1>
          <p className="text-muted-foreground">
            Administra usuarios, roles y permisos del sistema
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nuevo Usuario
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Usuarios</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-xs text-muted-foreground">Registrados en el sistema</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios Activos</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeUsers}</div>
            <p className="text-xs text-muted-foreground">
              {((activeUsers / totalUsers) * 100).toFixed(0)}% del total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios Inactivos</CardTitle>
            <UserX className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{inactiveUsers}</div>
            <p className="text-xs text-muted-foreground">Cuentas deshabilitadas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Roles Activos</CardTitle>
            <Shield className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Admin, Manager, Asesor, Marketing</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabla de Usuarios */}
      <Card>
        <CardHeader>
          <CardTitle>Usuarios del Sistema</CardTitle>
          <CardDescription>
            Lista completa de usuarios con sus roles y permisos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium">Usuario</th>
                  <th className="text-left p-4 font-medium">Departamento</th>
                  <th className="text-left p-4 font-medium">Rol</th>
                  <th className="text-left p-4 font-medium">Estado</th>
                  <th className="text-left p-4 font-medium">Último Acceso</th>
                  <th className="text-left p-4 font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {mockUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-muted/50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="h-10 w-10 rounded-full"
                        />
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm">{user.department}</div>
                    </td>
                    <td className="p-4">{getRoleBadge(user.role)}</td>
                    <td className="p-4">{getStatusBadge(user.status)}</td>
                    <td className="p-4">
                      <div className="text-sm">
                        {user.lastLogin ? formatDate(user.lastLogin) : 'Nunca'}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Matriz de Permisos */}
      <Card>
        <CardHeader>
          <CardTitle>Matriz de Permisos por Rol</CardTitle>
          <CardDescription>
            Comparación de permisos asignados a cada rol del sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium">Permiso</th>
                  <th className="text-center p-4 font-medium">Administrador</th>
                  <th className="text-center p-4 font-medium">Manager</th>
                  <th className="text-center p-4 font-medium">Asesor</th>
                  <th className="text-center p-4 font-medium">Marketing</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { key: 'viewDashboard', label: 'Ver Dashboard' },
                  { key: 'viewSales', label: 'Ver Ventas' },
                  { key: 'viewMarketing', label: 'Ver Marketing' },
                  { key: 'viewStudents', label: 'Ver Estudiantes' },
                  { key: 'viewAnalytics', label: 'Ver Analytics' },
                  { key: 'manageUsers', label: 'Gestionar Usuarios' },
                  { key: 'manageIntegrations', label: 'Gestionar Integraciones' },
                  { key: 'viewSystemArchitecture', label: 'Ver Arquitectura' },
                  { key: 'exportData', label: 'Exportar Datos' },
                  { key: 'configureAlerts', label: 'Configurar Alertas' },
                ].map((permission) => {
                  const adminUser = mockUsers.find((u) => u.role === 'admin');
                  const managerUser = mockUsers.find((u) => u.role === 'manager');
                  const advisorUser = mockUsers.find((u) => u.role === 'advisor');
                  const marketingUser = mockUsers.find((u) => u.role === 'marketing');

                  return (
                    <tr key={permission.key} className="border-b hover:bg-muted/50">
                      <td className="p-4 font-medium">{permission.label}</td>
                      <td className="text-center p-4">
                        {adminUser?.permissions[permission.key as keyof typeof adminUser.permissions] ? (
                          <span className="text-green-600 text-xl">✓</span>
                        ) : (
                          <span className="text-red-600 text-xl">✗</span>
                        )}
                      </td>
                      <td className="text-center p-4">
                        {managerUser?.permissions[permission.key as keyof typeof managerUser.permissions] ? (
                          <span className="text-green-600 text-xl">✓</span>
                        ) : (
                          <span className="text-red-600 text-xl">✗</span>
                        )}
                      </td>
                      <td className="text-center p-4">
                        {advisorUser?.permissions[permission.key as keyof typeof advisorUser.permissions] ? (
                          <span className="text-green-600 text-xl">✓</span>
                        ) : (
                          <span className="text-red-600 text-xl">✗</span>
                        )}
                      </td>
                      <td className="text-center p-4">
                        {marketingUser?.permissions[permission.key as keyof typeof marketingUser.permissions] ? (
                          <span className="text-green-600 text-xl">✓</span>
                        ) : (
                          <span className="text-red-600 text-xl">✗</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
