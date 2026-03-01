<div align="center">

<img height="160" alt="in.orbit" src="https://raw.githubusercontent.com/joschonarth/in-orbit-web/main/public/icon.svg" />

# in.orbit API

*Registre metas, acompanhe seu progresso e evolua semana a semana.*

<img src="https://img.shields.io/github/last-commit/joschonarth/in-orbit-server?style=for-the-badge&logo=git&logoColor=white&color=8b5cf6&labelColor=27272a" alt="last-commit">
<img src="https://img.shields.io/github/languages/top/joschonarth/in-orbit-server?style=for-the-badge&color=F67986&labelColor=27272a" alt="repo-top-language">
<img src="https://img.shields.io/github/languages/count/joschonarth/in-orbit-server?style=for-the-badge&color=8b5cf6&labelColor=27272a" alt="repo-language-count">
<img src="https://img.shields.io/github/actions/workflow/status/joschonarth/in-orbit-server/ci.yml?style=for-the-badge&color=F67986&labelColor=27272a" alt="ci-tests">

---

📃 [Sobre](#-sobre)&nbsp;&nbsp;•&nbsp;&nbsp;
🛠️ [Tecnologias](-tecnologias)&nbsp;&nbsp;•&nbsp;&nbsp;
✨ [Funcionalidades](#-funcionalidades)&nbsp;&nbsp;•&nbsp;&nbsp;
🚀 [Como rodar](#-como-rodar)&nbsp;&nbsp;•&nbsp;&nbsp;
📖 [Documentação](#-documentação-da-api)&nbsp;&nbsp;•&nbsp;&nbsp;
🧪 [Testes](#-testes)

</div>

---

## 📃 Sobre

O **in.orbit** é uma aplicação web para criação e acompanhamento de metas com foco semanal, e este repositório contém a **API REST** que a alimenta. Por meio dela é possível criar metas com frequência personalizada, marcar e desmarcar conclusões, acompanhar o progresso semanal e navegar por semanas anteriores através de um relatório detalhado. A API também gerencia a autenticação via GitHub e o sistema de gamificação com XP e níveis. O backend é construído com **Fastify**, **Drizzle ORM** e **PostgreSQL**.
 
---

## 🛠️ Tecnologias

- 🟢 **[Node.js](https://nodejs.org/)** — Ambiente de execução JavaScript server-side.
- ⚡ **[Fastify](https://fastify.dev/)** — Framework web focado em performance e baixo overhead.
- 🟦 **[TypeScript](https://www.typescriptlang.org/)** — Tipagem estática e segurança em tempo de desenvolvimento.
- 🗃️ **[Drizzle ORM](https://orm.drizzle.team/)** — ORM moderno e type-safe para TypeScript.
- 🐘 **[PostgreSQL](https://www.postgresql.org/)** — Banco de dados relacional robusto e confiável.
- 🐳 **[Docker](https://www.docker.com/)** — Containerização do banco de dados para ambiente reproduzível.
- 📖 **[Swagger](https://swagger.io/)** — Documentação interativa da API via `@fastify/swagger`.
- 🧪 **[Vitest](https://vitest.dev/)** — Framework de testes unitários e de integração.
- 🛡️ **[Zod](https://zod.dev/)** — Validação e parsing de schemas com inferência de tipos.
- 🔍 **[Biome](https://biomejs.dev/)** — Linting e formatação de código de alta performance.
- 🔄 **[GitHub Actions](https://github.com/features/actions)** — Integração contínua e automação do pipeline de testes.

---

## ✨ Funcionalidades

- [x] 🎯 Criar metas com frequência semanal definida
- [x] ✅ Marcar meta como concluída
- [x] ↩️ Desconcluir uma meta
- [x] 🗑️ Deletar uma meta
- [x] 📊 Relatório semanal de metas concluídas com histórico
- [x] 🗓️ Navegação entre semanas
- [x] 📈 Acompanhamento de progresso de metas
- [x] 🏆 Sistema de gamificação com XP por conclusão de meta
- [x] 🎮 Sistema de nível do usuário baseado em XP acumulado
- [x] 🔐 Autenticação com GitHub (OAuth)
- [x] 🛡️ Validação de dados com Zod
- [x] 📖 Documentação interativa da API com Swagger
- [x] 🧪 Testes automatizados com Vitest
- [x] 🔄 Pipeline de CI rodando os testes a cada push

---

## 🚀 Como rodar

### 📋 Pré-requisitos

- 🟩 [Node.js 18+](https://nodejs.org/)
- 📦 [npm](https://www.npmjs.com/)
- 🐳 [Docker](https://www.docker.com/)

### 🔧 Instalação

1. Clone o repositório:

    ```bash
    git clone https://github.com/joschonarth/in-orbit-server.git
    ```

2. Acesse a pasta do projeto:

    ```bash
    cd in-orbit-server
    ```

3. Instale as dependências:

    ```bash
    npm install
    ```

4. Configure as variáveis de ambiente copiando o arquivo de exemplo:

    ```bash
    cp .env.example .env
    ```

    Em seguida, abra o arquivo `.env` e preencha as variáveis:

    ```env
    GITHUB_CLIENT_ID=seu_github_client_id
    GITHUB_CLIENT_SECRET=seu_github_client_secret
    ```

### 🐳 Banco de dados

Suba o container do PostgreSQL com Docker:

```bash
docker compose up -d
```

Execute as migrations para criar as tabelas:

```bash
npx drizzle-kit migrate
```

Opcionalmente, popule o banco com dados de seed:

```bash
npm run seed
```

### ▶️ Execução

Inicia o servidor em modo de desenvolvimento:

```bash
npm run dev
```

O servidor estará disponível em **[http://localhost:3333](http://localhost:3333)**.

---

## 📖 Documentação da API

Com o servidor rodando, acesse a documentação interativa gerada pelo Swagger:

**[http://localhost:3333/docs](http://localhost:3333/docs)**

---

## 🧪 Testes

Os testes são escritos com **Vitest** e cobrem os principais fluxos e regras de negócio da aplicação.

```bash
# Roda todos os testes
npm test

# Roda os testes com watch mode
npm test:watch

# Exibe o relatório de cobertura
npm test:coverage
```

---

## ⚙️ CI

O projeto conta com um workflow de **Integração Contínua** via **GitHub Actions**. A cada `push` para a branch principal, o pipeline é acionado automaticamente e executa todos os testes para garantir que nenhuma funcionalidade foi quebrada.

```txt
.github/
└── workflows/
    └── ci.yml
```

---

## ⭐ Apoie este Projeto

Se curtiu o projeto, deixe uma ⭐ aqui no GitHub — isso ajuda muito!

---

<div align="center">

Feito com ♥ por **[João Otávio Schonarth](https://github.com/joschonarth)**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/joschonarth)
[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:seuemail@gmail.com)

</div>
