import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import App from './App.jsx'
import Home from './pages/Home.jsx'
import Movie from './pages/Movie.jsx'
import Search from './pages/Search.jsx'


// Procura no HTML o elemento com id="root", onde toda a aplicacao React sera exibida.
createRoot(document.getElementById('root')).render(
  // StrictMode ajuda a identificar problemas durante o desenvolvimento.
  // Ele nao aparece na interface nem altera o HTML final da aplicacao.
  <StrictMode>
    {/* BrowserRouter permite navegar pelas paginas usando a URL do navegador. */}
    <BrowserRouter>
      {/* Routes agrupa todas as rotas da aplicacao. */}
      <Routes>
        {/* App funciona como elemento principal e envolve as paginas internas. */}
        <Route element={<App />} >
          {/* Rota inicial: exibida quando o usuario acessa a pagina principal. */}
          <Route path="/" element={<Home />} />
          {/* Rota de detalhes: ":id" representa o identificador do filme na URL. */}
          <Route path="movie/:id" element={<Movie />} />
          {/* Rota de busca: exibida quando o usuario acessa /search. */}
          <Route path="search" element={<Search />} />
        </Route>
      </Routes>
    </BrowserRouter> 
  </StrictMode>,
)
