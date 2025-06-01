import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from '../../services/api';
import styles from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getMovieReviews(movieId).then(data => setReviews(data.results));
  }, [movieId]);

  return (
    <ul className={styles.list}>
      {reviews.length > 0 ? (
        reviews.map(({ id, author, content }) => (
          <li key={id}>
            <h4>Author: {author}</h4>
            <p>{content}</p>
          </li>
        ))
      ) : (
        <p>No reviews available.</p>
      )}
    </ul>
  );
};

export default MovieReviews;
