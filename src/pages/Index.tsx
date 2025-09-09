import { useState } from 'react';
import { TrendingUp, TrendingDown, Wallet, Target, DollarSign, PiggyBank } from 'lucide-react';
import { FinancialCard } from '@/components/FinancialCard';
import { TransactionForm } from '@/components/TransactionForm';
import { TransactionList } from '@/components/TransactionList';
import { CategoryChart } from '@/components/CategoryChart';
import { GoalProgress } from '@/components/GoalProgress';
import { GoalModal } from '@/components/GoalModal';
import { DepositModal } from '@/components/DepositModal';
import { useFinancialData } from '@/hooks/useFinancialData';
import { formatCurrency } from '@/lib/formatters';
import { useToast } from '@/hooks/use-toast';
import { Goal } from '@/types/financial';

const Index = () => {
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);

  const {
    transactions,
    categories,
    goals,
    addTransaction,
    removeTransaction,
    addGoal,
    depositToGoal,
    getFinancialSummary,
    getCategorySummaries,
  } = useFinancialData();

  const { toast } = useToast();
  const summary = getFinancialSummary();
  const categorySummaries = getCategorySummaries();

  const handleAddTransaction = (transactionData: any) => {
    addTransaction(transactionData);
    
    let toastMessage = `${transactionData.type === 'income' ? 'Receita' : 'Despesa'} de ${formatCurrency(transactionData.amount)} registrada.`;
    
    if (transactionData.goalId && transactionData.goalAmount) {
      const goal = goals.find(g => g.id === transactionData.goalId);
      toastMessage += ` ${formatCurrency(transactionData.goalAmount)} adicionado à meta "${goal?.name}".`;
    }
    
    toast({
      title: 'Transação adicionada',
      description: toastMessage,
    });
  };

  const handleRemoveTransaction = (id: string) => {
    removeTransaction(id);
    toast({
      title: 'Transação removida',
      description: 'A transação foi excluída com sucesso.',
      variant: 'destructive',
    });
  };

  const handleAddGoal = () => {
    setIsGoalModalOpen(true);
  };

  const handleCreateGoal = (goalData: Omit<Goal, 'id' | 'createdAt' | 'currentAmount'>) => {
    addGoal(goalData);
    toast({
      title: 'Meta criada',
      description: `Caixinha "${goalData.name}" foi criada com sucesso!`,
    });
  };

  const handleDepositClick = (goal: Goal) => {
    setSelectedGoal(goal);
    setIsDepositModalOpen(true);
  };

  const handleDeposit = (goalId: string, amount: number) => {
    depositToGoal(goalId, amount);
    const goal = goals.find(g => g.id === goalId);
    toast({
      title: 'Depósito realizado',
      description: `${formatCurrency(amount)} adicionado à meta "${goal?.name}".`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-gradient-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary text-white">
              <PiggyBank className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Controlador Financeiro</h1>
              <p className="text-sm text-muted-foreground">Gerencie suas finanças de forma inteligente</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Financial Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <FinancialCard
            title="Saldo Total"
            value={formatCurrency(summary.balance)}
            change={`${summary.balance >= 0 ? '+' : ''}${formatCurrency(summary.balance)}`}
            changeType={summary.balance >= 0 ? 'positive' : 'negative'}
            icon={<Wallet className="h-6 w-6" />}
            gradient={summary.balance >= 0 ? 'success' : 'danger'}
          />
          
          <FinancialCard
            title="Receitas do Mês"
            value={formatCurrency(summary.monthlyIncome)}
            change={`Total: ${formatCurrency(summary.totalIncome)}`}
            changeType="positive"
            icon={<TrendingUp className="h-6 w-6" />}
            gradient="success"
          />
          
          <FinancialCard
            title="Despesas do Mês"
            value={formatCurrency(summary.monthlyExpenses)}
            change={`Total: ${formatCurrency(summary.totalExpenses)}`}
            changeType="negative"
            icon={<TrendingDown className="h-6 w-6" />}
            gradient="danger"
          />
          
          <FinancialCard
            title="Balanço Mensal"
            value={formatCurrency(summary.monthlyBalance)}
            change={`${summary.monthlyBalance >= 0 ? '+' : ''}${formatCurrency(summary.monthlyBalance)}`}
            changeType={summary.monthlyBalance >= 0 ? 'positive' : 'negative'}
            icon={<DollarSign className="h-6 w-6" />}
            gradient={summary.monthlyBalance >= 0 ? 'success' : 'warning'}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-6">
            <TransactionForm
              categories={categories}
              goals={goals}
              onSubmit={handleAddTransaction}
            />
            
            <GoalProgress
              goals={goals}
              onAddGoal={handleAddGoal}
              onDepositClick={handleDepositClick}
            />
          </div>

          {/* Middle Column */}
          <div className="lg:col-span-1 space-y-6">
            <CategoryChart data={categorySummaries} />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1 space-y-6">
            <TransactionList
              transactions={transactions.slice(0, 10)} // Show last 10 transactions
              categories={categories}
              onRemove={handleRemoveTransaction}
            />
          </div>
        </div>
      </main>

      <GoalModal
        open={isGoalModalOpen}
        onOpenChange={setIsGoalModalOpen}
        onSubmit={handleCreateGoal}
      />

      <DepositModal
        open={isDepositModalOpen}
        onOpenChange={setIsDepositModalOpen}
        goal={selectedGoal}
        onDeposit={handleDeposit}
      />
    </div>
  );
};

export default Index;