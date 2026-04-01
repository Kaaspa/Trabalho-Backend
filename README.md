# 📋 CRUD Funcionários e Salários

**Trabalho Vert+Back — UNIP**
**Prazo:** 02/04

---

## 📖 Descrição

Sistema web para gerenciamento de funcionários e seus salários com operações completas de **CRUD** (Create, Read, Update, Delete) via API REST.

---

## 🛠️ Linguagem, Bibliotecas e Frameworks

| Item | Tecnologia | Versão | Função |
|------|-----------|--------|--------|
| **Linguagem** | JavaScript | ES2020+ | Linguagem principal (back e front) |
| **Runtime** | Node.js | ≥ 18.x | Executa o JavaScript no servidor |
| **Framework** | Express | 4.18.2 | Criação das rotas e servidor HTTP |
| **Banco de Dados** | JSON (fs nativo) | — | Armazenamento local em arquivo `.json` |

> Nenhuma dependência nativa (compilação C++) é necessária.

---

## 🔌 Portas de Comunicação

| Porta | Protocolo | Uso |
|-------|-----------|-----|
| **3000** | HTTP | Servidor principal (API + Frontend) |

Acesso local: `http://localhost:3000`

---

## 📁 Estrutura do Projeto

```
crud-funcionarios/
├── server.js            → Servidor Express com as rotas da API
├── database.js          → Módulo de acesso ao armazenamento local
├── package.json         → Dependências e scripts do projeto
├── funcionarios.json    → Banco de dados local (gerado automaticamente)
└── public/
    └── index.html       → Interface web (frontend mínimo)
```

---

## 🚀 Como Instalar e Executar (Windows)

### Pré-requisitos
- [Node.js](https://nodejs.org/) versão 18 ou superior

### Passo a passo

```cmd
cd crud-funcionarios
npm install
npm start
```

Acesse: **http://localhost:3000**

Para parar: `Ctrl + C`

---

## ⚙️ Funcionalidades

| Ação | Como usar |
|------|-----------|
| **Adicionar** | Preencha o formulário e clique em "Salvar" |
| **Editar** | Clique em "Editar" na linha desejada, altere e salve |
| **Apagar** | Clique em "Apagar" e confirme |
| **Listar** | A tabela atualiza automaticamente após cada operação |

### Rotas da API

| Método | Rota | Ação |
|--------|------|------|
| `GET` | `/api/funcionarios` | Lista todos |
| `POST` | `/api/funcionarios` | Cadastra novo |
| `PUT` | `/api/funcionarios/:id` | Atualiza por ID |
| `DELETE` | `/api/funcionarios/:id` | Remove por ID |

---

## 📡 Respostas HTTP

| Código | Significado |
|--------|-------------|
| `200` | Sucesso |
| `201` | Criado com sucesso |
| `400` | Dado inválido ou ausente |
| `404` | Funcionário não encontrado |
| `500` | Erro interno do servidor |

---

## 🔒 Segurança

- **Sem lógica no frontend** — toda validação ocorre no `server.js`
- **Sanitização de strings** — `.trim()` e verificação de tipos antes de salvar
- **Proteção XSS** — dados exibidos no HTML passam por `escaparHTML()`

---

## 🧠 Pensamento Computacional

1. **Decomposição:** `database.js` cuida dos dados, `server.js` cuida das rotas, `index.html` cuida da exibição.
2. **Abstração:** O servidor não sabe como os dados são armazenados; chama apenas funções (`listar`, `criar`, `atualizar`, `deletar`).
3. **Reconhecimento de padrões:** Todas as rotas seguem o mesmo fluxo — validar → processar → responder JSON.
4. **Algoritmo de persistência:** Ler arquivo → modificar array → salvar arquivo.

---

*Projeto desenvolvido para a disciplina de Desenvolvimento Web — UNIP*
