import { useState, useEffect, useCallback } from 'react';
import { Transaction, Category, Goal, FinancialSummary, CategorySummary } from '@/types/financial';

const STORAGE_KEYS = {
  TRANSACTIONS: 'financial_transactions',
  CATEGORIES: 'financial_categories',
  GOALS: 'financial_goals',
};

const DEFAULT_CATEGORIES: Category[] = [
  { id: '1', name: 'Alimentação', color: '#FF6B6B', icon: '🍽️', type: 'expense' },
  { id: '2', name: 'Transporte', color: '#4ECDC4', icon: '🚗', type: 'expense' },
  { id: '3', name: 'Moradia', color: '#45B7D1', icon: '🏠', type: 'expense' },
  { id: '4', name: 'Saúde', color: '#96CEB4', icon: '💊', type: 'expense' },
  { id: '5', name: 'Educação', color: '#FFEAA7', icon: '📚', type: 'expense' },
  { id: '6', name: 'Lazer', color: '#DDA0DD', icon: '🎉', type: 'expense' },
  { id: '10', name: 'Poupança/Metas', color: '#8B5CF6', icon: '🎯', type: 'expense' },
  { id: '7', name: 'Salário', color: '#55A3FF', icon: '💰', type: 'income' },
  { id: '8', name: 'Freelance', color: '#26D0CE', icon: '💻', type: 'income' },
  { id: '9', name: 'Investimentos', color: '#FFA726', icon: '📈', type: 'income' },
];

export const useFinancialData = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);
  const [goals, setGoals] = useState<Goal[]>([]);

  // Load data from localStorage
  useEffect(() => {
    const savedTransactions = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    const savedCategories = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    const savedGoals = localStorage.getItem(STORAGE_KEYS.GOALS);

    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    }
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    } else {
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(DEFAULT_CATEGORIES));
    }
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }
  }, []);

  // Save data to localStorage
  const saveData = useCallback((key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  }, []);

  // Add transaction
  const addTransaction = useCallback((transaction: Omit<Transaction, 'id' | 'createdAt'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    
    const updatedTransactions = [newTransaction, ...transactions];
    setTransactions(updatedTransactions);
    saveData(STORAGE_KEYS.TRANSACTIONS, updatedTransactions);

    // If transaction has goal allocation, update the goal and create expense transaction
    if (newTransaction.goalId && newTransaction.goalAmount) {
      const updatedGoals = goals.map(goal => 
        goal.id === newTransaction.goalId 
          ? { ...goal, currentAmount: goal.currentAmount + newTransaction.goalAmount! }
          : goal
      );
      setGoals(updatedGoals);
      saveData(STORAGE_KEYS.GOALS, updatedGoals);

      // Create expense transaction for the goal allocation
      const goalExpenseTransaction: Transaction = {
        id: (Date.now() + 1).toString(), // Different ID from the income transaction
        type: 'expense',
        amount: newTransaction.goalAmount,
        description: `Depósito na meta: ${goals.find(g => g.id === newTransaction.goalId)?.name}`,
        category: 'Poupança/Metas',
        date: newTransaction.date,
        createdAt: new Date().toISOString(),
        goalId: newTransaction.goalId,
      };

      const updatedTransactionsWithGoal = [goalExpenseTransaction, ...updatedTransactions];
      setTransactions(updatedTransactionsWithGoal);
      saveData(STORAGE_KEYS.TRANSACTIONS, updatedTransactionsWithGoal);
    }
  }, [transactions, goals, saveData]);

  // Remove transaction
  const removeTransaction = useCallback((id: string) => {
    const updatedTransactions = transactions.filter(t => t.id !== id);
    setTransactions(updatedTransactions);
    saveData(STORAGE_KEYS.TRANSACTIONS, updatedTransactions);
  }, [transactions, saveData]);

  // Add goal
  const addGoal = useCallback((goal: Omit<Goal, 'id' | 'createdAt' | 'currentAmount'>) => {
    const newGoal: Goal = {
      ...goal,
      id: Date.now().toString(),
      currentAmount: 0,
      createdAt: new Date().toISOString(),
    };
    
    const updatedGoals = [newGoal, ...goals];
    setGoals(updatedGoals);
    saveData(STORAGE_KEYS.GOALS, updatedGoals);
  }, [goals, saveData]);

  // Deposit to goal
  const depositToGoal = useCallback((goalId: string, amount: number) => {
    const updatedGoals = goals.map(goal => 
      goal.id === goalId 
        ? { ...goal, currentAmount: goal.currentAmount + amount }
        : goal
    );
    setGoals(updatedGoals);
    saveData(STORAGE_KEYS.GOALS, updatedGoals);

    // Create expense transaction for the manual deposit
    const goalName = goals.find(g => g.id === goalId)?.name || 'Meta';
    const expenseTransaction: Transaction = {
      id: Date.now().toString(),
      type: 'expense',
      amount: amount,
      description: `Depósito manual na meta: ${goalName}`,
      category: 'Poupança/Metas',
      date: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
      goalId: goalId,
    };

    const updatedTransactions = [expenseTransaction, ...transactions];
    setTransactions(updatedTransactions);
    saveData(STORAGE_KEYS.TRANSACTIONS, updatedTransactions);
  }, [goals, transactions, saveData]);

  // Remove from goal
  const removeFromGoal = useCallback((goalId: string, amount: number) => {
    const goal = goals.find(g => g.id === goalId);
    if (!goal || goal.currentAmount < amount) return;

    const updatedGoals = goals.map(goal => 
      goal.id === goalId 
        ? { ...goal, currentAmount: Math.max(0, goal.currentAmount - amount) }
        : goal
    );
    setGoals(updatedGoals);
    saveData(STORAGE_KEYS.GOALS, updatedGoals);

    // Create income transaction for the withdrawal
    const goalName = goal.name;
    const incomeTransaction: Transaction = {
      id: Date.now().toString(),
      type: 'income',
      amount: amount,
      description: `Retirada da meta: ${goalName}`,
      category: 'Poupança/Metas',
      date: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
      goalId: goalId,
    };

    const updatedTransactions = [incomeTransaction, ...transactions];
    setTransactions(updatedTransactions);
    saveData(STORAGE_KEYS.TRANSACTIONS, updatedTransactions);
  }, [goals, transactions, saveData]);

  // Calculate financial summary
  const getFinancialSummary = useCallback((): FinancialSummary => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const monthlyTransactions = transactions.filter(t => {
      const transactionDate = new Date(t.date);
      return transactionDate.getMonth() === currentMonth && 
             transactionDate.getFullYear() === currentYear;
    });

    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const monthlyIncome = monthlyTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const monthlyExpenses = monthlyTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      totalIncome,
      totalExpenses,
      balance: totalIncome - totalExpenses,
      monthlyIncome,
      monthlyExpenses,
      monthlyBalance: monthlyIncome - monthlyExpenses,
    };
  }, [transactions]);

  // Get category summaries
  const getCategorySummaries = useCallback((): CategorySummary[] => {
    const expenseTransactions = transactions.filter(t => t.type === 'expense');
    const totalExpenses = expenseTransactions.reduce((sum, t) => sum + t.amount, 0);

    const categoryTotals = expenseTransactions.reduce((acc, transaction) => {
      acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(categoryTotals).map(([categoryName, amount]) => {
      const category = categories.find(c => c.name === categoryName);
      return {
        category: categoryName,
        amount,
        color: category?.color || '#8884d8',
        percentage: totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0,
      };
    });
  }, [transactions, categories]);

  return {
    transactions,
    categories,
    goals,
    addTransaction,
    removeTransaction,
    addGoal,
    depositToGoal,
    removeFromGoal,
    getFinancialSummary,
    getCategorySummaries,
  };
};