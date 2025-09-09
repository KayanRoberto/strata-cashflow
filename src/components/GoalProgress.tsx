import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Target, Plus, Coins } from 'lucide-react';
import { Goal } from '@/types/financial';
import { formatCurrency } from '@/lib/formatters';
import { cn } from '@/lib/utils';

interface GoalProgressProps {
  goals: Goal[];
  onAddGoal: () => void;
  onDepositClick: (goal: Goal) => void;
}

export function GoalProgress({ goals, onAddGoal, onDepositClick }: GoalProgressProps) {
  if (goals.length === 0) {
    return (
      <Card className="bg-gradient-card border-0 shadow-financial">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Metas Financeiras</h3>
            <Button
              onClick={onAddGoal}
              variant="outline"
              size="sm"
              className="h-8"
            >
              <Plus className="h-4 w-4 mr-1" />
              Nova Meta
            </Button>
          </div>
          
          <div className="text-center py-8 text-muted-foreground">
            <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">Nenhuma meta definida</p>
            <p className="text-sm">Crie suas primeiras metas financeiras</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-card border-0 shadow-financial">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Metas Financeiras</h3>
          <Button
            onClick={onAddGoal}
            variant="outline"
            size="sm"
            className="h-8"
          >
            <Plus className="h-4 w-4 mr-1" />
            Nova Meta
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {goals.map((goal) => {
            const progress = goal.targetAmount > 0 
              ? (goal.currentAmount / goal.targetAmount) * 100 
              : 0;
            
            const progressColor = progress >= 80 ? 'text-success' : progress >= 50 ? 'text-warning' : 'text-danger';
            const bgColor = progress >= 80 ? 'bg-success/10' : progress >= 50 ? 'bg-warning/10' : 'bg-danger/10';
            const borderColor = progress >= 80 ? 'border-success/20' : progress >= 50 ? 'border-warning/20' : 'border-danger/20';

            return (
              <Card key={goal.id} className={cn(
                "relative overflow-hidden border transition-all duration-300 hover:shadow-elevated hover:scale-105 cursor-pointer",
                bgColor,
                borderColor
              )}>
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-lg",
                        progress >= 80 ? 'bg-success text-white' : progress >= 50 ? 'bg-warning text-white' : 'bg-danger text-white'
                      )}>
                        <Target className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground text-sm">{goal.name}</h4>
                        <p className="text-xs text-muted-foreground capitalize">
                          {goal.type === 'monthly' ? 'Meta Mensal' : 'Meta Acumulada'}
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={() => onDepositClick(goal)}
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0"
                    >
                      <Coins className="h-3 w-3" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Progresso:</span>
                      <span className={cn("text-xs font-semibold", progressColor)}>
                        {progress.toFixed(1)}%
                      </span>
                    </div>
                    <Progress 
                      value={Math.min(progress, 100)} 
                      className="h-2"
                    />
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Valor:</span>
                      <span className="text-xs font-semibold">
                        {formatCurrency(goal.currentAmount)} / {formatCurrency(goal.targetAmount)}
                      </span>
                    </div>
                  </div>

                  {goal.deadline && (
                    <p className="text-xs text-muted-foreground">
                      Prazo: {new Date(goal.deadline).toLocaleDateString('pt-BR')}
                    </p>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </Card>
  );
}