import React from "react";
import styled from "styled-components/native";
import { ActivityIndicator } from "react-native";

const Loader = () => {
  return (
    <Container>
      <ActivityIndicator />
    </Container>
  );
};

export default Loader;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
