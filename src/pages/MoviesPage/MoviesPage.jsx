import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../../services/api';
import MovieList from '../../components/MovieList/MovieList';
import styles from './MoviesPage.module.css';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  useEffect(() => {
    if (query) {
      searchMovies(query).then(data => setMovies(data.results));
    }
  }, [query]);

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const value = form.elements.query.value.trim();
    if (value) {
      setSearchParams({ query: value });
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <input type="text" name="query" defaultValue={query} />
        <button type="submit">Search</button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
