# API CRUD - SaaS Glen

API RESTful completa com operações CRUD (Create, Read, Update, Delete).

## Instalação

```bash
cd backend
npm install
```

## Configuração

1. Crie um arquivo `.env` na pasta `backend`:
```
PORT=3000
NODE_ENV=development
```

## Executar

```bash
# Modo desenvolvimento (com nodemon)
npm run dev

# Modo produção
npm start
```

A API estará disponível em `http://localhost:3000`

## Endpoints da API

### Base URL: `/api/items`

#### 1. Listar todos os itens
- **GET** `/api/items`
- **Resposta:**
```json
{
  "success": true,
  "data": [...],
  "count": 0
}
```

#### 2. Buscar item por ID
- **GET** `/api/items/:id`
- **Resposta:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Item exemplo",
    "description": "Descrição do item",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### 3. Criar novo item
- **POST** `/api/items`
- **Body:**
```json
{
  "name": "Nome do item",
  "description": "Descrição (opcional)"
}
```
- **Resposta:**
```json
{
  "success": true,
  "message": "Item criado com sucesso",
  "data": {...}
}
```

#### 4. Atualizar item
- **PUT** `/api/items/:id`
- **Body:**
```json
{
  "name": "Nome atualizado",
  "description": "Descrição atualizada"
}
```
- **Resposta:**
```json
{
  "success": true,
  "message": "Item atualizado com sucesso",
  "data": {...}
}
```

#### 5. Deletar item
- **DELETE** `/api/items/:id`
- **Resposta:**
```json
{
  "success": true,
  "message": "Item deletado com sucesso"
}
```

## Estrutura do Projeto

```
backend/
├── server.js              # Servidor principal
├── package.json           # Dependências
├── .env                   # Variáveis de ambiente (não versionado)
├── models/
│   └── itemModel.js      # Modelo de dados
├── controllers/
│   └── itemController.js # Lógica de negócio
└── routes/
    └── itemRoutes.js     # Definição de rotas
```

## Notas

- Atualmente os dados são armazenados em memória (serão perdidos ao reiniciar o servidor)
- Para produção, substitua o modelo em memória por um banco de dados (MongoDB, PostgreSQL, etc.)
- A API inclui validação básica e tratamento de erros

