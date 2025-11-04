import { useState } from 'react';
import { TrendingUp, TrendingDown, Wallet, Target, DollarSign, PiggyBank, Award, TrendingDownIcon } from 'lucide-react';
import { SettingsMenu } from '@/components/SettingsMenu';
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
import { FloatingActionButton } from '@/components/FloatingActionButton';
import { useFinancialData } from '@/hooks/useFinancialData';
import { useGamification } from '@/hooks/useGamification';
import { usePredictions } from '@/hooks/usePredictions';
import { formatCurrency } from '@/lib/formatters';
import { useToast } from '@/hooks/use-toast';
import { Goal } from '@/types/financial';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [showTransactionForm, setShowTransactionForm] = useState(false);

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
      {/* Clean Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <PiggyBank className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-foreground">Bolso Aberto</h1>
                <p className="text-sm text-muted-foreground">Controle inteligente</p>
              </div>
            </div>
            <SettingsMenu />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 pb-20">
        {/* Hero Section - Principais Indicadores */}
        <section className="mb-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            <FinancialCard
              title="Saldo Total"
              value={formatCurrency(summary.balance)}
              change={summary.balance >= 0 ? 'Saldo positivo' : 'Saldo negativo'}
              changeType={summary.balance >= 0 ? 'positive' : 'negative'}
              icon={<Wallet className="h-5 w-5" />}
              gradient={summary.balance >= 0 ? 'success' : 'danger'}
            />
            
            <FinancialCard
              title="Receitas"
              value={formatCurrency(summary.monthlyIncome)}
              change="Este mês"
              changeType="positive"
              icon={<TrendingUp className="h-5 w-5" />}
              gradient="success"
            />
            
            <FinancialCard
              title="Despesas"
              value={formatCurrency(summary.monthlyExpenses)}
              change="Este mês"
              changeType="negative"
              icon={<TrendingDownIcon className="h-5 w-5" />}
              gradient="danger"
            />
            
            <FinancialCard
              title="Balanço"
              value={formatCurrency(summary.monthlyBalance)}
              change={summary.monthlyBalance >= 0 ? 'Sobrou dinheiro' : 'Gastou mais'}
              changeType={summary.monthlyBalance >= 0 ? 'positive' : 'negative'}
              icon={<DollarSign className="h-5 w-5" />}
              gradient={summary.monthlyBalance >= 0 ? 'success' : 'warning'}
            />
          </div>
        </section>

        {/* Metas Financeiras - Seção Própria */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">Metas Financeiras</h2>
          </div>
          <GoalProgress
            goals={goals}
            onAddGoal={handleAddGoal}
            onDepositClick={handleDepositClick}
          />
        </section>

        {/* Previsões e Conquistas */}
        <section className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Conquistas */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Award className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">Conquistas</h2>
              </div>
              <UserLevel userStats={userStats} />
              <div className="space-y-3">
                {getRecentAchievements().slice(0, 3).map(achievement => (
                  <AchievementCard key={achievement.id} achievement={achievement} />
                ))}
                {getRecentAchievements().length === 0 && (
                  <div className="text-center text-muted-foreground text-sm py-8 bg-muted/20 rounded-lg">
                    <Target className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>Complete suas primeiras metas para desbloquear conquistas!</p>
                  </div>
                )}
              </div>
            </div>

            {/* Previsões */}
            {predictions.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">Previsões Inteligentes</h2>
                <div className="space-y-3">
                  {predictions.slice(0, 3).map((prediction, index) => (
                    <PredictionCard key={index} prediction={prediction} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Dados e Análises */}
        <section>
          <Tabs defaultValue="chart" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="chart">Análise por Categoria</TabsTrigger>
              <TabsTrigger value="transactions">Transações Recentes</TabsTrigger>
            </TabsList>
            
            <TabsContent value="chart" className="mt-0">
              <CategoryChart data={categorySummaries} />
            </TabsContent>
            
            <TabsContent value="transactions" className="mt-0">
              <TransactionList
                transactions={transactions.slice(0, 15)}
                categories={categories}
                onRemove={handleRemoveTransaction}
              />
            </TabsContent>
          </Tabs>
        </section>
      </main>

      {/* Floating Action Button */}
      <FloatingActionButton onClick={() => setShowTransactionForm(true)} />

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

      {/* Transaction Form Modal */}
      {showTransactionForm && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="fixed left-4 right-4 top-1/2 -translate-y-1/2 md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-[500px]">
            <div className="bg-card border rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Nova Transação</h3>
                <button 
                  onClick={() => setShowTransactionForm(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  ✕
                </button>
              </div>
              <TransactionForm
                categories={categories}
                goals={goals}
                onSubmit={(data) => {
                  handleAddTransaction(data);
                  setShowTransactionForm(false);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;