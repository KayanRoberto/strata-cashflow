import { useState } from 'react';
import { TrendingUp, TrendingDown, Wallet, Target, DollarSign, PiggyBank } from 'lucide-react';
import { FinancialCard } from '@/components/FinancialCard';
import { TransactionForm } from '@/components/TransactionForm';
import { TransactionList } from '@/components/TransactionList';
import { CategoryChart } from '@/components/CategoryChart';
import { GoalProgress } from '@/components/GoalProgress';
import { GoalModal } from '@/components/GoalModal';
import { DepositModal } from '@/components/DepositModal';
import { UserLevel } from '@/components/UserLevel';
import { AchievementCard } from '@/components/AchievementCard';
import { PredictionCard } from '@/components/PredictionCard';
import { useFinancialData } from '@/hooks/useFinancialData';
import { useGamification } from '@/hooks/useGamification';
import { usePredictions } from '@/hooks/usePredictions';
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
    removeFromGoal,
    getFinancialSummary,
    getCategorySummaries,
  } = useFinancialData();

  const { toast } = useToast();
  const summary = getFinancialSummary();
  const categorySummaries = getCategorySummaries();
  
  // Gamification and predictions
  const { achievements, userStats, checkAchievements, getRecentAchievements } = useGamification(transactions, goals);
  const { predictions } = usePredictions(transactions, goals);

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
    
    // Check for new achievements
    const newAchievements = checkAchievements();
    newAchievements.forEach(achievement => {
      toast({
        title: '🏆 Conquista Desbloqueada!',
        description: `${achievement.icon} ${achievement.title}: ${achievement.description}`,
        duration: 5000,
      });
    });
    
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
    
    // Check for new achievements
    const newAchievements = checkAchievements();
    newAchievements.forEach(achievement => {
      toast({
        title: '🏆 Conquista Desbloqueada!',
        description: `${achievement.icon} ${achievement.title}: ${achievement.description}`,
        duration: 5000,
      });
    });
    
    toast({
      title: 'Depósito realizado',
      description: `${formatCurrency(amount)} adicionado à meta "${goal?.name}".`,
    });
  };

  const handleWithdraw = (goalId: string, amount: number) => {
    removeFromGoal(goalId, amount);
    const goal = goals.find(g => g.id === goalId);
    toast({
      title: 'Retirada realizada',
      description: `${formatCurrency(amount)} removido da meta "${goal?.name}".`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header - Mobile Optimized */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-gradient-card backdrop-blur-sm">
        <div className="container mx-auto mobile-padding py-4 md:py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl bg-gradient-primary text-white touch-target">
              <PiggyBank className="h-5 w-5 md:h-6 md:w-6" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-foreground">Controlador Financeiro</h1>
              <p className="text-xs md:text-sm text-muted-foreground">Gerencie suas finanças de forma inteligente</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto mobile-padding py-6 md:py-8 pb-safe">
        {/* Financial Summary Cards - Mobile Optimized */}
        <div className="grid grid-cols-2 lg:grid-cols-4 mobile-gap gap-4 md:gap-6 mb-6 md:mb-8">
          <FinancialCard
            title="Saldo Total"
            value={formatCurrency(summary.balance)}
            change={`${summary.balance >= 0 ? '+' : ''}${formatCurrency(summary.balance)}`}
            changeType={summary.balance >= 0 ? 'positive' : 'negative'}
            icon={<Wallet className="h-5 w-5 md:h-6 md:w-6" />}
            gradient={summary.balance >= 0 ? 'success' : 'danger'}
          />
          
          <FinancialCard
            title="Receitas do Mês"
            value={formatCurrency(summary.monthlyIncome)}
            change={`Total: ${formatCurrency(summary.totalIncome)}`}
            changeType="positive"
            icon={<TrendingUp className="h-5 w-5 md:h-6 md:w-6" />}
            gradient="success"
          />
          
          <FinancialCard
            title="Despesas do Mês"
            value={formatCurrency(summary.monthlyExpenses)}
            change={`Total: ${formatCurrency(summary.totalExpenses)}`}
            changeType="negative"
            icon={<TrendingDown className="h-5 w-5 md:h-6 md:w-6" />}
            gradient="danger"
          />
          
          <FinancialCard
            title="Balanço Mensal"
            value={formatCurrency(summary.monthlyBalance)}
            change={`${summary.monthlyBalance >= 0 ? '+' : ''}${formatCurrency(summary.monthlyBalance)}`}
            changeType={summary.monthlyBalance >= 0 ? 'positive' : 'negative'}
            icon={<DollarSign className="h-5 w-5 md:h-6 md:w-6" />}
            gradient={summary.monthlyBalance >= 0 ? 'success' : 'warning'}
          />
        </div>

        {/* User Level and Achievements */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
          <div className="lg:col-span-2">
            <UserLevel userStats={userStats} />
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Conquistas Recentes</h3>
            {getRecentAchievements().slice(0, 3).map(achievement => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
            {getRecentAchievements().length === 0 && (
              <div className="text-center text-muted-foreground text-sm py-4">
                <Target className="h-8 w-8 mx-auto mb-2 opacity-50" />
                Complete suas primeiras metas para desbloquear conquistas!
              </div>
            )}
          </div>
        </div>

        {/* Predictions */}
        {predictions.length > 0 && (
          <div className="mb-6 md:mb-8">
            <h3 className="text-lg font-semibold mb-4">Previsões Inteligentes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {predictions.slice(0, 6).map((prediction, index) => (
                <PredictionCard key={index} prediction={prediction} />
              ))}
            </div>
          </div>
        )}

        {/* Main Content - Mobile Stack Layout */}
        <div className="space-y-6 md:space-y-8">
          {/* Mobile: Stack all components vertically */}
          <div className="lg:hidden space-y-6">
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
            
            <CategoryChart data={categorySummaries} />
            
            <TransactionList
              transactions={transactions.slice(0, 10)}
              categories={categories}
              onRemove={handleRemoveTransaction}
            />
          </div>

          {/* Desktop: Original 3-column layout */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-8">
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
                transactions={transactions.slice(0, 10)}
                categories={categories}
                onRemove={handleRemoveTransaction}
              />
            </div>
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
        onWithdraw={handleWithdraw}
      />
    </div>
  );
};

export default Index;