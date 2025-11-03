# PWEBII Twitter (Mordecai)

Aplicação full‑stack inspirada no Twitter para a disciplina Programação Web II (2025.2). O projeto contém um backend em Node/Express com MongoDB e um frontend em React (Vite), permitindo criar posts, listar posts, visualizar detalhes, comentar e remover posts/comentários. Inclui registro de usuário com senha hasheada (bcryptjs) e exibição do nome do autor nos posts.

## Stack

-   Backend: Node.js, Express, Mongoose, CORS, dotenv, bcryptjs
-   Banco: MongoDB (via connection string)
-   Frontend: React (Vite), React Router, Axios, Formik + Yup, Tailwind CSS

## Estrutura de Pastas

```
pwebII-twitter/
├─ README.md
├─ client/                      # Backend (Express + MongoDB)
│  ├─ package.json
│  ├─ server.js                 # Entry do servidor (porta 3001)
│  └─ src/
│     ├─ app.js                 # App Express, CORS e registro de rotas
│     ├─ config/
│     │  └─ dbConnection.js     # Conexão com MongoDB (env DB_CONNECTION_STRING)
│     ├─ controllers/
│     │  ├─ postController.js   # CRUD de posts (populate de user, delete em cascata de comments)
│     │  ├─ commentController.js# CRUD de comments
│     │  └─ userController.js   # CRUD de users (hash da senha com bcryptjs)
│     ├─ models/
│     │  ├─ Post.js             # Post: {title, text, user(ref users)}
│     │  ├─ Comment.js          # Comment: {text, postID(ref posts)}
│     │  └─ User.js             # User: {username, password(hash)}
│     └─ routes/
│        ├─ index.js            # Agrega rotas (GET / e usa JSON + routers)
│        ├─ postRoutes.js       # /posts, /posts/:id
│        ├─ commentRoutes.js    # /comments, /comments/:postID, /comments/:id
│        └─ userRoutes.js       # /users, /users/:id, /auth (atual mente espelha /users)
│
└─ Mordecai_PWEBII/             # Frontend (React + Vite)
	 ├─ package.json
	 ├─ vite.config.js
	 ├─ public/
	 └─ src/
			├─ services/
			│  └─ api.js              # Axios apontando para http://localhost:3001
			├─ Components/
			│  ├─ Navbar/             # Navbar com links: Home, Criar post, Registrar
			│  ├─ HomePost/           # Card do post na listagem
			│  ├─ PostForm/           # Formik para criar posts
			│  ├─ CommentForm/        # Formik para criar comentários
			│  ├─ PostPageCardPost/   # Card do post na página de detalhes
			│  └─ PostPageComment/    # Card do comentário com botão Remover
			└─ Pages/
				 ├─ Home/               # Lista posts e formulário (ou botão para criar)
				 ├─ PostPage/           # Detalhes do post + comentários
				 ├─ RegisterPage/       # Registro de usuário (Formik + Yup, navigate após sucesso)
				 └─ CreatePost/         # Página dedicada para criar post
```

## Principais Funcionalidades

-   Posts

    -   Criar post (Formik) e atualizar a listagem automaticamente
    -   Listar posts na Home e navegar para detalhes
    -   Exibir autor (username) populado via `populate('user', 'username')`
    -   Remover post (com confirmação) e deletar comentários relacionados no backend

-   Comentários

    -   Criar comentário (Formik), com atualização imediata da lista
    -   Listar comentários por post
    -   Remover comentário (com confirmação)

-   Usuários

    -   Registrar usuário (Formik + Yup), com validação (min. 3 para username, 6 para senha)
    -   Senhas armazenadas como hash usando `bcryptjs`

-   Navegação
    -   Navbar com links para Home, Criar Post e Registrar
    -   Home possui botão para `/register`

## API (resumo)

Base URL (dev): `http://localhost:3001`

-   Posts

    -   GET `/posts` — lista todos os posts (com `user.username` populado)
    -   GET `/posts/:id` — obtém um post (com `user.username` populado)
    -   POST `/posts` — cria post
    -   PUT `/posts/:id` — atualiza post
    -   DELETE `/posts/:id` — deleta post e comentários relacionados

-   Comentários

    -   GET `/comments` — lista todos os comentários
    -   GET `/comments/:postID` — lista comentários de um post
    -   POST `/comments` — cria comentário `{ text, postID }`
    -   PUT `/comments/:id` — atualiza comentário
    -   DELETE `/comments/:id` — deleta comentário

-   Usuários
    -   GET `/users` — lista usuários
    -   GET `/users/:id` — obtém um usuário
    -   POST `/users` — cria usuário (senha hasheada)
    -   PUT `/users/:id` — atualiza usuário (re‑hasheia se trocar `password`)
    -   DELETE `/users/:id` — deleta usuário
    -   POST `/auth` — (atual) mesmo comportamento de criação; pode ser adaptado para login posteriormente

## Configuração e Execução

Pré‑requisitos:

-   Node.js 18+ e npm
-   MongoDB (local ou Atlas)

1. Backend (pasta `client/`)

-   Crie um arquivo `.env` em `client/` com:

```env
DB_CONNECTION_STRING=mongodb+srv://<usuario>:<senha>@<host>/<database>?retryWrites=true&w=majority
```

-   Instale dependências e suba o servidor:

```powershell
cd client
npm install
npm run start   # ou: npm run nodemon
```

O backend inicia em `http://localhost:3001`.

2. Frontend (pasta `Mordecai_PWEBII/`)

-   Instale e rode em modo dev:

```powershell
cd Mordecai_PWEBII
npm install
npm run dev
```

Abra a URL indicada pelo Vite (ex.: `http://localhost:5173`).

## Notas de Implementação

-   CORS habilitado no backend (`app.use(cors())`).
-   O frontend usa `axios` com `baseURL` em `src/services/api.js`.
-   Após criar/excluir posts/comentários, o frontend atualiza o estado local ou refaz o GET para refletir no UI sem recarregar a página.
-   Uso de Tailwind CSS para estilos rápidos e consistentes.

## Próximos Passos (sugestões)

-   Implementar autenticação real (login) com verificação de senha (`bcrypt.compare`) e JWT.
-   Proteger rotas de criação/remoção no backend com middleware de autenticação.
-   Paginação/infinitescroll para listagem de posts.
-   Feedbacks visuais (toasts) para operações de sucesso/erro.

---

Desenvolvido para a disciplina Programação Web II — 2025.2.
