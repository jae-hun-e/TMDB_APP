import { Dimensions } from "react-native";
import styled from "styled-components/native";

export const { height: SCREEN_HEIGHT } = Dimensions.get("window");
export const { width: SCREEN_WIDTH } = Dimensions.get("window");

export const HSeparator = styled.View`
  width: 20px;
`;

export const VSeparator = styled.View`
  height: 20px;
`;
