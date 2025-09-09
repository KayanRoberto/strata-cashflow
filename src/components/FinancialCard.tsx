import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface FinancialCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
  gradient?: 'primary' | 'success' | 'warning' | 'danger';
  className?: string;
}

export function FinancialCard({
  title,
  value,
  change,
  changeType = 'neutral',
  icon,
  gradient = 'primary',
  className
}: FinancialCardProps) {
  const gradientClass = {
    primary: 'bg-gradient-primary',
    success: 'bg-gradient-success',
    warning: 'bg-gradient-warning',
    danger: 'bg-gradient-danger'
  }[gradient];

  const changeColor = {
    positive: 'text-success',
    negative: 'text-danger',
    neutral: 'text-muted-foreground'
  }[changeType];

  return (
    <Card className={cn(
      'relative overflow-hidden border-0 shadow-financial transition-all duration-300 hover:shadow-elevated hover:scale-105',
      'bg-gradient-card',
      className
    )}>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              {title}
            </p>
            <p className="text-2xl font-bold text-foreground">
              {value}
            </p>
            {change && (
              <p className={cn('text-xs font-medium', changeColor)}>
                {change}
              </p>
            )}
          </div>
          <div className={cn(
            'flex h-12 w-12 items-center justify-center rounded-xl text-white',
            gradientClass
          )}>
            {icon}
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 transform translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
    </Card>
  );
}