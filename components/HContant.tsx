import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import Poster from "./Poster";
import Votes from "./Votes";

interface IComingProps {
  poster_path: string | null;
  original_title: string;
  release_date?: string;
  overview: string;
  vote_average?: number;
}

const HContant: React.FC<IComingProps> = ({
  poster_path,
  original_title,
  release_date,
  overview,
  vote_average,
}) => {
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
    <TouchableOpacity onPress={goToDetail}>
      <Wrapper>
        <Poster path={poster_path || ""} />
        <MovieInfo>
          <Title>{original_title}</Title>
          {release_date ? (
            <Release>
              {`개봉예정일 : ${new Date(release_date).toLocaleDateString("ko", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}`}
            </Release>
          ) : null}
          <OverView>
            {overview.length > 60
              ? `${overview.slice(0, 60)}...더보기`
              : overview}
          </OverView>
          {vote_average ? <Votes vote_average={vote_average} /> : null}
        </MovieInfo>
      </Wrapper>
    </TouchableOpacity>
  );
};

export default HContant;

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
  margin: 10px 0;
  color: rgba(255, 255, 255, 0.6);
  font-size: 12px;
  font-weight: 400;
`;

const Release = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  font-size: 11px;
  margin: 10px 0 5px 0;
`;
