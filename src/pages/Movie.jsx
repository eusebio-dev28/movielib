import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BsGraphUp, BsWallet2, BsHourglass, BsFillFileEarmarkFill } from 'react-icons/bs';

import './MovieGrid.css';

const movieApi = import.meta.env.VITE_API;
const imageUrl = import.meta.env.VITE_IMG;
const apiKey = import.meta.env.VITE_API_KEY;

// Busca e exibe os detalhes do filme indicado na rota.
const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    const getMovie = async () => {
      setMovie(null);
      setError('');
      setLoading(true);

      // Valida as configuracoes antes de chamar a API.
      if (!movieApi || !apiKey || apiKey === 'cole_aqui_a_sua_chave') {
        setError('Configure a URL e a chave da API do TMDB no arquivo .env.');
        setLoading(false);
        return;
      }

      const query = apiKey.startsWith('api_key=') ? apiKey : `api_key=${apiKey}`;
      const movieUrl = `${movieApi.replace(/\/+$/, '')}/${encodeURIComponent(id)}?${query}&language=pt-BR`;

      try {
        const res = await fetch(movieUrl);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.status_message || 'Nao foi possivel carregar os detalhes do filme.');
        }

        // Atualiza a tela somente se esta busca ainda corresponder ao filme atual.
        if (isActive) {
          setMovie(data);
        }
      } catch (err) {
        if (isActive) {
          setError(err.message);
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    getMovie();

    // Impede que uma resposta antiga altere a pagina apos trocar de filme.
    return () => {
      isActive = false;
    };
  }, [id]);

  return (
    <main className="container">
      {loading && <p>Carregando detalhes do filme...</p>}
      {error && <p role="alert">{error}</p>}
      {movie && (
        <section className="movie-details">
          <div className="movie-details-poster">
            {movie.poster_path ? (
              <img src={`${imageUrl}${movie.poster_path}`} alt={`Poster de ${movie.title}`} />
            ) : (
              <div className="movie-poster-placeholder">Poster indisponivel</div>
            )}
          </div>
          <div className="movie-details-info">
            <h1 className="title">{movie.title}</h1>
            <p>{movie.overview || 'Sinopse indisponivel.'}</p>
            <p><BsFillFileEarmarkFill /> Generos: {movie.genres?.length ? movie.genres.map((genre) => genre.name).join(', ') : 'Nao informado'}</p>
            <p><BsHourglass /> Duracao: {movie.runtime ? `${movie.runtime} minutos` : 'Nao informada'}</p>
            <p><BsWallet2 /> Orcamento: {movie.budget > 0 ? movie.budget.toLocaleString('pt-BR', { style: 'currency', currency: 'USD' }) : 'Nao informado'}</p>
            <p><BsGraphUp /> Receita: {movie.revenue > 0 ? movie.revenue.toLocaleString('pt-BR', { style: 'currency', currency: 'USD' }) : 'Nao informada'}</p>
            <p>Nota: {typeof movie.vote_average === 'number' ? movie.vote_average.toFixed(1) : 'Nao informada'}</p>
          </div>
        </section>
      )}
    </main>
  );
};

export default Movie;
