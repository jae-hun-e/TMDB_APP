import React, { useEffect } from "react";
import { Text } from "react-native";
import styled from "styled-components/native";

const Detail = ({ navigation: { setOptions }, route: { params } }) => {
  console.log(params);
  useEffect(() => {
    setOptions({
      title: params?.original_title,
    });
  }, []);
  return (
    <Container>
      <Text> {params?.original_title}</Text>
    </Container>
  );
};

export default Detail;

const Container = styled.View``;
