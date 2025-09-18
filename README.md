# 💰 Controle Financeiro Pessoal

Um aplicativo moderno e intuitivo para controle de finanças pessoais com gamificação, metas financeiras e previsões inteligentes.

## ✨ Funcionalidades

- **Dashboard Financeiro**: Visão geral completa do seu saldo, receitas e despesas
- **Metas Financeiras**: Caixinhas de economia com progresso visual
- **Gamificação**: Sistema de conquistas, medalhas e níveis
- **Previsões Inteligentes**: Cálculo de saldo futuro e recomendações
- **Gráficos Interativos**: Visualização de gastos por categoria
- **Tema Claro/Escuro**: Interface adaptável às suas preferências
- **Design Responsivo**: Funciona perfeitamente em desktop e mobile

## 🚀 Como Instalar

### Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn instalado

### Passo a Passo

1. **Clone ou baixe o projeto**
   ```bash
   git clone [URL_DO_PROJETO]
   cd controle-financeiro
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```
   ou
   ```bash
   yarn install
   ```

3. **Execute o projeto**
   ```bash
   npm run dev
   ```
   ou
   ```bash
   yarn dev
   ```

4. **Acesse no navegador**
   ```
   http://localhost:8080
   ```

## 📦 Dependências Principais

### Frontend Framework
- **React 18** - Interface de usuário
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e servidor de desenvolvimento

### UI Components
- **Tailwind CSS** - Estilização
- **Radix UI** - Componentes acessíveis
- **Lucide React** - Ícones modernos
- **Recharts** - Gráficos interativos

### Funcionalidades
- **React Hook Form** - Gerenciamento de formulários
- **TanStack Query** - Gerenciamento de estado
- **React Router** - Navegação
- **Next Themes** - Suporte a temas
- **Date-fns** - Manipulação de datas

## 🎯 Como Usar

### 1. Adicionando Transações
- Clique no botão flutuante "+" no canto inferior direito
- Preencha o tipo (receita/despesa), valor, descrição e categoria
- A transação será automaticamente refletida no dashboard

### 2. Criando Metas Financeiras
- Na seção "Metas Financeiras", clique em "Nova Meta"
- Defina o nome, valor alvo e prazo
- Acompanhe o progresso através da barra visual

### 3. Sistema de Gamificação
- Conquistas são desbloqueadas automaticamente
- Visualize seu nível e experiência no card superior
- Ganhe XP completando metas e mantendo hábitos saudáveis

### 4. Previsões e Recomendações
- Veja previsões de saldo futuro baseadas no seu histórico
- Receba recomendações inteligentes para economia
- Sugestões personalizadas para acelerar suas metas

### 5. Alternando Temas
- Use o botão de sol/lua no cabeçalho
- Alterna entre tema claro e escuro automaticamente

## 🛠️ Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes base do design system
│   ├── AchievementCard.tsx
│   ├── CategoryChart.tsx
│   ├── FinancialCard.tsx
│   ├── GoalProgress.tsx
│   ├── PredictionCard.tsx
│   └── ...
├── hooks/              # Hooks customizados
│   ├── useFinancialData.ts
│   ├── useGamification.ts
│   └── usePredictions.ts
├── lib/                # Utilitários
├── pages/              # Páginas da aplicação
├── types/              # Definições de tipos TypeScript
└── index.css          # Estilos globais e design system
```

## 🎨 Design System

O projeto utiliza um design system baseado em tokens semânticos:

- **Cores**: Paleta inspirada no Nubank com tons suaves
- **Tipografia**: Fontes legíveis com hierarquia clara
- **Espaçamento**: Grid consistente e responsivo
- **Animações**: Transições suaves e micro-interações

## 📱 Responsividade

- **Mobile First**: Interface otimizada para dispositivos móveis
- **Touch Friendly**: Botões e áreas de toque adequadas
- **Adaptive Layout**: Layout que se adapta a diferentes tamanhos de tela

## 🔧 Scripts Disponíveis

```bash
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Gera build de produção
npm run preview      # Visualiza build de produção
npm run lint         # Executa linting do código
```

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🆘 Suporte

Se você encontrar algum problema ou tiver dúvidas:

1. Verifique se todas as dependências foram instaladas corretamente
2. Certifique-se de estar usando Node.js 18+
3. Limpe o cache: `npm run build` e tente novamente
4. Verifique o console do navegador para erros

---

Desenvolvido com ❤️ usando React + TypeScript + Tailwind CSS
