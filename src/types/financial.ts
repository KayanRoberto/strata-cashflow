export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  category: string;
  date: string;
  createdAt: string;
  goalId?: string;
  goalAmount?: number;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
  type: 'income' | 'expense';
}

export interface Goal {
  id: string;
  name: string;
  type: 'monthly' | 'accumulated';
  targetAmount: number;
  currentAmount: number;
  deadline?: string;
  createdAt: string;
}

export interface FinancialSummary {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  monthlyBalance: number;
}

export interface CategorySummary {
  category: string;
  amount: number;
  color: string;
  percentage: number;
}