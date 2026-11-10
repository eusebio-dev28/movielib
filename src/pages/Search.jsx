import { useEffect, useState } from "react";
import {useSearchParams} from "react-router-dom";

import MovieCard from "../components/MovieCard";


const searchApi = import.meta.env.VITE_SEARCH?.replace(/\/+$/, "");
const apiKey = import.meta.env.VITE_API_KEY;

import './MovieGrid.css'


// Pagina reservada para mostrar os resultados da busca por filmes.
const Search = () => {
  const [searchParams] = useSearchParams();

  const [movies, setMovies] = useState([]);
  const query = searchParams.get("q") || "";
  const [error, setError] = useState("");

  useEffect(() => {
    const getSearchResults = async () => {
      setMovies([]);
      setError("");

      if (!query) {
        setError("");
        return;
      }

      if (!apiKey || apiKey === "cole_aqui_a_sua_chave") {
        setError("Adicione a chave da API do TMDB no arquivo .env.");
        return;
      }

      try {
        const queryParam = apiKey.startsWith("api_key=") ? apiKey : `api_key=${apiKey}`;
        const res = await fetch(
          `${searchApi}?${queryParam}&query=${encodeURIComponent(query)}&language=pt-BR`
        );
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.status_message || "Nao foi possivel realizar a busca.");
        }

        setMovies(data.results);
      } catch (err) {
        setError(err.message);
      }
    };

    getSearchResults();
  }, [query]);


  return (
     <div className="container">
    <h2 className="title">Resultado para <span className="query-text">{query}</span></h2>
    <div className="movies-container">
        {/* Mostra erro ou carregamento enquanto a lista nao esta disponivel. */}
        {error && <p>{error}</p>}
        {!error && movies.length === 0 && <p>Carregando...</p>}
      {/* Cria um item para cada filme retornado pela API. */}
      {movies.length > 0 && ( movies.map((movie) => <MovieCard key={movie.id} movie={movie} />))}
    </div>
    </div>
    );
};

export default Search;