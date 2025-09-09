import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Goal } from '@/types/financial';
import { formatCurrency } from '@/lib/formatters';

interface DepositModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  goal: Goal | null;
  onDeposit: (goalId: string, amount: number) => void;
}

export function DepositModal({ open, onOpenChange, goal, onDeposit }: DepositModalProps) {
  const [amount, setAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!goal || !amount) return;

    const depositAmount = parseFloat(amount);
    if (depositAmount <= 0) return;

    onDeposit(goal.id, depositAmount);
    setAmount('');
    onOpenChange(false);
  };

  if (!goal) return null;

  const progress = goal.targetAmount > 0 
    ? (goal.currentAmount / goal.targetAmount) * 100 
    : 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gradient-card border-0 shadow-financial">
        <DialogHeader>
          <DialogTitle>Depositar na Meta</DialogTitle>
          <DialogDescription>
            Adicione dinheiro à sua caixinha "{goal.name}"
          </DialogDescription>
        </DialogHeader>
        
        <div className="mb-4 p-4 rounded-lg bg-secondary/50">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Progresso atual:</span>
            <span className="text-sm font-medium">{progress.toFixed(1)}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Valor atual:</span>
            <span className="font-semibold">
              {formatCurrency(goal.currentAmount)} / {formatCurrency(goal.targetAmount)}
            </span>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Valor do Depósito (R$)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0.01"
              placeholder="0,00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit">Depositar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}