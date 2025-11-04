import { Settings, Moon, Sun, RotateCcw, Download, Info, AlertCircle } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function SettingsMenu() {
  const { theme, setTheme } = useTheme();
  const [showResetDialog, setShowResetDialog] = useState(false);
  const { toast } = useToast();

  const handleResetApp = () => {
    // Limpar todo o localStorage
    localStorage.clear();
    
    toast({
      title: "App resetado",
      description: "Todos os dados foram removidos. A página será recarregada.",
    });
    
    // Recarregar a página após 1 segundo
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleExportData = () => {
    try {
      // Coletar todos os dados do localStorage
      const data = {
        transactions: localStorage.getItem('transactions'),
        goals: localStorage.getItem('goals'),
        achievements: localStorage.getItem('achievements'),
        userStats: localStorage.getItem('userStats'),
        exportDate: new Date().toISOString(),
      };

      // Criar arquivo JSON
      const dataStr = JSON.stringify(data, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      
      // Criar link de download
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `bolso-aberto-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: "Dados exportados",
        description: "Backup salvo com sucesso!",
      });
    } catch (error) {
      toast({
        title: "Erro ao exportar",
        description: "Não foi possível exportar os dados.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="h-9 w-9">
            <Settings className="h-4 w-4" />
            <span className="sr-only">Configurações</span>
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent align="end" className="w-56 bg-popover">
          <DropdownMenuLabel>Configurações</DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <DropdownMenuItem
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="cursor-pointer"
          >
            {theme === "light" ? (
              <>
                <Moon className="mr-2 h-4 w-4" />
                <span>Modo Escuro</span>
              </>
            ) : (
              <>
                <Sun className="mr-2 h-4 w-4" />
                <span>Modo Claro</span>
              </>
            )}
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={handleExportData}
            className="cursor-pointer"
          >
            <Download className="mr-2 h-4 w-4" />
            <span>Exportar Dados</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => setShowResetDialog(true)}
            className="cursor-pointer text-destructive focus:text-destructive"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            <span>Resetar App</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem className="cursor-default focus:bg-transparent">
            <Info className="mr-2 h-4 w-4" />
            <span className="text-xs text-muted-foreground">Versão 1.0.0</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              Resetar Aplicativo?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação irá remover todos os dados do aplicativo, incluindo:
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Todas as transações</li>
                <li>Metas financeiras</li>
                <li>Conquistas e progresso</li>
                <li>Configurações personalizadas</li>
              </ul>
              <strong className="block mt-3 text-destructive">Esta ação não pode ser desfeita!</strong>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleResetApp}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Resetar Tudo
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
