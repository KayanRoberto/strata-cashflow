export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  type: 'bronze' | 'silver' | 'gold' | 'diamond';
  condition: {
    type: 'goal_completed' | 'savings_streak' | 'transaction_count' | 'goal_count' | 'balance_milestone';
    value: number;
  };
  unlockedAt?: string;
  isUnlocked: boolean;
}

export interface UserStats {
  level: number;
  experience: number;
  experienceToNext: number;
  goalsCompleted: number;
  savingsStreak: number;
  totalTransactions: number;
  totalSaved: number;
}

export interface Prediction {
  type: 'balance' | 'goal_completion' | 'savings_recommendation';
  title: string;
  description: string;
  value?: number;
  goalId?: string;
  confidence: 'low' | 'medium' | 'high';
  priority: 'low' | 'medium' | 'high';
}