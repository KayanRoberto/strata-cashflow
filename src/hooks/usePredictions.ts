import { useMemo } from 'react';
import { Transaction, Goal } from '@/types/financial';
import { Prediction } from '@/types/gamification';

export const usePredictions = (transactions: Transaction[], goals: Goal[]) => {
  const predictions = useMemo((): Prediction[] => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    // Get monthly data for the last 3 months
    const monthlyData = Array.from({ length: 3 }, (_, i) => {
      const date = new Date(currentYear, currentMonth - i, 1);
      const monthTransactions = transactions.filter(t => {
        const tDate = new Date(t.date);
        return tDate.getMonth() === date.getMonth() && 
               tDate.getFullYear() === date.getFullYear();
      });
      
      const income = monthTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
        
      const expenses = monthTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
        
      return { income, expenses, balance: income - expenses };
    });

    const avgIncome = monthlyData.reduce((sum, m) => sum + m.income, 0) / monthlyData.length;
    const avgExpenses = monthlyData.reduce((sum, m) => sum + m.expenses, 0) / monthlyData.length;
    const avgBalance = avgIncome - avgExpenses;

    const predictions: Prediction[] = [];

    // Balance prediction
    const currentBalance = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0) - 
      transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    const futureBalance = currentBalance + (avgBalance * 3); // 3 months ahead
    
    predictions.push({
      type: 'balance',
      title: 'Previsão de Saldo (3 meses)',
      description: `Com base no seu padrão atual, você terá aproximadamente R$ ${futureBalance.toFixed(2)} em 3 meses`,
      value: futureBalance,
      confidence: monthlyData.length >= 3 ? 'high' : 'medium',
      priority: futureBalance < currentBalance ? 'high' : 'low',
    });

    // Goal completion predictions
    goals.forEach(goal => {
      if (goal.currentAmount >= goal.targetAmount) return;
      
      const remaining = goal.targetAmount - goal.currentAmount;
      const goalTransactions = transactions.filter(t => t.goalId === goal.id);
      
      if (goalTransactions.length > 0) {
        const avgMonthlyContribution = goalTransactions
          .reduce((sum, t) => sum + (t.type === 'expense' ? t.amount : -t.amount), 0) / 
          Math.max(1, monthlyData.length);
          
        if (avgMonthlyContribution > 0) {
          const monthsToComplete = Math.ceil(remaining / avgMonthlyContribution);
          
          predictions.push({
            type: 'goal_completion',
            title: `Meta: ${goal.name}`,
            description: `No ritmo atual, você completará esta meta em ${monthsToComplete} meses`,
            goalId: goal.id,
            value: monthsToComplete,
            confidence: monthsToComplete <= 12 ? 'high' : 'medium',
            priority: monthsToComplete <= 6 ? 'high' : 'medium',
          });
        }
      }
    });

    // Savings recommendations
    if (avgBalance > 0) {
      const recommendedSavings = Math.min(avgBalance * 0.3, avgIncome * 0.2);
      
      predictions.push({
        type: 'savings_recommendation',
        title: 'Recomendação de Poupança',
        description: `Baseado na sua renda, recomendamos economizar R$ ${recommendedSavings.toFixed(2)} por mês`,
        value: recommendedSavings,
        confidence: 'medium',
        priority: 'medium',
      });
    }

    // Expense alerts
    if (monthlyData.length >= 2) {
      const lastMonthExpenses = monthlyData[0].expenses;
      const previousMonthExpenses = monthlyData[1].expenses;
      const expenseIncrease = lastMonthExpenses - previousMonthExpenses;
      
      if (expenseIncrease > avgIncome * 0.1) {
        predictions.push({
          type: 'balance',
          title: 'Alerta de Gastos',
          description: `Seus gastos aumentaram R$ ${expenseIncrease.toFixed(2)} no último mês. Considere revisar suas despesas.`,
          value: expenseIncrease,
          confidence: 'high',
          priority: 'high',
        });
      }
    }

    return predictions.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }, [transactions, goals]);

  return { predictions };
};