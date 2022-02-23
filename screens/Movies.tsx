import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  ActivityIndicator,
  Dimensions,
  RefreshControl,
  ScrollView,
} from "react-native";
// import Swiper from "react-native-web-swiper";
// ! IOS에서는 스크롤 이벤트가 걸린다 => react-native-swiper로 변경 (npm i --save react-native-swiper@next)
import Swiper from "react-native-swiper";
// ! 대신 이건 웹 호환이 안된다.
import styled from "styled-components/native";
import Slide from "../components/Slide";
import TrendingMovies from "../components/TrendingMovies";
import ComingMovies from "../components/ComingMovies";

const API_KEY = "e3ffb6091393154ff4a81caaf0b29666";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNoWPlaying] = useState([]);
  const [upComing, setUpComing] = useState([]);
  const [trending, setTrending] = useState([]);

  const onRefresh = async () => {
    console.log("refresh");
    setRefreshing(true);
    await getDate();
    setRefreshing(false);
  };

  const getNowPlaying = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=ko&page=1&region=KR`
      )
    ).json();
    setNoWPlaying(results);
    // console.log(results[0]);
  };

  const getUpcoming = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=ko&page=1&region=KR`
      )
    ).json();
    setUpComing(results);
    // console.log(results);
  };

  const getTrending = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&language=ko&region=KR`
      )
    ).json();
    setTrending(results);
  };

  const getDate = async () => {
    await Promise.all([getNowPlaying(), getUpcoming(), getTrending()]);
    setLoading(false);
  };

  useEffect(() => {
    getDate();
  }, []);

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Swiper
        horizontal
        loop
        autoplay
        autoplayTimeout={5}
        showsButtons={false}
        // showsPagination={false} //!버튼 숨김
        containerStyle={{
          width: "100%",
          height: SCREEN_HEIGHT / 3,
          marginBottom: 20,
        }}
      >
        {nowPlaying.map((movie) => (
          <Slide
            key={movie.id}
            backdrop_path={movie.backdrop_path}
            poster_path={movie.poster_path}
            original_title={movie.original_title}
            overview={movie.overview}
            vote_average={movie.vote_average}
          />
        ))}
      </Swiper>
      <ListTitle>Trending Movies</ListTitle>
      <TrendingScroll
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 20 }}
      >
        {trending.map((movie) => (
          <TrendingMovies
            key={movie.id}
            poster_path={movie.poster_path}
            original_title={movie.original_title}
            vote_average={movie.vote_average}
          />
        ))}
      </TrendingScroll>
      <ListTitle>ComingSoon Movies</ListTitle>
      {upComing.map((movie) => (
        <ComingMovies
          key={movie.id}
          poster_path={movie.poster_path}
          original_title={movie.original_title}
          release_date={movie.release_date}
          overview={movie.overview}
        />
      ))}
    </ScrollView>
  );
};

export default Movies;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ListTitle = styled.Text`
  color: white;
  font-size: 15px;
  font-weight: 600;
  margin: 0 0 10px 20px;
`;

const TrendingScroll = styled.ScrollView`
  margin: 20px 0 20px 0;
`;
