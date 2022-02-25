import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  ScrollView,
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
} from "react-native";
import { useQuery, useQueryClient } from "react-query";
import styled from "styled-components/native";
import { tvApi } from "../Api/api";
import Loader from "../components/Loader";
import VContant from "../components/HContant";
import VFlatList from "../components/HFlatList";
import { ITvTypes, Tv } from "../types/apiType";

const Tvs: React.FC<NativeStackScreenProps<any, "Tv">> = () => {
  const [refreshing, setRefreshing] = useState(false);
  const queryGroup = useQueryClient();
  const { isLoading: tvTopRated, data: topRated } = useQuery<ITvTypes>(
    ["tv", "topRated"],
    tvApi.topRated
  );
  const { isLoading: tvPopular, data: popular } = useQuery<ITvTypes>(
    ["tv", "popular"],
    tvApi.popular
  );
  const { isLoading: tvTrending, data: trending } = useQuery<ITvTypes>(
    ["tv", "trending"],
    tvApi.trending
  );

  const onRefresh = async () => {
    console.log("refreshTv");
    setRefreshing(true);
    queryGroup.refetchQueries(["tv"]);
    setRefreshing(false);
  };

  const isLoding = tvTopRated || tvPopular || tvTrending;

  return isLoding ? (
    <Loader />
  ) : (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <VFlatList title="TopRated" data={topRated?.results} />
      <VFlatList title="Popular" data={popular?.results} />
      <VFlatList title="Trending" data={trending?.results} />
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
