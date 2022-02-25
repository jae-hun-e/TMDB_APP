import React from "react";
import styled from "styled-components/native";
import Poster from "./Poster";

interface IComingProps {
  poster_path: string | null;
  original_title: string;
  release_date: string;
  overview: string;
}

const ComingMovies: React.FC<IComingProps> = ({
  poster_path,
  original_title,
  release_date,
  overview,
}) => {
  return (
    <Wrapper>
      <Poster path={poster_path || ""} />
      <MovieInfo>
        <Title>{original_title}</Title>
        <Release>
          {`개봉예정일 : ${new Date(release_date).toLocaleDateString("ko", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}`}
        </Release>
        <OverView>
          {overview.length > 60 ? `${overview.slice(0, 60)}...` : overview}
        </OverView>
      </MovieInfo>
    </Wrapper>
  );
};

export default ComingMovies;

const Wrapper = styled.View`
  flex-direction: row;
  margin: 0 20px 0 20px;
`;

const MovieInfo = styled.View`
  width: 50%;
  height: 100%;
  margin: 0 10px 0 10px;
`;

const Title = styled.Text`
  color: white;
  font-size: 12px;
  font-weight: 400;
`;

const OverView = styled.Text`
  width: 100%;
  margin-top: 10px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 12px;
  font-weight: 400;
`;

const Release = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  font-size: 11px;
  margin: 10px 0 5px 0;
`;
