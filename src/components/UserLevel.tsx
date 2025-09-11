import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Trophy, Star } from 'lucide-react';
import { UserStats } from '@/types/gamification';
import { cn } from '@/lib/utils';

interface UserLevelProps {
  userStats: UserStats;
}

export function UserLevel({ userStats }: UserLevelProps) {
  const progressPercentage = (userStats.experience / (userStats.experience + userStats.experienceToNext)) * 100;
  
  const getLevelColor = (level: number) => {
    if (level >= 20) return 'from-purple-500 to-pink-500';
    if (level >= 15) return 'from-blue-500 to-purple-500';
    if (level >= 10) return 'from-green-500 to-blue-500';
    if (level >= 5) return 'from-yellow-500 to-green-500';
    return 'from-gray-500 to-yellow-500';
  };

  const getLevelTitle = (level: number) => {
    if (level >= 20) return 'Mestre Financeiro';
    if (level >= 15) return 'Expert em Finanças';
    if (level >= 10) return 'Investidor Avançado';
    if (level >= 5) return 'Poupador Experiente';
    return 'Iniciante';
  };

  return (
    <Card className="bg-gradient-card border-0 shadow-financial">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className={cn(
            "flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br text-white shadow-lg",
            getLevelColor(userStats.level)
          )}>
            <Trophy className="h-8 w-8" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-xl font-bold text-foreground">Nível {userStats.level}</h3>
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, Math.floor(userStats.level / 5) + 1) }).map((_, i) => (
                  <Star 
                    key={i} 
                    className={cn(
                      "h-4 w-4",
                      i < Math.floor(userStats.level / 5) ? "text-yellow-500 fill-current" : "text-muted-foreground"
                    )} 
                  />
                ))}
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{getLevelTitle(userStats.level)}</p>
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Experiência</span>
                <span>{userStats.experience}/{userStats.experience + userStats.experienceToNext}</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-success/10 rounded-lg border border-success/20">
            <p className="text-2xl font-bold text-success">{userStats.goalsCompleted}</p>
            <p className="text-xs text-muted-foreground">Metas Completas</p>
          </div>
          
          <div className="text-center p-3 bg-warning/10 rounded-lg border border-warning/20">
            <p className="text-2xl font-bold text-warning">{userStats.savingsStreak}</p>
            <p className="text-xs text-muted-foreground">Dias Poupando</p>
          </div>
          
          <div className="text-center p-3 bg-primary/10 rounded-lg border border-primary/20">
            <p className="text-2xl font-bold text-primary">{userStats.totalTransactions}</p>
            <p className="text-xs text-muted-foreground">Transações</p>
          </div>
          
          <div className="text-center p-3 bg-success/10 rounded-lg border border-success/20">
            <p className="text-2xl font-bold text-success">R$ {userStats.totalSaved.toFixed(0)}</p>
            <p className="text-xs text-muted-foreground">Poupado</p>
          </div>
        </div>
      </div>
    </Card>
  );
}