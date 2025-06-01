import { useEffect, useRef, useState, Suspense } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { getMovieDetails } from '../../services/api';
import styles from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from || '/movies');
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovieDetails(movieId).then(setMovie);
  }, [movieId]);

  if (!movie) return <p>Loading...</p>;

  const { title, overview, genres, poster_path } = movie;

  return (
    <div className={styles.container}>
      <Link to={backLinkRef.current}>Go back</Link>
      <div className={styles.details}>
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w300${poster_path}`
              : 'https://via.placeholder.com/300x450'
          }
          alt={title}
        />
        <div>
          <h2>{title}</h2>
          <p>{overview}</p>
          <p>
            Genres: {genres.map(genre => genre.name).join(', ')}
          </p>
        </div>
      </div>
      <div className={styles.additional}>
        <h3>Additional information</h3>
        <ul>
          <li>
            <Link to="cast">Cast</Link>
          </li>
          <li>
            <Link to="reviews">Reviews</Link>
          </li>
        </ul>
      </div>
      <Suspense fallback={<p>Loading...</p>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;
