# 🚀 Guia Rápido - Bolso Aberto

> **Projeto Acadêmico** - Guia criado pela equipe para facilitar a execução e testes do aplicativo

## ⚡ Configuração em 3 Passos

### 1️⃣ **Preparar Ambiente**
```bash
# Verificar se Node.js está instalado
node --version
# (Deve mostrar versão 18+)

# Se não tiver Node.js, baixe em: https://nodejs.org/
```

### 2️⃣ **Instalar Dependências**
```bash
# Abrir terminal na pasta do projeto
cd controle-financeiro

# Instalar dependências
npm install
```

### 3️⃣ **Executar Aplicação**
```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Abrir no navegador: http://localhost:8080
```

## 🎯 Primeiro Uso

### ✅ **Checklist Inicial**
- [ ] Aplicação rodando em http://localhost:8080
- [ ] Interface carregando sem erros
- [ ] Botão de tema (sol/lua) funcionando
- [ ] Botão "+" flutuante visível

### 📊 **Testando Funcionalidades**

1. **Adicionar primeira transação:**
   - Clique no botão "+" (canto inferior direito)
   - Escolha "Receita" e adicione R$ 3000 (Salário)
   - Confirme e veja o saldo atualizar

2. **Criar primeira meta:**
   - Na seção "Metas Financeiras"
   - Clique "Nova Meta"
   - Nome: "Viagem" | Valor: R$ 2000
   - Veja a barra de progresso aparecer

3. **Verificar gamificação:**
   - Observe o card "Nível do Usuário"
   - Complete a primeira meta para ganhar XP
   - Veja conquistas desbloqueadas

## 🛠️ Solução de Problemas

### ❌ **Erro: "npm não encontrado"**
```bash
# Instalar Node.js em: https://nodejs.org/
# Reiniciar terminal após instalação
```

### ❌ **Erro: "Porta 8080 em uso"**
```bash
# Usar porta diferente
npm run dev -- --port 3000
```

### ❌ **Aplicação não carrega**
```bash
# Limpar cache e reinstalar
rm -rf node_modules
npm install
npm run dev
```

### ❌ **Tela branca no navegador**
```bash
# Verificar console do navegador (F12)
# Verificar se há erros no terminal
```

## 🎨 Personalizações Rápidas

### 🎨 **Cores do Tema**
Edite `src/index.css` na seção `:root` para personalizar cores:
```css
:root {
  --primary: 260 15% 60%;     /* Cor principal */
  --secondary: 320 15% 88%;   /* Cor secundária */
}
```

### 📱 **Configurações Mobile**
O app já é responsivo, mas para PWA edite `public/manifest.json`

## 📋 **Comandos Úteis**

```bash
# Desenvolvimento
npm run dev              # Servidor desenvolvimento

# Produção
npm run build           # Gerar build
npm run preview         # Testar build

# Manutenção
npm run lint            # Verificar código
```

## 🔍 **Estrutura Rápida**

```
📁 src/
  📁 components/     ← Componentes visuais
  📁 hooks/         ← Lógica de negócio
  📁 pages/         ← Páginas (Index.tsx = principal)
  📁 types/         ← Tipos TypeScript
  📄 index.css      ← Estilos e cores
```

## 💡 **Dicas Importantes**

✅ **Sempre usar `npm run dev` para desenvolvimento**
✅ **Não editar arquivos em `node_modules/`**
✅ **Salvar arquivos automaticamente recarrega a página**
✅ **Use F12 para ver console e debugar erros**
✅ **Ctrl+C no terminal para parar o servidor**

---

## 🎓 **Informações Acadêmicas**

Este guia foi elaborado pela equipe de desenvolvimento como parte da documentação do projeto acadêmico.

### 📞 **Contato da Equipe**
Para dúvidas sobre o projeto, consulte:
- README.md completo
- TECNOLOGIAS.md para detalhes técnicos
- BUILD.md para geração de executáveis

---

🎉 **Pronto! Seu app financeiro está funcionando!**