'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, User, TrendingUp, Users as UsersIcon } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const roles = [
    {
      id: 'admin',
      name: 'Administrador',
      description: 'Acceso completo al sistema, gestión de usuarios e integraciones',
      icon: Shield,
      color: 'bg-red-50 dark:bg-red-950 text-red-600',
      badgeColor: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      permissions: [
        'Ver todos los dashboards',
        'Gestionar usuarios y permisos',
        'Configurar integraciones',
        'Ver arquitectura del sistema',
        'Exportar datos',
        'Configurar alertas',
      ],
    },
    {
      id: 'manager',
      name: 'Manager',
      description: 'Acceso a analytics, reportes y gestión operativa',
      icon: TrendingUp,
      color: 'bg-blue-50 dark:bg-blue-950 text-blue-600',
      badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      permissions: [
        'Ver todos los dashboards',
        'Exportar reportes',
        'Ver arquitectura del sistema',
        'Configurar alertas',
        'Analytics avanzado',
      ],
    },
    {
      id: 'advisor',
      name: 'Asesor Académico',
      description: 'Gestión de estudiantes y pipeline de ventas',
      icon: UsersIcon,
      color: 'bg-green-50 dark:bg-green-950 text-green-600',
      badgeColor: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      permissions: [
        'Ver dashboard principal',
        'Gestionar su pipeline',
        'Ver información de estudiantes',
        'Actualizar estados',
      ],
    },
    {
      id: 'marketing',
      name: 'Marketing',
      description: 'Acceso a campañas, ROI y métricas de marketing',
      icon: User,
      color: 'bg-purple-50 dark:bg-purple-950 text-purple-600',
      badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      permissions: [
        'Ver dashboard principal',
        'Gestionar campañas',
        'Ver métricas de marketing',
        'Exportar reportes de campañas',
        'Analytics de marketing',
      ],
    },
  ];

  const handleLogin = () => {
    if (selectedRole) {
      // Simular login y redirigir al dashboard
      router.push('/dashboard/overview');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Plataforma Global Analytics</h1>
          <p className="text-lg text-muted-foreground">
            Sistema de gestión para agencias de idiomas
          </p>
          <Badge className="mt-4 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
            Demo Mode
          </Badge>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">Selecciona tu Rol</CardTitle>
            <CardDescription>
              Elige el rol con el que deseas acceder al sistema para la demostración
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {roles.map((role) => {
                const Icon = role.icon;
                const isSelected = selectedRole === role.id;

                return (
                  <div
                    key={role.id}
                    onClick={() => setSelectedRole(role.id)}
                    className={`cursor-pointer rounded-lg border-2 p-6 transition-all hover:shadow-lg ${
                      isSelected
                        ? 'border-primary shadow-lg scale-105'
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`p-3 rounded-lg ${role.color}`}>
                        <Icon className="h-8 w-8" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-lg">{role.name}</h3>
                          <Badge className={role.badgeColor}>{role.id}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{role.description}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium text-sm text-muted-foreground">Permisos:</h4>
                      <ul className="space-y-1">
                        {role.permissions.map((permission, idx) => (
                          <li key={idx} className="text-sm flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-600" />
                            {permission}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                {selectedRole ? (
                  <span className="text-primary font-medium">
                    Rol seleccionado: {roles.find((r) => r.id === selectedRole)?.name}
                  </span>
                ) : (
                  'Selecciona un rol para continuar'
                )}
              </div>
              <Button
                size="lg"
                disabled={!selectedRole}
                onClick={handleLogin}
                className="px-8"
              >
                Iniciar Sesión
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="grid gap-4 md:grid-cols-3 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-1">10+</div>
                <div className="text-sm text-muted-foreground">Módulos del Sistema</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-1">99.8%</div>
                <div className="text-sm text-muted-foreground">Uptime del Sistema</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-1">5+</div>
                <div className="text-sm text-muted-foreground">Integraciones Activas</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6 text-sm text-muted-foreground">
          <p>
            Sistema desarrollado para{' '}
            <span className="font-semibold">Agencias de Idiomas y Educación Internacional</span>
          </p>
          <p className="mt-1">© 2025 JGSL - Todos los derechos reservados</p>
        </div>
      </div>
    </div>
  );
}
