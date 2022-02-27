import { useNavigation } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import React from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from "react-native";
import styled from "styled-components/native";
import { makeImgPath } from "../utils";
import Poster from "./Poster";
import Votes from "./Votes";

interface ISlideProps {
  backdrop_path: string;
  poster_path: string;
  original_title: string;
  overview: string;
  vote_average: number;
}

const Slide: React.FC<ISlideProps> = ({
  backdrop_path,
  poster_path,
  original_title,
  overview,
  vote_average,
}) => {
  const isDark = useColorScheme() === "dark";
  const navigation = useNavigation();

  const goToDetail = () => {
    navigation.navigate("Stack", {
      screen: "Detail",
      params: {
        original_title,
      },
    });
  };
  return (
    <TouchableWithoutFeedback onPress={goToDetail}>
      <View style={{ flex: 1 }}>
        <BgImg source={{ uri: makeImgPath(backdrop_path) }} />
        <BlurView
          intensity={50}
          style={StyleSheet.absoluteFill}
          tint={isDark ? "dark" : "light"}
        >
          <Wrapper>
            <Poster path={poster_path} />
            <MovieInfo>
              <Title>{original_title}</Title>
              {overview.length > 0 ? (
                <OverView>{`${overview.slice(0, 50)}...더보기`}</OverView>
              ) : null}
              <MVotes>
                <Votes vote_average={vote_average} />
              </MVotes>
            </MovieInfo>
          </Wrapper>
        </BlurView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Slide;

const BgImg = styled.Image`
  flex: 1;
`;

const Wrapper = styled.View`
  flex-direction: row;
  margin: 10px;
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

const OverView = styled.Text`
  width: 100%;
  margin-top: 20px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 12px;
  font-weight: 400;
`;

const MVotes = styled(OverView)`
  position: absolute;
  bottom: 10px;
  color: rgba(255, 255, 255, 0.8);
`;
