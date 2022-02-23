import React from "react";
import styled from "styled-components/native";

interface IVotesPorp {
  vote_average: number;
}

const Votes: React.FC<IVotesPorp> = ({ vote_average }) => {
  return (
    <Vote>{vote_average > 0 ? `⭐ ${vote_average}/10` : "coming soon"}</Vote>
  );
};
export default Votes;

const Vote = styled.Text`
  color: rgba(255, 255, 255, 0.8);
`;
