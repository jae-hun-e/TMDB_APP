import React from "react";
import styled from "styled-components/native";
import Poster from "./Poster";
import Votes from "./Votes";
import { TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Movie, Tv } from "../types/apiType";

interface ITrendingProps {
  poster_path: string | null;
  original_title: string;
  vote_average: number;
  fillData: Movie | Tv;
}

const VContant: React.FC<ITrendingProps> = ({
  poster_path,
  original_title,
  vote_average,
  fillData,
}) => {
  const navigation = useNavigation();

  const goToDetail = () => {
    navigation.navigate("Stack", {
      screen: "Detail",
      params: {
        ...fillData,
      },
    });
  };
  return (
    <TouchableOpacity onPress={goToDetail}>
      <View>
        <Poster path={poster_path || ""} />
        <Title>
          {original_title.length > 10
            ? `${original_title.slice(0, 10)}...`
            : original_title}
        </Title>
        <Votes vote_average={vote_average} />
      </View>
    </TouchableOpacity>
  );
};

export default VContant;

const Title = styled.Text`
  color: white;
  font-size: 12px;
  font-weight: 400;
`;
