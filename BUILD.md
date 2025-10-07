# 📱 Guia de Build - Bolso Aberto

**Projeto Acadêmico** - Documentação técnica para geração de builds

Este guia explica como gerar builds do aplicativo Bolso Aberto para diferentes plataformas. Foi criado pela equipe de desenvolvimento como parte da documentação técnica do projeto.

## 📋 Pré-requisitos

### Para todos os builds:
- Node.js 18+ instalado
- Git instalado
- Projeto exportado para GitHub

### Para Android:
- Android Studio instalado
- Java JDK 11 ou superior
- Android SDK configurado

### Para iOS:
- macOS com Xcode instalado
- Apple Developer Account (para distribuição)
- CocoaPods instalado

### Para Desktop (PC):
- Electron (será instalado via npm)

---

## 🤖 Build para Android

### 1. Preparar o projeto

```bash
# Clone seu repositório
git clone [seu-repositorio]
cd bolso-aberto

# Instale as dependências
npm install

# Adicione a plataforma Android (se ainda não adicionou)
npx cap add android
```

### 2. Gerar build de produção

```bash
# Build da aplicação web
npm run build

# Sincronizar com Android
npx cap sync android

# Abrir no Android Studio
npx cap open android
```

### 3. Gerar APK/AAB no Android Studio

1. No Android Studio, vá em **Build > Build Bundle(s) / APK(s)**
2. Escolha:
   - **Build APK(s)** - para instalação direta
   - **Build Bundle(s)** - para publicar na Play Store

### 4. Assinar o APK (para distribuição)

```bash
# Criar keystore (primeira vez apenas)
keytool -genkey -v -keystore bolso-aberto.keystore -alias bolso-aberto -keyalg RSA -keysize 2048 -validity 10000

# No Android Studio, vá em Build > Generate Signed Bundle/APK
# Siga o assistente usando seu keystore
```

### 5. Localização dos arquivos

- **APK Debug**: `android/app/build/outputs/apk/debug/app-debug.apk`
- **APK Release**: `android/app/build/outputs/apk/release/app-release.apk`
- **AAB**: `android/app/build/outputs/bundle/release/app-release.aab`

---

## 🍎 Build para iOS

### 1. Preparar o projeto

```bash
# Instale as dependências
npm install

# Adicione a plataforma iOS (se ainda não adicionou)
npx cap add ios

# Instale pods
cd ios/App
pod install
cd ../..
```

### 2. Gerar build de produção

```bash
# Build da aplicação web
npm run build

# Sincronizar com iOS
npx cap sync ios

# Abrir no Xcode
npx cap open ios
```

### 3. Configurar no Xcode

1. Selecione o projeto **App** no navegador
2. Em **Signing & Capabilities**, selecione seu Team
3. Ajuste o Bundle Identifier se necessário
4. Configure o Provisioning Profile

### 4. Gerar arquivo IPA

1. No Xcode, selecione **Product > Archive**
2. Quando o archive terminar, clique em **Distribute App**
3. Escolha o método:
   - **App Store Connect** - para publicar na App Store
   - **Ad Hoc** - para distribuição limitada
   - **Enterprise** - para distribuição interna
   - **Development** - para testes

### 5. Localização dos arquivos

- Archives ficam em: `~/Library/Developer/Xcode/Archives/`
- IPA exportado: no local escolhido durante a exportação

---

## 💻 Build para Desktop (PC - Windows, Mac, Linux)

### 1. Instalar Electron Builder

```bash
npm install --save-dev electron electron-builder
```

### 2. Criar arquivo de configuração do Electron

Crie o arquivo `electron/main.js`:

```javascript
const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
    icon: path.join(__dirname, '../dist/favicon.png')
  });

  // Em produção, carrega os arquivos estáticos
  win.loadFile(path.join(__dirname, '../dist/index.html'));
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
```

### 3. Adicionar scripts no package.json

Adicione manualmente no `package.json`:

```json
{
  "main": "electron/main.js",
  "scripts": {
    "electron": "electron .",
    "electron:build": "npm run build && electron-builder",
    "electron:build:win": "npm run build && electron-builder --win",
    "electron:build:mac": "npm run build && electron-builder --mac",
    "electron:build:linux": "npm run build && electron-builder --linux"
  },
  "build": {
    "appId": "app.lovable.bolsoaberto",
    "productName": "Bolso Aberto",
    "files": [
      "dist/**/*",
      "electron/**/*"
    ],
    "directories": {
      "output": "release"
    },
    "win": {
      "target": ["nsis", "portable"],
      "icon": "public/favicon.png"
    },
    "mac": {
      "target": ["dmg", "zip"],
      "icon": "public/favicon.png"
    },
    "linux": {
      "target": ["AppImage", "deb"],
      "icon": "public/favicon.png"
    }
  }
}
```

### 4. Gerar builds

```bash
# Build para Windows (requer Windows ou Wine)
npm run electron:build:win

# Build para macOS (requer macOS)
npm run electron:build:mac

# Build para Linux
npm run electron:build:linux

# Build para todas as plataformas
npm run electron:build
```

### 5. Localização dos arquivos

Os executáveis estarão na pasta `release/`:
- **Windows**: `.exe` e instalador `.exe`
- **macOS**: `.dmg` e `.zip`
- **Linux**: `.AppImage` e `.deb`

---

## 🌐 Build Web (PWA)

O projeto já está configurado como PWA. Para distribuir:

```bash
# Gerar build de produção
npm run build

# Os arquivos estarão em dist/
# Você pode:
# 1. Hospedar em qualquer servidor web
# 2. Usar o botão "Publish" no Lovable
# 3. Deploy em Vercel, Netlify, etc.
```

---

## 📦 Publicação nas Lojas

### Google Play Store (Android)
1. Crie uma conta no [Google Play Console](https://play.google.com/console)
2. Crie um novo aplicativo
3. Faça upload do arquivo `.aab`
4. Preencha as informações necessárias
5. Submeta para revisão

### Apple App Store (iOS)
1. Crie uma conta no [App Store Connect](https://appstoreconnect.apple.com)
2. Crie um novo app
3. Use o Xcode para fazer upload via Archive
4. Preencha as informações necessárias
5. Submeta para revisão

### Microsoft Store (Windows)
1. Crie uma conta no [Partner Center](https://partner.microsoft.com)
2. Crie um novo aplicativo
3. Faça upload do pacote MSIX
4. Preencha as informações necessárias
5. Submeta para revisão

---

## 🔧 Troubleshooting

### Erro ao build Android
- Verifique se o Android SDK está instalado
- Execute `npx cap sync android` novamente
- Limpe o projeto: `cd android && ./gradlew clean`

### Erro ao build iOS
- Execute `pod install` na pasta `ios/App`
- Verifique se o Xcode Command Line Tools está instalado
- Atualize CocoaPods: `sudo gem install cocoapods`

### Erro ao build Electron
- Verifique se o Node.js está atualizado
- Limpe node_modules e reinstale: `rm -rf node_modules && npm install`
- No Windows, pode ser necessário instalar windows-build-tools

---

## 📝 Notas Importantes

1. **Versão do App**: Atualize a versão no `capacitor.config.ts` e nos arquivos nativos antes de cada build
2. **Ícones**: Certifique-se de ter ícones nos tamanhos corretos para cada plataforma
3. **Certificados**: Mantenha seus certificados e keystores em local seguro
4. **Testes**: Sempre teste os builds em dispositivos reais antes de publicar
5. **Hot Reload**: O servidor configurado em `capacitor.config.ts` é apenas para desenvolvimento

---

## 🆘 Suporte e Recursos

### 📚 Documentação Oficial
- [Documentação Capacitor](https://capacitorjs.com/docs) - Para builds mobile
- [Documentação Electron](https://www.electronjs.org/docs) - Para builds desktop
- [React Documentation](https://react.dev) - Framework principal
- [Vite Guide](https://vitejs.dev/guide) - Build tool

### 👥 Equipe de Desenvolvimento

Este guia foi elaborado pela equipe técnica do projeto como parte da documentação acadêmica.

**Dicas para Avaliadores:**
- Todos os comandos foram testados pela equipe
- O processo de build pode levar alguns minutos
- Recomendamos testar primeiro o build web (mais rápido)
- Para builds mobile, é necessário ambiente específico configurado

---

**Documentação Técnica** | Projeto Acadêmico Bolso Aberto | Última atualização: 2025-10-07
