import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import {
  Text,
  View,
  ScrollView,
  FlatList,
  ActivityIndicator,
  ListRenderItemInfo,
} from "react-native";
import { useQuery, useQueryClient } from "react-query";
import styled from "styled-components/native";
import { tvApi } from "../Api/api";
import Loader from "../components/Loader";
import TrendingMovies from "../components/VContant";
import { ITvTypes, Tv } from "../types/apiType";

const Tvs: React.FC<NativeStackScreenProps<any, "Tv">> = () => {
  const queryGroup = useQueryClient();
  const {
    isLoading: tvTopRated,
    data: topRated,
    isRefetching: isrefetchTopRated,
  } = useQuery<ITvTypes>(["tv", "topRated"], tvApi.topRated);
  const {
    isLoading: tvPopular,
    data: popular,
    isRefetching: isrefetchPopular,
  } = useQuery<ITvTypes>(["tv", "popular"], tvApi.popular);
  const {
    isLoading: tvTrending,
    data: trending,
    isRefetching: isrefetchTrending,
  } = useQuery<ITvTypes>(["tv", "trending"], tvApi.trending);

  const onRefresh = async () => {
    console.log("refreshTv");
    queryGroup.refetchQueries(["tv"]);
  };

  const renderVMedia = ({ item }: ListRenderItemInfo<Tv>) => (
    <TrendingMovies
      poster_path={item.poster_path}
      original_title={item.name}
      vote_average={item.vote_average}
    />
  );

  const movieKeyExtractor = (item: Tv) => item.id + "";

  const isLoding = tvTopRated || tvPopular || tvTrending;

  const refreshiing =
    isrefetchTopRated || isrefetchPopular || isrefetchTrending;

  return isLoding ? (
    <Loader />
  ) : (
    <ScrollView>
      <TopRated>
        <ListTitle> TopRated</ListTitle>
        <FlatList
          keyExtractor={movieKeyExtractor}
          horizontal
          data={topRated?.results}
          renderItem={renderVMedia}
          ItemSeparatorComponent={VSeparator}
        />
      </TopRated>
      <TvPopular>
        <ListTitle> Popular</ListTitle>
        <FlatList
          keyExtractor={movieKeyExtractor}
          horizontal
          data={popular?.results}
          renderItem={renderVMedia}
          ItemSeparatorComponent={VSeparator}
        />
      </TvPopular>
      <TvTrending>
        <ListTitle> Trending</ListTitle>
        <FlatList
          keyExtractor={movieKeyExtractor}
          horizontal
          data={trending?.results}
          renderItem={renderVMedia}
          ItemSeparatorComponent={VSeparator}
        />
      </TvTrending>
    </ScrollView>
  );
};

export default Tvs;

const ListTitle = styled.Text`
  color: white;
  font-size: 15px;
  font-weight: 600;
  margin: 10px;
`;

const VSeparator = styled.View`
  width: 20px;
`;

const TopRated = styled.View`
  margin: 10px;
`;

const TvPopular = styled(TopRated)``;

const TvTrending = styled(TopRated)``;
