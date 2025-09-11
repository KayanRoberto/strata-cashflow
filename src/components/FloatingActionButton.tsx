import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FloatingActionButtonProps {
  onClick: () => void;
  className?: string;
}

export const FloatingActionButton = ({ onClick, className }: FloatingActionButtonProps) => {
  return (
    <Button
      onClick={onClick}
      size="lg"
      className={cn(
        "fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg hover:shadow-xl",
        "bg-primary hover:bg-primary/90 text-primary-foreground",
        "transition-all duration-300 hover:scale-105",
        "border-0 focus:ring-2 focus:ring-primary/20",
        className
      )}
    >
      <Plus className="h-6 w-6" />
      <span className="sr-only">Nova Transação</span>
    </Button>
  );
};