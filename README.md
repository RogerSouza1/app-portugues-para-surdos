# 📱 App Português para Surdos

Um aplicativo educacional desenvolvido com React Native e Expo para ensinar português para pessoas surdas através de Libras.

## 🚀 Tecnologias Utilizadas

- **React Native** - Framework para desenvolvimento mobile
- **Expo** - Plataforma para desenvolvimento React Native
- **TypeScript** - Linguagem tipada
- **Expo Router** - Navegação baseada em arquivos
- **Supabase** - Backend como serviço (BaaS)
- **React Native Paper** - Biblioteca de UI Components
- **Expo AV** - Para reprodução de vídeos
- **AsyncStorage** - Armazenamento local

## 📁 Estrutura do Projeto

```
app-portugues-para-surdos/
├── app/                    # Páginas (Expo Router)
│   ├── tabs/              # Navegação em abas
│   ├── exercicios/        # Telas de exercícios
│   ├── niveis/            # Telas de níveis
│   └── ...
├── components/            # Componentes reutilizáveis
├── hooks/                 # Hooks customizados
├── lib/                   # Configurações de bibliotecas
├── services/              # Serviços da API
├── utils/                 # Funções utilitárias
├── types/                 # Definições de tipos TypeScript
├── constants/             # Constantes da aplicação
└── assets/               # Imagens, fontes, etc.
```

## 🛠️ Configuração do Ambiente

### Pré-requisitos

- Node.js (v16 ou superior)
- npm ou yarn
- Expo CLI
- Conta no Supabase

### Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/RogerSouza1/app-portugues-para-surdos.git
   cd app-portugues-para-surdos
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   ```bash
   cp .env.example .env
   ```
   
   Edite o arquivo `.env` com suas credenciais do Supabase:
   ```
   EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Inicie o servidor de desenvolvimento**
   ```bash
   npm start
   ```

## 📱 Scripts Disponíveis

- `npm start` - Inicia o servidor de desenvolvimento
- `npm run start:clear` - Inicia com cache limpo
- `npm run start:tunnel` - Inicia com túnel (útil para problemas de rede)
- `npm run android` - Abre no Android
- `npm run ios` - Abre no iOS
- `npm run web` - Abre no navegador
- `npm run lint` - Executa o linter
- `npm run type-check` - Verifica tipos TypeScript

## 🔧 Funcionalidades

### ✅ Implementadas
- **Autenticação** - Sistema de login/logout
- **Módulos Educacionais** - Organização por temas
- **Exercícios Interativos** - Multiple choice com vídeos em Libras
- **Progresso do Usuário** - Acompanhamento de exercícios concluídos
- **Dicionário** - Consulta de palavras em Libras
- **Interface Acessível** - Design focado na acessibilidade

### 🚧 Em Desenvolvimento
- Sistema de gamificação
- Exercícios de escrita
- Reconhecimento de gestos
- Modo offline

## 🎯 Arquitetura

### Gerenciamento de Estado
- **Local**: AsyncStorage para dados persistentes
- **Remoto**: Supabase para dados sincronizados
- **Hooks customizados** para lógica de negócio

### Tratamento de Erros
- **ErrorBoundary** para captura global de erros
- **Try/catch** em todas as operações assíncronas
- **Logs estruturados** para debugging

### Performance
- **Lazy loading** de componentes
- **Otimização de imagens** com Expo Image
- **Cache** de dados do Supabase

## 🔒 Segurança

- Validação de entrada de dados
- Sanitização de URLs de mídia
- Row Level Security no Supabase
- Headers customizados para API

## 📊 Database Schema (Supabase)

```sql
-- Principais tabelas
modulo              # Módulos educacionais
exercicio           # Exercícios dos módulos
exercicio_alternativa  # Alternativas dos exercícios
alternativa         # Opções de resposta
media              # Vídeos e imagens
dicionario         # Palavras do dicionário
profiles           # Perfis dos usuários
```

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.


---

**Desenvolvido com ❤️ para a comunidade surda**
