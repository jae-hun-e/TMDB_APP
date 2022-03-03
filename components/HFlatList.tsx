import React from "react";
import styled from "styled-components/native";
import { FlatList, ListRenderItemInfo } from "react-native";
import { IMedeia } from "../types/apiType";
import VContant from "./VContant";
import { HSeparator } from "../Theme/screenSize";

interface VFlatListProps {
  title: string;
  data: any[];
}

const HFlatList: React.FC<VFlatListProps> = ({ title, data }) => {
  const movieKeyExtractor = (item: IMedeia) => item.id + "";

  const renderItem = ({ item }: ListRenderItemInfo<IMedeia>) => (
    <VContant
      poster_path={item.poster_path}
      original_title={item.title ?? item.name}
      vote_average={item.vote_average}
      fullData={item}
    />
  );

  return (
    <ListContainer>
      <Title>{title}</Title>
      <FlatListBox
        keyExtractor={movieKeyExtractor}
        horizontal
        ItemSeparatorComponent={HSeparator}
        data={data}
        renderItem={renderItem}
      />
    </ListContainer>
  );
};

export default HFlatList;

const ListContainer = styled.View`
  margin: 10px;
`;

const FlatListBox = styled.FlatList`
  margin: 10px;
` as unknown as typeof FlatList;

const Title = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 10px;
  margin-bottom: 10px;
`;
