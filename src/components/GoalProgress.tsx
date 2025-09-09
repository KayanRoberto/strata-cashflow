import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Target, Plus } from 'lucide-react';
import { Goal } from '@/types/financial';
import { formatCurrency } from '@/lib/formatters';

interface GoalProgressProps {
  goals: Goal[];
  onAddGoal: () => void;
}

export function GoalProgress({ goals, onAddGoal }: GoalProgressProps) {
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

        <div className="space-y-4">
          {goals.map((goal) => {
            const progress = goal.targetAmount > 0 
              ? (goal.currentAmount / goal.targetAmount) * 100 
              : 0;
            
            const progressColor = progress >= 80 ? 'success' : progress >= 50 ? 'warning' : 'danger';

            return (
              <div key={goal.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-foreground">{goal.name}</h4>
                    <p className="text-xs text-muted-foreground capitalize">
                      {goal.type === 'monthly' ? 'Meta Mensal' : 'Meta Acumulada'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">
                      {formatCurrency(goal.currentAmount)} / {formatCurrency(goal.targetAmount)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {progress.toFixed(1)}%
                    </p>
                  </div>
                </div>

                <Progress 
                  value={Math.min(progress, 100)} 
                  className="h-2"
                />

                {goal.deadline && (
                  <p className="text-xs text-muted-foreground">
                    Prazo: {new Date(goal.deadline).toLocaleDateString('pt-BR')}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}