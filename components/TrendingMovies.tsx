import React from "react";
import styled from "styled-components/native";
import Poster from "./Poster";
import Votes from "./Votes";

interface ITrendingProps {
  poster_path: string;
  original_title: string;
  vote_average: number;
}

const TrendingMovies: React.FC<ITrendingProps> = ({
  poster_path,
  original_title,
  vote_average,
}) => {
  return (
    <RestMovie>
      <Poster path={poster_path} />
      <Title>
        {original_title.length > 15
          ? `${original_title.slice(0, 15)}...`
          : original_title}
      </Title>
      <Votes vote_average={vote_average} />
    </RestMovie>
  );
};

export default TrendingMovies;

const RestMovie = styled.View``;

const Title = styled.Text`
  color: white;
  font-size: 12px;
  font-weight: 400;
`;
