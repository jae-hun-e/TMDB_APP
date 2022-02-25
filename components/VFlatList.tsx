import React from 'react'
import styled from 'styled-components/native'
import {FlatList} from 'react-native'
import { Tv } from '../types/apiType';

interface VFlatListProps{
  topRated:; renderVMedia: ;VSeparator:;
}


const VFlatList :React.FC<VFlatListProps> ({topRated, renderVMedia, VSeparator}) => {
  
  const movieKeyExtractor = (item: Tv) => item.id + "";

  return(
  <Contanier
  keyExtractor={movieKeyExtractor}
  horizontal
  data={topRated?.results}
  renderItem={renderVMedia}
  ItemSeparatorComponent={VSeparator}
/>
)}


const Contanier = styled.FlatList`
  margin: 10px;
` as unknown as typeof FlatList;
