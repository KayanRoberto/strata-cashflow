import { useState } from 'react';
import { TrendingUp, TrendingDown, Wallet, Target, DollarSign, PiggyBank } from 'lucide-react';
import { FinancialCard } from '@/components/FinancialCard';
import { TransactionForm } from '@/components/TransactionForm';
import { TransactionList } from '@/components/TransactionList';
import { CategoryChart } from '@/components/CategoryChart';
import { GoalProgress } from '@/components/GoalProgress';
import { useFinancialData } from '@/hooks/useFinancialData';
import { formatCurrency } from '@/lib/formatters';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const {
    transactions,
    categories,
    goals,
    addTransaction,
    removeTransaction,
    addGoal,
    getFinancialSummary,
    getCategorySummaries,
  } = useFinancialData();

  const { toast } = useToast();
  const summary = getFinancialSummary();
  const categorySummaries = getCategorySummaries();

  const handleAddTransaction = (transactionData: any) => {
    addTransaction(transactionData);
    toast({
      title: 'Transação adicionada',
      description: `${transactionData.type === 'income' ? 'Receita' : 'Despesa'} de ${formatCurrency(transactionData.amount)} registrada.`,
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
    // TODO: Implement goal creation modal
    toast({
      title: 'Em breve',
      description: 'Funcionalidade de metas será implementada em breve.',
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
              onSubmit={handleAddTransaction}
            />
            
            <GoalProgress
              goals={goals}
              onAddGoal={handleAddGoal}
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
    </div>
  );
};

export default Index;