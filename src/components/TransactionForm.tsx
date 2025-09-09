import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { PlusCircle, MinusCircle } from 'lucide-react';
import { Category, Goal } from '@/types/financial';

interface TransactionFormProps {
  categories: Category[];
  goals: Goal[];
  onSubmit: (transaction: any) => void;
}

export function TransactionForm({ categories, goals, onSubmit }: TransactionFormProps) {
  const [formData, setFormData] = useState({
    type: 'expense' as 'income' | 'expense',
    amount: '',
    description: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    addToGoal: false,
    goalId: '',
    goalAmount: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.type || !formData.amount || !formData.description || !formData.category) return;

    const transactionData = {
      type: formData.type,
      amount: parseFloat(formData.amount),
      description: formData.description,
      category: formData.category,
      date: formData.date,
      ...(formData.addToGoal && formData.goalId && formData.goalAmount && {
        goalId: formData.goalId,
        goalAmount: parseFloat(formData.goalAmount),
      }),
    };

    onSubmit(transactionData);

    setFormData({
      type: 'expense',
      amount: '',
      description: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
      addToGoal: false,
      goalId: '',
      goalAmount: '',
    });
  };

  const filteredCategories = categories.filter(cat => cat.type === formData.type);
  const availableGoals = goals.filter(goal => goal.targetAmount > goal.currentAmount);

  return (
    <Card className="bg-gradient-card border-0 shadow-financial">
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">Nova Transação</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant={formData.type === 'expense' ? 'default' : 'outline'}
              onClick={() => setFormData({ ...formData, type: 'expense', addToGoal: false, goalId: '', goalAmount: '' })}
              className="h-12 text-sm font-medium"
            >
              <MinusCircle className="mr-2 h-4 w-4" />
              Despesa
            </Button>
            <Button
              type="button"
              variant={formData.type === 'income' ? 'default' : 'outline'}
              onClick={() => setFormData({ ...formData, type: 'income' })}
              className="h-12 text-sm font-medium"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Receita
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Valor (R$)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              placeholder="0,00"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Descreva a transação..."
              required
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Categoria</Label>
            <Select 
              value={formData.category} 
              onValueChange={(value) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {filteredCategories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.name}>
                    <div className="flex items-center gap-2">
                      <span>{cat.icon}</span>
                      <span>{cat.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Data</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>

          {/* Goal allocation for income */}
          {formData.type === 'income' && availableGoals.length > 0 && (
            <div className="space-y-4 p-4 bg-secondary/20 rounded-lg border border-dashed border-secondary">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="addToGoal"
                  checked={formData.addToGoal}
                  onCheckedChange={(checked) => 
                    setFormData({ 
                      ...formData, 
                      addToGoal: checked as boolean,
                      goalId: '',
                      goalAmount: '',
                    })
                  }
                />
                <Label htmlFor="addToGoal" className="text-sm font-medium">
                  Adicionar à meta financeira
                </Label>
              </div>

              {formData.addToGoal && (
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="goal">Meta de destino</Label>
                    <Select
                      value={formData.goalId}
                      onValueChange={(value) => setFormData({ ...formData, goalId: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma meta" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableGoals.map((goal) => (
                          <SelectItem key={goal.id} value={goal.id}>
                            {goal.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="goalAmount">Valor para a meta (R$)</Label>
                    <Input
                      id="goalAmount"
                      type="number"
                      step="0.01"
                      min="0"
                      max={formData.amount}
                      placeholder="0,00"
                      value={formData.goalAmount}
                      onChange={(e) => setFormData({ ...formData, goalAmount: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground">
                      Máximo: R$ {formData.amount || '0,00'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          <Button
            type="submit"
            className="w-full h-12 text-sm font-medium bg-gradient-primary hover:opacity-90 transition-opacity"
            disabled={!formData.amount || !formData.description || !formData.category}
          >
            Adicionar Transação
          </Button>
        </form>
      </div>
    </Card>
  );
}