import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  useColorScheme,
} from "react-native";
// import Swiper from "react-native-web-swiper";
// ! IOS에서는 스크롤 이벤트가 걸린다 => react-native-swiper로 변경 (npm i --save react-native-swiper@next)
import Swiper from "react-native-swiper";
// ! 대신 이건 웹 호환이 안된다.
import styled from "styled-components/native";
import { BlurView } from "expo-blur";
import { makeImgPath } from "../utils";

const API_KEY = "e3ffb6091393154ff4a81caaf0b29666";

const Container = styled.ScrollView``;

const View = styled.View`
  flex: 1;
`;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const BgImg = styled.Image`
  flex: 1;
`;

const Wrapper = styled.View`
  flex-direction: row;
  margin: 10px;
`;

const Poster = styled.Image`
  width: 100px;
  height: 150px;
  border-radius: 5;
`;

const MovieInfo = styled.View`
  width: 50%;
  height: 100%;
  margin: 10px 0 0 10px;
`;

const Title = styled.Text`
  width: 100%;
  color: white;
  font-size: 15px;
  font-weight: 800;
`;

const OverVIew = styled.Text`
  width: 100%;
  margin-top: 20px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 12px;
  font-weight: 400;
`;

const Votes = styled(OverVIew)`
  position: absolute;
  bottom: 10;
  color: rgba(255, 255, 255, 0.8);
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const isDark = useColorScheme() !== "dark";
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNoWPlaying] = useState([]);
  const getNowPlaying = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=ko&page=1`
      )
    ).json();
    setNoWPlaying(results);
    setLoading(false);
    console.log(results[0]);
  };
  useEffect(() => {
    getNowPlaying();
  }, []);

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <Container>
      <Swiper
        horizontal
        loop
        autoplay
        autoplayTimeout={5}
        showsButtons={false}
        showsPagination={false} //!버튼 숨김
        containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 3 }}
      >
        {nowPlaying.map((movie) => (
          <View key={movie.id}>
            <BgImg source={{ uri: makeImgPath(movie.backdrop_path) }} />
            <BlurView
              intensity={70}
              style={StyleSheet.absoluteFill}
              tint={isDark ? "dark" : "light"}
            >
              <Wrapper>
                <Poster source={{ uri: makeImgPath(movie.poster_path) }} />
                <MovieInfo>
                  <Title>{movie.original_title}</Title>
                  {movie.overview.length > 0 ? (
                    <OverVIew>{`${movie.overview.slice(
                      0,
                      50
                    )}...더보기`}</OverVIew>
                  ) : null}
                  {movie.vote_average > 0 ? (
                    <Votes>{`⭐ : ${movie.vote_average}/10`}</Votes>
                  ) : null}
                </MovieInfo>
              </Wrapper>
            </BlurView>
          </View>
        ))}
      </Swiper>
    </Container>
  );
};

export default Movies;
