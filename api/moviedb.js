import axios from "axios";
import { apiKey } from "../constants";

// main endpoint
const apiBaseUrl = "https://api.themoviedb.org/3";

// movie endpoints
const trendingMoviesEndpoint = `${apiBaseUrl}/discover/movie?api_key=${apiKey}&include_adult=true&page=1&region=IN&sort_by=popularity.desc&watch_region=IN&with_release_type=3,4&with_watch_monetization_types=flatrate&primary_release_year=2025&with_origin_country=IN`;
const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`;
const topRatedMoviesEndpoint = `${apiBaseUrl}/discover/movie?api_key=${apiKey}&include_adult=true&page=2&region=IN&sort_by=popularity.desc&watch_region=IN&with_release_type=3,4&with_watch_monetization_types=flatrate&primary_release_year=2025&with_origin_country=IN`;
const movieDetailsEndpoint = (id) =>
  `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`;
const movieCreditsEndpoint = (id) =>
  `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`;
const similarMoviesEndpoint = (id) =>
  `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`;

// series endpoints
const topRatedSeriesEndpoint = `${apiBaseUrl}/discover/tv?api_key=${apiKey}&include_adult=false&include_null_first_air_dates=false&page=1&sort_by=popularity.desc&watch_region=IN&with_origin_country=US&with_watch_monetization_types=flatrate&with_watch_providers=8%7C119%7C350`;
const popularSeriesEndpoint = `${apiBaseUrl}/discover/tv?api_key=${apiKey}&include_adult=false&include_null_first_air_dates=false&page=2&sort_by=popularity.desc&watch_region=IN&with_origin_country=IN&with_watch_monetization_types=flatrate&with_watch_providers=8%7C119%7C350`;
const seriesDetailsEndpoint = (id) =>
  `${apiBaseUrl}/tv/${id}?api_key=${apiKey}`;
const seriesCreditsEndpoint = (id) =>
  `${apiBaseUrl}/tv/${id}/credits?api_key=${apiKey}`;
const similarSeriesEndpoint = (id) =>
  `${apiBaseUrl}/tv/${id}/similar?api_key=${apiKey}`;

// people endpoints
const personDetailsEndpoint = (id) =>
  `${apiBaseUrl}/person/${id}?api_key=${apiKey}`;
const personMoviesEndpoint = (id) =>
  `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}`;

// search endpoint
const searchMoviesEndpoint = `${apiBaseUrl}/search/multi?api_key=${apiKey}`;


// functions to get images of different widths, (show images using these to improve the loading times)
export const image500 = (posterPath) =>
  posterPath ? "https://image.tmdb.org/t/p/w500" + posterPath : null;
export const image342 = (posterPath) =>
  posterPath ? "https://image.tmdb.org/t/p/w342" + posterPath : null;
export const image185 = (posterPath) =>
  posterPath ? "https://image.tmdb.org/t/p/w185" + posterPath : null;

// fallback images
export const fallbackMoviePoster =
  "https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg";
export const fallbackPersonImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU";

const apiCall = async (endpoint, params) => {
  const options = {
    method: "GET",
    url: endpoint,
    params: params ? params : {},
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log("error: ", error);
    return {};
  }
};

// home screen apis
export const fetchTrendingMovies = () => {
  return apiCall(trendingMoviesEndpoint);
};
export const fetchUpcomingMovies = () => {
  return apiCall(upcomingMoviesEndpoint);
};
export const fetchTopRatedMovies = () => {
  return apiCall(topRatedMoviesEndpoint);
};
export const fetchTopRatedSeries = () => {
  return apiCall(topRatedSeriesEndpoint);
};
export const fetchPopularSeries = () => {
  return apiCall(popularSeriesEndpoint);
};

// movie screen apis
export const fetchMovieDetails = (id) => {
  return apiCall(movieDetailsEndpoint(id));
};
export const fetchMovieCredits = (movieId) => {
  return apiCall(movieCreditsEndpoint(movieId));
};
export const fetchSimilarMovies = (movieId) => {
  return apiCall(similarMoviesEndpoint(movieId));
};

// series screen apis
export const fetchSeriesDetails = (id) => {
  return apiCall(seriesDetailsEndpoint(id));
};
export const fetchSeriesCredits = (seriesId) => {
  return apiCall(seriesCreditsEndpoint(seriesId));
};
export const fetchSimilarSeries = (seriesId) => {
  return apiCall(similarSeriesEndpoint(seriesId));
};

// person screen apis
export const fetchPersonDetails = (personId) => {
  return apiCall(personDetailsEndpoint(personId));
};
export const fetchPersonMovies = (personId) => {
  return apiCall(personMoviesEndpoint(personId));
};

// search screen apis
export const searchMovies = (params) => {
  return apiCall(searchMoviesEndpoint, params);
};
