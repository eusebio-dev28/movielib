import {useState, useEffect} from "react";
import MovieCard from "../components/MovieCard.jsx";

import './MovieGrid.css'

// URLs e chave da API sao lidas das variaveis definidas no arquivo .env.
const movieApi = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

// Exibe os filmes mais bem avaliados retornados pelo TMDB.
const Home = () => {
    // Guarda a lista recebida da API e uma mensagem caso ocorra algum erro.
    const [topMovies, setTopMovies] = useState([]);
    const [error, setError] = useState("");
    
    // Busca os filmes mais bem avaliados e atualiza o estado da pagina.
    const getTopMovies = async (url) => {
        try {
            const res = await fetch(url);
            const data = await res.json();

            // Converte respostas de erro da API em mensagens exibidas na tela.
            if (!res.ok) {
                throw new Error(data.status_message || "Nao foi possivel carregar os filmes.");
            }

            // Armazena os resultados para que a lista de filmes seja renderizada.
            setTopMovies(data.results);
        } catch (err) {
            // Guarda a falha para que a mensagem correspondente apareca na pagina.
            setError(err.message);
        }
    }

    // Executa a busca ao abrir a pagina inicial.
    useEffect(() => {
        if (!apiKey || apiKey === "cole_aqui_a_sua_chave") {
            setError("Adicione a chave da API do TMDB no arquivo .env.");
            return;
        }

        // Monta a URL com a chave e a rota dos filmes mais bem avaliados.
        const query = apiKey.startsWith("api_key=") ? apiKey : `api_key=${apiKey}`;
        const topRatedUrl = `${movieApi}top_rated?${query}`;
        getTopMovies(topRatedUrl);
    }, []);

    

  return (
  <div className="container home-page">
    <h1 className="home-title">Melhores filmes</h1>
    <div className="movies-container">
        {/* Mostra erro ou carregamento enquanto a lista nao esta disponivel. */}
        {error && <p>{error}</p>}
        {!error && topMovies.length === 0 && <p>Carregando...</p>}
      {/* Cria um item para cada filme retornado pela API. */}
      {topMovies.length > 0 && ( topMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />))}
    </div>
    </div>
  );
};

export default Home;