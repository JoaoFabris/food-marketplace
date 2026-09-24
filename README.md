# Food Marketplace

Marketplace de comida desenvolvido como atividade final da disciplina de Front-End Development Advanced (Unidade 4) da Unyleya. O projeto consolida autenticação, CRUD completo de produtos, carrinho de compras e gerenciamento de estado global com Redux Toolkit.

## Objetivo

Aplicar na prática os conceitos de:

- React Hooks (`useState`, `useEffect`)
- Context API para autenticação
- Rotas protegidas com React Router
- Comunicação cliente-servidor com axios
- CRUD completo de produtos (cadastro, edição, exclusão e listagem)
- Carrinho de compras funcional
- Gerenciamento de estado global com Redux Toolkit

## Tecnologias

- React (Vite)
- React Router DOM
- Redux Toolkit + React Redux
- Context API
- Axios
- TailwindCSS
- JSON Server (API mock)

## Como rodar localmente

### 1. Clonar o repositório

\`\`\`bash
git clone https://github.com/JoaoFabris/food-marketplace.git
cd food-marketplace
\`\`\`

### 2. Instalar as dependências

\`\`\`bash
npm install
\`\`\`

### 3. Rodar o projeto

Este projeto precisa de **dois terminais abertos ao mesmo tempo**: um para a API mock (JSON Server) e outro para o React.

**Terminal 1 — API mock:**
\`\`\`bash
npm run server
\`\`\`
Disponível em `http://localhost:3001`

**Terminal 2 — Aplicação React:**
\`\`\`bash
npm run dev
\`\`\`
Disponível em `http://localhost:5173`

### 4. Login de teste

\`\`\`
Email: admin@food.com
Senha: 123456
\`\`\`

## Funcionalidades implementadas

### Autenticação

- Login com email e senha, validado contra a API mock
- Estado do usuário compartilhado via Context API
- Persistência do login no localStorage
- Rotas privadas: área `/admin` só é acessível para usuários autenticados, com redirecionamento automático para `/login` e retorno à página de origem após autenticar

### CRUD de produtos

- Listagem de produtos (Home, pública) com filtro por categoria
- Tela de detalhes de um produto específico
- Painel Admin (privado) com listagem, edição e exclusão de produtos
- Formulário de cadastro/edição com upload de imagem (preview em tempo real)
- Todas as operações comunicam com a API mock via axios

### Carrinho de compras

- Adicionar produto ao carrinho (da listagem ou da tela de detalhes)
- Atualizar quantidade de cada item
- Remover item do carrinho
- Cálculo automático do total da compra
- Botão de finalizar compra, que limpa o carrinho

### Redux

- Estado global do carrinho gerenciado com Redux Toolkit (`createSlice`, `configureStore`)
- Actions: `addProduct`, `removeProduct`, `updateQuantity`, `clearCart`
- Persistência do carrinho no localStorage via `store.subscribe`

### Layout

- Interface responsiva com TailwindCSS, inspirada em um design de referência de marketplace de comida
- Identidade visual própria (paleta vermelho/laranja, "FoodMarket")

## Estrutura do projeto

\`\`\`
src/
├── components/ # Componentes reutilizáveis (Header, ProdutoCard, RotaPrivada...)
├── context/ # Context API (autenticação)
├── pages/ # Páginas da aplicação (Home, Login, Admin, Carrinho...)
├── services/ # Configuração do axios e chamadas à API
├── store/ # Configuração do Redux (store e slices)
└── data/ # Dados auxiliares
db.json # Base de dados fake usada pelo JSON Server
\`\`\`
