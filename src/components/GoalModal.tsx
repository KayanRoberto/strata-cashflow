import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Goal } from '@/types/financial';

interface GoalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (goal: Omit<Goal, 'id' | 'createdAt' | 'currentAmount'>) => void;
}

export function GoalModal({ open, onOpenChange, onSubmit }: GoalModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    type: 'accumulated' as 'monthly' | 'accumulated',
    targetAmount: '',
    deadline: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.targetAmount) return;

    onSubmit({
      name: formData.name,
      type: formData.type,
      targetAmount: parseFloat(formData.targetAmount),
      deadline: formData.deadline || undefined,
    });

    setFormData({
      name: '',
      type: 'accumulated',
      targetAmount: '',
      deadline: '',
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gradient-card border-0 shadow-financial">
        <DialogHeader>
          <DialogTitle>Nova Meta Financeira</DialogTitle>
          <DialogDescription>
            Crie uma nova caixinha para sua meta financeira
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome da Meta</Label>
            <Input
              id="name"
              placeholder="Ex: Viagem, Notebook, Reserva de Emergência"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Tipo da Meta</Label>
            <Select
              value={formData.type}
              onValueChange={(value: 'monthly' | 'accumulated') => 
                setFormData({ ...formData, type: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="accumulated">Meta Acumulada</SelectItem>
                <SelectItem value="monthly">Meta Mensal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetAmount">Valor da Meta (R$)</Label>
            <Input
              id="targetAmount"
              type="number"
              step="0.01"
              min="0"
              placeholder="0,00"
              value={formData.targetAmount}
              onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="deadline">Prazo (opcional)</Label>
            <Input
              id="deadline"
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
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
            <Button type="submit">Criar Meta</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}