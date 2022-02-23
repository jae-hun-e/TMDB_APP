import React from "react";
import styled from "styled-components/native";
import Poster from "./Poster";

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
      {poster_path ? <Poster path={poster_path} /> : <DefaultImg />}
      <Title>
        {original_title.length > 15
          ? `${original_title.slice(0, 15)}...`
          : original_title}
      </Title>
      <Votes>
        {vote_average > 0 ? `⭐ ${vote_average}/10` : "coming soon"}
      </Votes>
    </RestMovie>
  );
};

export default TrendingMovies;

const RestMovie = styled.View`
  margin-right: 20px;
`;

const Title = styled.Text`
  color: white;
  font-size: 12px;
  font-weight: 400;
`;

const Votes = styled.Text`
  color: rgba(255, 255, 255, 0.8);
`;

const DefaultImg = styled.View`
  background-color: rgba(255, 255, 255, 0.8);
`;
