import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus, LucideIcon } from 'lucide-react';
import { cn, formatCOP } from '@/lib/utils';

interface KPICardProps {
  title: string;
  value: string | number;
  change: number;
  icon: LucideIcon;
  format?: 'currency' | 'number' | 'percentage';
  subtitle?: string; // Optional subtitle next to the value
}

export function KPICard({ title, value, change, icon: Icon, format = 'number', subtitle }: KPICardProps) {
  const isPositive = change > 0;
  const isNeutral = change === 0;

  const formatValue = (val: string | number) => {
    if (typeof val === 'string') return val;

    switch (format) {
      case 'currency':
        return formatCOP(val);
      case 'percentage':
        return `${val.toFixed(1)}%`;
      default:
        return val.toLocaleString('es-CO');
    }
  };

  return (
    <Card className="transition-all hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2">
          <div className="text-2xl font-bold">{formatValue(value)}</div>
          {subtitle && (
            <div className="text-lg font-semibold text-muted-foreground">
              {subtitle}
            </div>
          )}
        </div>
        <div className="flex items-center gap-1 text-xs mt-2">
          {isNeutral ? (
            <Minus className="h-4 w-4 text-muted-foreground" />
          ) : isPositive ? (
            <TrendingUp className="h-4 w-4 text-green-500" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-500" />
          )}
          <span
            className={cn(
              'font-medium',
              isNeutral && 'text-muted-foreground',
              isPositive && 'text-green-500',
              !isPositive && !isNeutral && 'text-red-500'
            )}
          >
            {isPositive && '+'}
            {change.toFixed(1)}%
          </span>
          <span className="text-muted-foreground">vs mes anterior</span>
        </div>
      </CardContent>
    </Card>
  );
}
