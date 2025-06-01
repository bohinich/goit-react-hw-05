import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'Bearer YOUR_API_READ_ACCESS_TOKEN';

const options = {
  headers: {
    Authorization: API_KEY,
  },
};

export const getTrendingMovies = async () => {
  const { data } = await axios.get(`${BASE_URL}/trending/movie/day`, options);
  return data;
};

export const searchMovies = async query => {
  const { data } = await axios.get(
    `${BASE_URL}/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
    options
  );
  return data;
};

export const getMovieDetails = async movieId => {
  const { data } = await axios.get(`${BASE_URL}/movie/${movieId}`, options);
  return data;
};

export const getMovieCredits = async movieId => {
  const { data } = await axios.get(`${BASE_URL}/movie/${movieId}/credits`, options);
  return data;
};

export const getMovieReviews = async movieId => {
  const { data } = await axios.get(`${BASE_URL}/movie/${movieId}/reviews`, options);
  return data;
};
