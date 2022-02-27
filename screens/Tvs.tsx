import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { RefreshControl } from "react-native";
import { useQuery, useQueryClient } from "react-query";
import styled from "styled-components/native";
import { tvApi } from "../Api/api";
import Loader from "../components/Loader";
import HFlatList from "../components/HFlatList";
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
    <Container
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <HFlatList title="TopRated" data={topRated?.results} />
      <HFlatList title="Popular" data={popular?.results} />
      <HFlatList title="Trending" data={trending?.results} />
    </Container>
  );
};

export default Tvs;

const Container = styled.ScrollView``;
