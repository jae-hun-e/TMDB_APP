const API_KEY = "e3ffb6091393154ff4a81caaf0b29666";

const BASE_URL = "https://api.themoviedb.org/3";

export const moviesApi = {
  nowPlaying: () =>
    fetch(
      `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=ko&page=1&region=KR`
    )
      .then((res) => res.json())
      .catch(function (error) {
        throw error;
      }),
  upComing: () =>
    fetch(
      `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=ko&page=1&region=KR`
    )
      .then((res) => res.json())
      .catch(function (error) {
        throw error;
      }),

  trending: () =>
    fetch(
      `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=ko&region=KR`
    )
      .then((res) => res.json())
      .catch(function (error) {
        throw error;
      }),

  search: ({ queryKey }: any) => {
    // console.log("info", info);
    const [_, query] = queryKey;
    // console.log(query);
    return fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=ko&query=${query}&page=1&include_adult=false&region=KR`
    )
      .then((res) => res.json())
      .catch(function (error) {
        throw error;
      });
  },
};

export const tvApi = {
  topRated: () =>
    fetch(
      `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=ko&page=1&region=KR`
    )
      .then((res) => res.json())
      .catch(function (error) {
        throw error;
      }),
  popular: () =>
    fetch(
      `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=ko&page=1&region=KR`
    )
      .then((res) => res.json())
      .catch(function (error) {
        throw error;
      }),
  trending: () =>
    fetch(
      `${BASE_URL}/trending/tv/week?api_key=${API_KEY}&language=ko&region=KR`
    )
      .then((res) => res.json())
      .catch(function (error) {
        throw error;
      }),
  search: ({ queryKey }: any) => {
    const [_, query] = queryKey;
    return fetch(
      `${BASE_URL}/search/tv?api_key=${API_KEY}&query=${query}&language=ko&region=KR`
    )
      .then((res) => res.json())
      .catch(function (error) {
        throw error;
      });
  },
};
