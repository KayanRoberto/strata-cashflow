import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Achievement } from '@/types/gamification';
import { cn } from '@/lib/utils';

interface AchievementCardProps {
  achievement: Achievement;
  isNew?: boolean;
}

export function AchievementCard({ achievement, isNew = false }: AchievementCardProps) {
  const typeColors = {
    bronze: 'bg-gradient-to-br from-amber-600 to-amber-800 text-white',
    silver: 'bg-gradient-to-br from-gray-400 to-gray-600 text-white', 
    gold: 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white',
    diamond: 'bg-gradient-to-br from-blue-400 to-purple-600 text-white',
  };

  const typeLabels = {
    bronze: 'Bronze',
    silver: 'Prata',
    gold: 'Ouro', 
    diamond: 'Diamante',
  };

  return (
    <Card className={cn(
      "relative p-4 transition-all duration-300",
      achievement.isUnlocked 
        ? "bg-gradient-card border-primary/20 shadow-financial" 
        : "bg-muted/50 border-muted opacity-60",
      isNew && "animate-pulse ring-2 ring-primary"
    )}>
      {isNew && (
        <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground animate-bounce">
          Novo!
        </Badge>
      )}
      
      <div className="flex items-center gap-3">
        <div className={cn(
          "flex h-12 w-12 items-center justify-center rounded-full text-2xl",
          achievement.isUnlocked ? typeColors[achievement.type] : "bg-muted text-muted-foreground"
        )}>
          {achievement.icon}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className={cn(
              "font-semibold text-sm truncate",
              achievement.isUnlocked ? "text-foreground" : "text-muted-foreground"
            )}>
              {achievement.title}
            </h4>
            <Badge 
              variant="outline" 
              className={cn(
                "text-xs",
                achievement.isUnlocked ? typeColors[achievement.type] : "border-muted"
              )}
            >
              {typeLabels[achievement.type]}
            </Badge>
          </div>
          
          <p className={cn(
            "text-xs",
            achievement.isUnlocked ? "text-muted-foreground" : "text-muted-foreground/60"
          )}>
            {achievement.description}
          </p>
          
          {achievement.isUnlocked && achievement.unlockedAt && (
            <p className="text-xs text-primary font-medium mt-1">
              Desbloqueado em {new Date(achievement.unlockedAt).toLocaleDateString('pt-BR')}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}