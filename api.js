const API_KEY = "e3ffb6091393154ff4a81caaf0b29666";

const BASE_URL = "https://api.themoviedb.org/3";

const nowPlaying = () =>
  fetch(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=ko&page=1&region=KR`
  ).then((res) => res.json());

const upComing = () =>
  fetch(
    `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=ko&page=1&region=KR`
  ).then((res) => res.json());

const trending = () =>
  fetch(
    `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=ko&region=KR`
  ).then((res) => res.json());

export const moviesApi = { nowPlaying, upComing, trending };
