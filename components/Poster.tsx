import React from "react";
import styled from "styled-components/native";
import { makeImgPath } from "../utils";

interface IPosterProps {
  path: string;
}

const Poster: React.FC<IPosterProps> = ({ path }) => {
  return path ? (
    <PosterImg source={{ uri: makeImgPath(path) }} />
  ) : (
    <DefaultImg />
  );
};
export default Poster;

const PosterImg = styled.Image`
  width: 100px;
  height: 150px;
  border-radius: 5px;
`;

const DefaultImg = styled.View`
  width: 100px;
  height: 150px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.8);
`;
