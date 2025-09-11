import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, AlertTriangle, Target, Lightbulb } from 'lucide-react';
import { Prediction } from '@/types/gamification';
import { formatCurrency } from '@/lib/formatters';
import { cn } from '@/lib/utils';

interface PredictionCardProps {
  prediction: Prediction;
}

export function PredictionCard({ prediction }: PredictionCardProps) {
  const getIcon = () => {
    switch (prediction.type) {
      case 'balance':
        return prediction.priority === 'high' && prediction.value && prediction.value < 0 
          ? <TrendingDown className="h-5 w-5" />
          : <TrendingUp className="h-5 w-5" />;
      case 'goal_completion':
        return <Target className="h-5 w-5" />;
      case 'savings_recommendation':
        return <Lightbulb className="h-5 w-5" />;
      default:
        return <AlertTriangle className="h-5 w-5" />;
    }
  };

  const getColors = () => {
    if (prediction.priority === 'high') {
      return {
        bg: 'bg-danger/10',
        border: 'border-danger/20',
        icon: 'text-danger',
        badge: 'bg-danger text-danger-foreground',
      };
    }
    if (prediction.priority === 'medium') {
      return {
        bg: 'bg-warning/10',
        border: 'border-warning/20', 
        icon: 'text-warning',
        badge: 'bg-warning text-warning-foreground',
      };
    }
    return {
      bg: 'bg-success/10',
      border: 'border-success/20',
      icon: 'text-success', 
      badge: 'bg-success text-success-foreground',
    };
  };

  const colors = getColors();
  
  const confidenceLabels = {
    low: 'Baixa',
    medium: 'Média', 
    high: 'Alta'
  };

  const priorityLabels = {
    low: 'Baixa',
    medium: 'Média',
    high: 'Alta'
  };

  return (
    <Card className={cn(
      "p-4 transition-all duration-300 hover:shadow-elevated",
      colors.bg,
      colors.border
    )}>
      <div className="flex items-start gap-3">
        <div className={cn(
          "flex h-10 w-10 items-center justify-center rounded-lg bg-background/50",
          colors.icon
        )}>
          {getIcon()}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-semibold text-sm text-foreground truncate">
              {prediction.title}
            </h4>
            {prediction.priority === 'high' && (
              <Badge className={colors.badge}>
                Prioridade {priorityLabels[prediction.priority]}
              </Badge>
            )}
          </div>
          
          <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
            {prediction.description}
          </p>
          
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-xs">
              Confiança: {confidenceLabels[prediction.confidence]}
            </Badge>
            
            {prediction.value && prediction.type === 'balance' && (
              <span className={cn(
                "text-sm font-semibold",
                prediction.value >= 0 ? "text-success" : "text-danger"
              )}>
                {formatCurrency(prediction.value)}
              </span>
            )}
            
            {prediction.value && prediction.type === 'goal_completion' && (
              <span className="text-sm font-semibold text-primary">
                {prediction.value} {prediction.value === 1 ? 'mês' : 'meses'}
              </span>
            )}
            
            {prediction.value && prediction.type === 'savings_recommendation' && (
              <span className="text-sm font-semibold text-success">
                {formatCurrency(prediction.value)}/mês
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}