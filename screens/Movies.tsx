import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ListRenderItemInfo,
} from "react-native";
// import Swiper from "react-native-web-swiper";
// ! IOS에서는 스크롤 이벤트가 걸린다 => react-native-swiper로 변경 (npm i --save react-native-swiper@next)
import Swiper from "react-native-swiper";
// ! 대신 이건 웹 호환이 안된다.
import styled from "styled-components/native";
import Slide from "../components/Slide";
import TrendingMovies from "../components/VContant";
import ComingMovies from "../components/ComingMovies";
import { useQuery, useQueryClient } from "react-query";
import { moviesApi } from "../Api/api";
import { IMovieTypes, Movie } from "../types/apiType";
import Loader from "../components/Loader";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const queryGroup = useQueryClient(); //!모든 쿼리 관장함

  const {
    isLoading: nowPlayingLoading,
    data: nowPlaying,
    isRefetching: isrefetchNowPlaying,
  } = useQuery<IMovieTypes>(["movies", "nowPlaying"], moviesApi.nowPlaying);
  const {
    isLoading: upComingLoading,
    data: upComing,
    isRefetching: isrefetchUpComing,
  } = useQuery<IMovieTypes>(["movies", "upComing"], moviesApi.upComing);
  const {
    isLoading: trendingLoading,
    data: trending,
    isRefetching: isrefetchTrending,
  } = useQuery<IMovieTypes>(["movies", "trending"], moviesApi.trending);

  const onRefresh = async () => {
    console.log("refresh");
    queryGroup.refetchQueries(["movies"]);
  };

  // ! refatoring
  const renderVMedia = ({ item }: ListRenderItemInfo<Movie>) => (
    <TrendingMovies
      poster_path={item.poster_path}
      original_title={item.title}
      vote_average={item.vote_average}
    />
  );

  const renderHMedia = ({ item }: ListRenderItemInfo<Movie>) => (
    <ComingMovies
      poster_path={item.poster_path}
      original_title={item.title}
      release_date={item.release_date}
      overview={item.overview}
    />
  );

  const movieKeyExtractor = (item: Movie) => item.id + "";

  const loading = nowPlayingLoading || upComingLoading || trendingLoading;
  const refreshing =
    isrefetchNowPlaying || isrefetchUpComing || isrefetchTrending;

  // ! 타입 체크
  // console.log("key", Object.keys(nowPlaying?.results[0]));
  // console.log(
  //   "value",
  //   Object.values(nowPlaying?.results[0]).map((v) => typeof v)
  // );

  return loading ? (
    <Loader />
  ) : upComing ? (
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
            {nowPlaying?.results.map((movie) => (
              <Slide
                key={movie.id}
                backdrop_path={movie.backdrop_path || ""}
                poster_path={movie.poster_path || ""}
                original_title={movie.title}
                overview={movie.overview}
                vote_average={movie.vote_average}
              />
            ))}
          </Swiper>
          <ListTitle>Trending Movies</ListTitle>

          {/* //! ScrollView는 한번에 모든 컴포넌트를 로딩하기 때문에 성능 저하를 일으킨다 (FlatList가 더 좋음)  */}
          {trending ? (
            <TrendingScroll
              horizontal
              keyExtractor={movieKeyExtractor}
              showsHorizontalScrollIndicator={false}
              data={trending.results}
              renderItem={renderVMedia}
              ItemSeparatorComponent={VSeparator}
            />
          ) : null}

          <ListTitle>ComingSoon Movies</ListTitle>
        </>
      }
      keyExtractor={movieKeyExtractor}
      data={upComing.results}
      renderItem={renderHMedia}
      ItemSeparatorComponent={HSeparator}
    />
  ) : null;
};

export default Movies;

const ListTitle = styled.Text`
  color: white;
  font-size: 15px;
  font-weight: 600;
  margin: 0 0 10px 20px;
`;

const TrendingScroll = styled.FlatList`
  margin: 0 30px 10px 20px;
` as unknown as typeof FlatList;

const VSeparator = styled.View`
  width: 20px;
`;

const HSeparator = styled.View`
  height: 20px;
`;
