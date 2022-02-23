import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ActivityIndicator, Dimensions, FlatList } from "react-native";
// import Swiper from "react-native-web-swiper";
// ! IOS에서는 스크롤 이벤트가 걸린다 => react-native-swiper로 변경 (npm i --save react-native-swiper@next)
import Swiper from "react-native-swiper";
// ! 대신 이건 웹 호환이 안된다.
import styled from "styled-components/native";
import Slide from "../components/Slide";
import TrendingMovies from "../components/TrendingMovies";
import ComingMovies from "../components/ComingMovies";
import { useQuery } from "react-query";
import { moviesApi } from "../api";

const API_KEY = "e3ffb6091393154ff4a81caaf0b29666";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const [refreshing, setRefreshing] = useState(false);

  const { isLoading: nowPlayingLoading, data: nowPlaying } = useQuery(
    "nowPlaying",
    moviesApi.nowPlaying
  );
  const { isLoading: upComingLoading, data: upComing } = useQuery(
    "upComing",
    moviesApi.upComing
  );
  const { isLoading: trendingLoading, data: trending } = useQuery(
    "trending",
    moviesApi.trending
  );

  const onRefresh = async () => {
    console.log("refresh");
  };

  // ! refatoring
  const renderVMedia = ({ item }) => (
    <TrendingMovies
      poster_path={item.poster_path}
      original_title={item.title}
      vote_average={item.vote_average}
    />
  );

  const renderHMedia = ({ item }) => (
    <ComingMovies
      poster_path={item.poster_path}
      original_title={item.title}
      release_date={item.release_date}
      overview={item.overview}
    />
  );

  const movieKeyExtractor = (item) => item.id + "";

  const loading = nowPlayingLoading || upComingLoading || trendingLoading;

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <FlatList
      refreshing={refreshing}
      onRefresh={onRefresh}
      ListHeaderComponent={
        <>
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
            {nowPlaying.results.map((movie) => (
              <Slide
                key={movie.id}
                backdrop_path={movie.backdrop_path}
                poster_path={movie.poster_path}
                original_title={movie.title}
                overview={movie.overview}
                vote_average={movie.vote_average}
              />
            ))}
          </Swiper>
          <ListTitle>Trending Movies</ListTitle>

          {/* //! ScrollView는 한번에 모든 컴포넌트를 로딩하기 때문에 성능 저하를 일으킨다 (FlatList가 더 좋음)  */}
          <TrendingScroll
            horizontal
            keyExtractor={movieKeyExtractor}
            showsHorizontalScrollIndicator={false}
            data={trending.results}
            renderItem={renderVMedia}
            ItemSeparatorComponent={VSeparator}
          />

          <ListTitle>ComingSoon Movies</ListTitle>
        </>
      }
      keyExtractor={movieKeyExtractor}
      data={upComing.results}
      renderItem={renderHMedia}
      ItemSeparatorComponent={HSeparator}
    />
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

const TrendingScroll = styled.FlatList`
  margin: 0 30px 10px 20px;
`;

const VSeparator = styled.View`
  width: 20px;
`;

const HSeparator = styled.View`
  height: 20px;
`;
