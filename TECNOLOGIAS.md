# 🛠️ Tecnologias e Linguagens Utilizadas

Este documento detalha todas as tecnologias, linguagens de programação, frameworks e bibliotecas utilizadas no projeto **Bolso Aberto**.

## 📋 Linguagens de Programação

### TypeScript
- **Versão**: Compatível com ECMAScript 2020
- **Uso**: Linguagem principal do projeto
- **Benefícios**: Tipagem estática, melhor autocompletar, detecção de erros em tempo de desenvolvimento

### JavaScript (JSX/TSX)
- **Uso**: Sintaxe de componentes React
- **Arquivos**: `.tsx` para componentes TypeScript + JSX

### CSS
- **Uso**: Estilização através do Tailwind CSS
- **Arquivos**: `index.css` para estilos globais e variáveis CSS

### HTML
- **Uso**: Estrutura base da aplicação
- **Arquivos**: `index.html`

---

## ⚛️ Framework Principal

### React 18.3.1
- **Tipo**: Biblioteca JavaScript para construção de interfaces de usuário
- **Características**:
  - Arquitetura baseada em componentes
  - Virtual DOM para performance otimizada
  - Hooks para gerenciamento de estado
  - Renderização eficiente

---

## 🏗️ Build Tools e Desenvolvimento

### Vite
- **Tipo**: Build tool e servidor de desenvolvimento
- **Características**:
  - Hot Module Replacement (HMR) extremamente rápido
  - Build otimizado para produção
  - Suporte nativo a TypeScript
  - Plugin React SWC para compilação rápida

### SWC
- **Tipo**: Compilador super rápido para JavaScript/TypeScript
- **Uso**: Via `@vitejs/plugin-react-swc`

---

## 🎨 UI Framework e Componentes

### Tailwind CSS 
- **Tipo**: Framework CSS utility-first
- **Características**:
  - Classes utilitárias para estilização rápida
  - Design system customizável
  - Responsividade integrada
  - Tema claro/escuro

### Radix UI
- **Tipo**: Biblioteca de componentes primitivos acessíveis
- **Componentes utilizados**:
  - Accordion
  - Alert Dialog
  - Avatar
  - Checkbox
  - Dialog
  - Dropdown Menu
  - Hover Card
  - Label
  - Menubar
  - Navigation Menu
  - Popover
  - Progress
  - Radio Group
  - Scroll Area
  - Select
  - Separator
  - Slider
  - Switch
  - Tabs
  - Toast
  - Tooltip
  - E muitos outros

### Lucide React ^0.462.0
- **Tipo**: Biblioteca de ícones
- **Características**:
  - Ícones SVG modernos e limpos
  - Totalmente customizáveis
  - Otimizados para performance

---

## 📊 Visualização de Dados

### Recharts ^3.2.0
- **Tipo**: Biblioteca de gráficos para React
- **Uso**: Gráficos de categorias de gastos
- **Características**:
  - Componentes React nativos
  - Responsivo
  - Customizável
  - Animações suaves

---

## 🔄 Gerenciamento de Estado e Dados

### TanStack Query ^5.83.0
- **Tipo**: Biblioteca de gerenciamento de estado assíncrono
- **Anteriormente**: React Query
- **Características**:
  - Cache inteligente
  - Sincronização automática
  - Invalidação de dados
  - Estados de loading e erro

---

## 🧭 Roteamento

### React Router DOM ^6.30.1
- **Tipo**: Biblioteca de roteamento para React
- **Características**:
  - Navegação declarativa
  - Rotas aninhadas
  - Lazy loading de componentes
  - Gestão de histórico do navegador

---

## 📝 Formulários e Validação

### React Hook Form ^7.61.1
- **Tipo**: Biblioteca de gerenciamento de formulários
- **Características**:
  - Performance otimizada
  - Validação integrada
  - Menos re-renderizações
  - API simples e intuitiva

### Zod ^3.25.76
- **Tipo**: Biblioteca de validação de schemas TypeScript-first
- **Uso**: Validação de dados de formulários
- **Integração**: `@hookform/resolvers` para integração com React Hook Form

---

## 🎨 Sistema de Design

### Class Variance Authority (CVA) ^0.7.1
- **Tipo**: Utilitário para criação de variantes de componentes
- **Uso**: Sistema de variantes para componentes UI

### Tailwind Merge ^2.6.0
- **Tipo**: Utilitário para merge de classes Tailwind
- **Uso**: Combinar classes CSS sem conflitos

### CLSX ^2.1.1
- **Tipo**: Utilitário para construção condicional de classes CSS
- **Uso**: Gerenciamento dinâmico de classes

### Tailwindcss Animate ^1.0.7
- **Tipo**: Plugin de animações para Tailwind
- **Uso**: Animações e transições pré-configuradas

---

## 🌓 Temas

### Next Themes ^0.3.0
- **Tipo**: Biblioteca de gerenciamento de temas
- **Características**:
  - Suporte a tema claro/escuro
  - Persistência de preferência do usuário
  - Sem flash de tema incorreto
  - Suporte a tema do sistema

---

## 🗓️ Manipulação de Datas

### Date-fns ^3.6.0
- **Tipo**: Biblioteca moderna de manipulação de datas
- **Características**:
  - Modular e tree-shakeable
  - Funções puras
  - Suporte a internacionalização
  - TypeScript integrado

### React Day Picker ^8.10.1
- **Tipo**: Componente de seleção de data
- **Uso**: Calendários e date pickers

---

## 🎠 Componentes Interativos

### Embla Carousel React ^8.6.0
- **Tipo**: Biblioteca de carrossel
- **Características**:
  - Leve e performático
  - Touch/swipe support
  - Responsivo
  - Altamente customizável

### Vaul ^0.9.9
- **Tipo**: Componente drawer para React
- **Uso**: Drawers e bottom sheets mobile-friendly

### React Resizable Panels ^2.1.9
- **Tipo**: Painéis redimensionáveis
- **Uso**: Layouts flexíveis e ajustáveis

---

## 🔔 Notificações

### Sonner ^1.7.4
- **Tipo**: Biblioteca de toast/notificações
- **Características**:
  - Design moderno
  - Empilhamento inteligente
  - Acessível
  - Customizável

---

## 📱 Mobile/Capacitor

### Capacitor ^7.4.3
- **Tipo**: Framework para criar apps nativos
- **Módulos**:
  - @capacitor/core
  - @capacitor/cli
  - @capacitor/android
  - @capacitor/ios
- **Uso**: Compilação para aplicativos mobile nativos

---

## 🧩 Utilitários Adicionais

### CMDK ^1.1.1
- **Tipo**: Command menu component
- **Uso**: Menus de comando acessíveis

### Input OTP ^1.4.2
- **Tipo**: Componente de input para códigos OTP
- **Uso**: Inputs de código de verificação

### React Is ^19.1.1
- **Tipo**: Utilitários de verificação de tipo React

---

## 🔍 Linting e Qualidade de Código

### ESLint
- **Configuração**: TypeScript ESLint
- **Plugins**:
  - eslint-plugin-react-hooks
  - eslint-plugin-react-refresh
- **Uso**: Análise estática de código e detecção de erros

---

## 📦 Resumo por Categoria

### Linguagens
- TypeScript
- JavaScript (JSX/TSX)
- CSS
- HTML

### Core
- React 18
- TypeScript
- Vite
- SWC

### UI/UX
- Tailwind CSS
- Radix UI (20+ componentes)
- Lucide React (ícones)
- Recharts (gráficos)

### Estado e Dados
- TanStack Query
- React Hook Form
- Zod

### Navegação
- React Router DOM

### Utilitários
- Date-fns
- CVA
- CLSX
- Tailwind Merge

### Mobile
- Capacitor

### Temas
- Next Themes

### Notificações
- Sonner

---

## 🎯 Destaques Tecnológicos

### Performance
- **Vite + SWC**: Build e HMR extremamente rápidos
- **React 18**: Concurrent rendering e automatic batching
- **TanStack Query**: Cache inteligente e otimizações

### Experiência do Desenvolvedor
- **TypeScript**: Autocomplete e type safety
- **ESLint**: Qualidade de código
- **Hot Module Replacement**: Atualizações instantâneas

### Experiência do Usuário
- **Tailwind CSS**: Interface responsiva e moderna
- **Radix UI**: Componentes acessíveis (WCAG)
- **Next Themes**: Tema claro/escuro sem flash
- **Sonner**: Notificações elegantes

### Mobile
- **Capacitor**: Apps nativos iOS e Android
- **Design Responsivo**: Mobile-first approach
- **Touch-friendly**: Componentes otimizados para touch

---

## 📚 Documentação e Recursos

- **React**: https://react.dev/
- **TypeScript**: https://www.typescriptlang.org/
- **Vite**: https://vitejs.dev/
- **Tailwind CSS**: https://tailwindcss.com/
- **Radix UI**: https://www.radix-ui.com/
- **TanStack Query**: https://tanstack.com/query/
- **React Router**: https://reactrouter.com/
- **React Hook Form**: https://react-hook-form.com/
- **Zod**: https://zod.dev/
- **Recharts**: https://recharts.org/
- **Capacitor**: https://capacitorjs.com/

---

**Última atualização**: 2025-10-02
