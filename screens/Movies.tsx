import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ActivityIndicator, Dimensions, StyleSheet } from "react-native";
import Swiper from "react-native-web-swiper";
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
const Title = styled.Text`
  width: 100%;
  position: absolute;
  top: 0;
  color: white;
  font-size: 20px;
  font-weight: 800;
`;
const Content = styled.Text`
  width: 100%;
  position: absolute;
  bottom: 0;
  color: white;
  font-size: 15px;
  font-weight: 600;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
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
    // console.log(results);
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
        loop
        timeout={4}
        controlsEnabled={false}
        containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 3 }}
      >
        {nowPlaying.map((movie) => (
          <View key={movie.id}>
            <BgImg source={{ uri: makeImgPath(movie.backdrop_path) }} />
            <BlurView intensity={60} style={StyleSheet.absoluteFill}>
              <Title>{movie.original_title}</Title>
              <Content>{`${movie.overview.substring(0, 25)}...더보기`}</Content>
            </BlurView>
          </View>
        ))}
        {/* <View style={{ backgroundColor: "red" }}></View>
        <View style={{ backgroundColor: "blue" }}></View>
        <View style={{ backgroundColor: "yellow" }}></View> */}
      </Swiper>
    </Container>
  );
};

export default Movies;
