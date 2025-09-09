import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, TrendingUp, TrendingDown } from 'lucide-react';
import { Transaction, Category } from '@/types/financial';
import { formatCurrency, formatDate } from '@/lib/formatters';

interface TransactionListProps {
  transactions: Transaction[];
  categories: Category[];
  onRemove: (id: string) => void;
}

export function TransactionList({ transactions, categories, onRemove }: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <Card className="bg-gradient-card border-0 shadow-financial">
        <div className="p-8 text-center">
          <div className="text-muted-foreground">
            <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">Nenhuma transação ainda</p>
            <p className="text-sm">Adicione sua primeira transação para começar</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-card border-0 shadow-financial">
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">Transações Recentes</h3>
        
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {transactions.map((transaction) => {
            const category = categories.find(c => c.name === transaction.category);
            
            return (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-background/50 hover:bg-background/80 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    {transaction.type === 'income' ? (
                      <TrendingUp className="h-4 w-4 text-success" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-danger" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {transaction.description}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {category?.icon} {transaction.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(transaction.date)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`text-sm font-semibold ${
                    transaction.type === 'income' ? 'text-success' : 'text-danger'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                  </span>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemove(transaction.id)}
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-danger"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}