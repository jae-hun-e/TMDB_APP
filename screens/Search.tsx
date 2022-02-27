import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components/native";
import { moviesApi, tvApi } from "../Api/api";
import HFlatList from "../components/HFlatList";
import Loader from "../components/Loader";

const Search: React.FC<NativeStackScreenProps<any, "Search">> = () => {
  const [query, setQuery] = useState("");
  const onChangeText = (Text: string) => setQuery(Text);
  console.log(query);
  // ! react-query로 key값이 fetch로 바로 보내진다.
  const {
    isLoading: moviesLoading,
    data: moviesData,
    refetch: searchMovies,
  } = useQuery(["searchMovies", query], moviesApi.search, {
    enabled: false,
  });

  const {
    isLoading: tvsLoading,
    data: tvsData,
    refetch: searchTvs,
  } = useQuery(["searchTvs", query], tvApi.search, { enabled: false });
  const onSubmit = () => {
    if (query === "") {
      return;
    }
    // Alert.alert("알림", "search", [
    //   { text: "Ask me later", onPress: () => console.log("Ask me later") },
    //   { text: "Okay", onPress: () => console.log("Okay") },
    // ]);
    searchMovies();
    searchTvs();
  };
  console.log("movie", moviesLoading, moviesData);
  console.log("tv", tvsLoading, tvsData);

  return (
    <Container>
      <SearchBar
        placeholder="영화나 TV를 검색해주세요"
        placeholderTextColor="grey"
        returnKeyLabel="Search"
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
      />
      {moviesLoading || tvsLoading ? <Loader /> : null}
      {moviesData ? (
        <HFlatList title="movies data" data={moviesData.results} />
      ) : null}
      {tvsData ? <HFlatList title="tvs data" data={tvsData.results} /> : null}
    </Container>
  );
};
export default Search;

const Container = styled.ScrollView``;

const SearchBar = styled.TextInput`
  background-color: white;
  padding: 10px 15px;
  border-radius: 10px;
  width: 90%;
  margin: 10px auto;
`;
