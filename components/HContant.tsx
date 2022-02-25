import React from "react";
import styled from "styled-components/native";
import Poster from "./Poster";
import Votes from "./Votes";
import { View } from "react-native";

interface ITrendingProps {
  poster_path: string | null;
  original_title: string;
  vote_average: number;
}

const VContant: React.FC<ITrendingProps> = ({
  poster_path,
  original_title,
  vote_average,
}) => {
  return (
    <View>
      <Poster path={poster_path || ""} />
      <Title>
        {original_title.length > 15
          ? `${original_title.slice(0, 15)}...`
          : original_title}
      </Title>
      <Votes vote_average={vote_average} />
    </View>
  );
};

export default VContant;

const Title = styled.Text`
  color: white;
  font-size: 12px;
  font-weight: 400;
`;
