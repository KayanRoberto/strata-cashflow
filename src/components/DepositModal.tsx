import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Goal } from '@/types/financial';
import { formatCurrency } from '@/lib/formatters';

interface DepositModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  goal: Goal | null;
  onDeposit: (goalId: string, amount: number) => void;
  onWithdraw: (goalId: string, amount: number) => void;
}

export function DepositModal({ open, onOpenChange, goal, onDeposit, onWithdraw }: DepositModalProps) {
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!goal || !depositAmount) return;

    const amount = parseFloat(depositAmount);
    if (amount <= 0) return;

    onDeposit(goal.id, amount);
    setDepositAmount('');
    onOpenChange(false);
  };

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!goal || !withdrawAmount) return;

    const amount = parseFloat(withdrawAmount);
    if (amount <= 0 || amount > goal.currentAmount) return;

    onWithdraw(goal.id, amount);
    setWithdrawAmount('');
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
          <DialogTitle>Gerenciar Meta</DialogTitle>
          <DialogDescription>
            Adicione ou remova dinheiro da sua caixinha "{goal.name}"
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
        
        <Tabs defaultValue="deposit" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="deposit">Adicionar</TabsTrigger>
            <TabsTrigger value="withdraw">Remover</TabsTrigger>
          </TabsList>
          
          <TabsContent value="deposit" className="space-y-4">
            <form onSubmit={handleDeposit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="depositAmount">Valor do Depósito (R$)</Label>
                <Input
                  id="depositAmount"
                  type="number"
                  step="0.01"
                  min="0.01"
                  placeholder="0,00"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  required
                />
              </div>

              <div className="flex gap-2 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit">Depositar</Button>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="withdraw" className="space-y-4">
            <form onSubmit={handleWithdraw} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="withdrawAmount">Valor da Retirada (R$)</Label>
                <Input
                  id="withdrawAmount"
                  type="number"
                  step="0.01"
                  min="0.01"
                  max={goal.currentAmount}
                  placeholder="0,00"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Máximo disponível: {formatCurrency(goal.currentAmount)}
                </p>
              </div>

              <div className="flex gap-2 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                >
                  Cancelar
                </Button>
                <Button 
                  type="submit" 
                  variant="destructive"
                  disabled={goal.currentAmount === 0}
                >
                  Retirar
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}