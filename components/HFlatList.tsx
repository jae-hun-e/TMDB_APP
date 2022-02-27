import React from "react";
import styled from "styled-components/native";
import { FlatList, ListRenderItemInfo } from "react-native";
import { IMedeia } from "../types/apiType";
import VContant from "./VContant";

interface VFlatListProps {
  title: string;
  data: any[];
}

const HFlatList: React.FC<VFlatListProps> = ({ title, data }) => {
  const movieKeyExtractor = (item: IMedeia) => item.id + "";

  const renderItem = ({ item }: ListRenderItemInfo<IMedeia>) => (
    <VContant
      poster_path={item.poster_path}
      original_title={item.original_title ?? item.original_name}
      vote_average={item.vote_average}
    />
  );

  return (
    <ListContainer>
      <Title>{title}</Title>
      <FlatListBox
        keyExtractor={movieKeyExtractor}
        horizontal
        ItemSeparatorComponent={VSeparator}
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

const VSeparator = styled.View`
  width: 20px;
`;
