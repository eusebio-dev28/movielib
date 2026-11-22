# MoviesLib

Aplicação de catálogo de filmes desenvolvida com **React** e **Vite**, que consome dados da API do [TMDB (The Movie Database)](https://www.themoviedb.org/).

## Funcionalidades

- Lista de **melhores filmes** na página inicial
- **Pesquisa** de filmes por título
- Página de **detalhe** de cada filme
- Navegação entre páginas com **React Router**
- Estado e pedidos à API com **React Hooks** (`useState`, `useEffect`, `useSearchParams`)

## Tecnologias

- React
- Vite
- React Router
- API do TMDB

## Como executar o projecto

### 1. Clonar o repositório

```bash
git clone https://github.com/eusebio-dev28/movielib.git
cd movielib
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Configurar a chave da API

Cria um ficheiro `.env` na raiz do projecto com a tua chave do TMDB:

```
VITE_TMDB_API_KEY=a_tua_chave_aqui
```

Obtém a chave gratuitamente em [themoviedb.org](https://www.themoviedb.org/settings/api).

> O ficheiro `.env` não é enviado para o GitHub, por isso cada pessoa deve criar o seu.

### 4. Iniciar o servidor de desenvolvimento

```bash
npm run dev
```

Abre o endereço que aparece no terminal (normalmente `http://localhost:5173`).

## Estrutura do projecto

```
src/
├── components/   # MovieCard, Navbar
├── pages/        # Home, Movie, Search
├── App.jsx
└── main.jsx
```

## Autor

**Eusébio Jimbi** · [Jimbi Code](https://github.com/eusebio-dev28)
