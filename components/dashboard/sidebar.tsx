'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  DollarSign,
  TrendingUp,
  Users,
  BarChart3,
  Moon,
  Sun
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

const navigation = [
  { name: 'Overview', href: '/dashboard/overview', icon: LayoutDashboard },
  { name: 'Ventas', href: '/dashboard/sales', icon: DollarSign, badge: 3 },
  { name: 'Marketing', href: '/dashboard/marketing', icon: TrendingUp },
  { name: 'Estudiantes', href: '/dashboard/students', icon: Users },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-background">
      {/* Logo */}
      <div className="flex h-16 items-center border-b px-6">
        <h1 className="text-xl font-bold text-primary">JGSL</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="flex-1">{item.name}</span>
              {item.badge && (
                <Badge variant="secondary" className="h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center">
                  {item.badge}
                </Badge>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Theme Toggle & User */}
      <div className="border-t p-4 space-y-3">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleTheme}
          className="w-full justify-start"
        >
          {isDark ? (
            <>
              <Sun className="h-4 w-4 mr-2" />
              Modo Claro
            </>
          ) : (
            <>
              <Moon className="h-4 w-4 mr-2" />
              Modo Oscuro
            </>
          )}
        </Button>

        <div className="flex items-center gap-3 rounded-lg bg-accent p-3">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-semibold">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Admin</p>
            <p className="text-xs text-muted-foreground truncate">admin@jgsl.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
