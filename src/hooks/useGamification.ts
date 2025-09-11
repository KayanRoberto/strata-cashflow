import { useState, useEffect, useCallback } from 'react';
import { Achievement, UserStats } from '@/types/gamification';
import { Transaction, Goal } from '@/types/financial';

const STORAGE_KEY = 'gamification_data';

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_goal',
    title: 'Primeiro Passo',
    description: 'Crie sua primeira meta financeira',
    icon: '🎯',
    type: 'bronze',
    condition: { type: 'goal_count', value: 1 },
    isUnlocked: false,
  },
  {
    id: 'goal_master',
    title: 'Mestre das Metas',
    description: 'Complete sua primeira meta',
    icon: '🏆',
    type: 'gold',
    condition: { type: 'goal_completed', value: 1 },
    isUnlocked: false,
  },
  {
    id: 'savings_starter',
    title: 'Poupador Iniciante',
    description: 'Economize R$ 1.000',
    icon: '💰',
    type: 'bronze',
    condition: { type: 'balance_milestone', value: 1000 },
    isUnlocked: false,
  },
  {
    id: 'savings_pro',
    title: 'Poupador Profissional',
    description: 'Economize R$ 10.000',
    icon: '💎',
    type: 'diamond',
    condition: { type: 'balance_milestone', value: 10000 },
    isUnlocked: false,
  },
  {
    id: 'transaction_expert',
    title: 'Expert em Transações',
    description: 'Registre 100 transações',
    icon: '📊',
    type: 'silver',
    condition: { type: 'transaction_count', value: 100 },
    isUnlocked: false,
  },
  {
    id: 'consistency_king',
    title: 'Rei da Consistência',
    description: 'Mantenha uma sequência de 30 dias poupando',
    icon: '🔥',
    type: 'gold',
    condition: { type: 'savings_streak', value: 30 },
    isUnlocked: false,
  },
];

export const useGamification = (transactions: Transaction[], goals: Goal[]) => {
  const [achievements, setAchievements] = useState<Achievement[]>(ACHIEVEMENTS);
  const [userStats, setUserStats] = useState<UserStats>({
    level: 1,
    experience: 0,
    experienceToNext: 100,
    goalsCompleted: 0,
    savingsStreak: 0,
    totalTransactions: 0,
    totalSaved: 0,
  });

  // Load gamification data
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const data = JSON.parse(saved);
      setAchievements(data.achievements || ACHIEVEMENTS);
      setUserStats(data.userStats || userStats);
    }
  }, []);

  // Save gamification data
  const saveData = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      achievements,
      userStats,
    }));
  }, [achievements, userStats]);

  // Calculate user stats based on transactions and goals
  const calculateStats = useCallback(() => {
    const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    const balance = totalIncome - totalExpenses;
    
    const completedGoals = goals.filter(g => g.currentAmount >= g.targetAmount).length;
    
    // Calculate savings streak (simplified)
    const savingsTransactions = transactions.filter(t => t.goalId);
    const streak = savingsTransactions.length > 0 ? Math.min(savingsTransactions.length, 30) : 0;

    const newStats: UserStats = {
      level: Math.floor((transactions.length + completedGoals * 10) / 20) + 1,
      experience: (transactions.length + completedGoals * 10) % 100,
      experienceToNext: 100 - ((transactions.length + completedGoals * 10) % 100),
      goalsCompleted: completedGoals,
      savingsStreak: streak,
      totalTransactions: transactions.length,
      totalSaved: Math.max(0, balance),
    };

    setUserStats(newStats);
    return newStats;
  }, [transactions, goals]);

  // Check and unlock achievements
  const checkAchievements = useCallback(() => {
    const stats = calculateStats();
    const newAchievements = achievements.map(achievement => {
      if (achievement.isUnlocked) return achievement;

      let shouldUnlock = false;
      
      switch (achievement.condition.type) {
        case 'goal_count':
          shouldUnlock = goals.length >= achievement.condition.value;
          break;
        case 'goal_completed':
          shouldUnlock = stats.goalsCompleted >= achievement.condition.value;
          break;
        case 'transaction_count':
          shouldUnlock = stats.totalTransactions >= achievement.condition.value;
          break;
        case 'balance_milestone':
          shouldUnlock = stats.totalSaved >= achievement.condition.value;
          break;
        case 'savings_streak':
          shouldUnlock = stats.savingsStreak >= achievement.condition.value;
          break;
      }

      if (shouldUnlock) {
        return {
          ...achievement,
          isUnlocked: true,
          unlockedAt: new Date().toISOString(),
        };
      }

      return achievement;
    });

    setAchievements(newAchievements);
    
    // Return newly unlocked achievements
    return newAchievements.filter((ach, index) => 
      ach.isUnlocked && !achievements[index].isUnlocked
    );
  }, [achievements, goals, calculateStats]);

  // Get recent achievements
  const getRecentAchievements = useCallback(() => {
    return achievements
      .filter(a => a.isUnlocked)
      .sort((a, b) => new Date(b.unlockedAt!).getTime() - new Date(a.unlockedAt!).getTime())
      .slice(0, 3);
  }, [achievements]);

  // Update stats and check achievements
  useEffect(() => {
    calculateStats();
    checkAchievements();
    saveData();
  }, [transactions, goals]);

  return {
    achievements,
    userStats,
    checkAchievements,
    getRecentAchievements,
  };
};