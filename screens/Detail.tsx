import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { Text, StyleSheet, FlatList, Linking } from "react-native";
import styled from "styled-components/native";
import Poster from "../components/Poster";
import { Movie, Tv } from "../types/apiType";
import { LinearGradient } from "expo-linear-gradient";
import { makeImgPath } from "../utils";
import { HSeparator, SCREEN_HEIGHT } from "../Theme/screenSize";
import { BLACK_COLOR, YELLOW_COLOR } from "../Theme/colors";
import { useQuery } from "react-query";
import { moviesApi, tvApi } from "../Api/api";
import Loader from "../components/Loader";
import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";

type DetialParamList = {
  Detail: Movie | Tv;
};

type DetailScreenProps = NativeStackScreenProps<DetialParamList, "Detail">;

const Detail: React.FC<DetailScreenProps> = ({
  navigation: { setOptions },
  route: { params },
}) => {
  // console.log(params);

  const isMovie = "original_title" in params;

  const { isLoading, data } = useQuery(
    [isMovie ? "movies" : "tv", params.id],
    isMovie ? moviesApi.detail : tvApi.detail
  );

  // console.log(data);
  useEffect(() => {
    setOptions({
      title: "title" in params ? params.title : params.name,
    });
  }, []);

  const openYoutube = async (videoId: string) => {
    const baseUrl = `https://m.youtube.com/watch?v=${videoId}`;
    // ! Youtube앱 (다른 앱)으로 들어가서 열기
    // await Linking.openURL(baseUrl);

    // ! 내 앱 내에서 열기
    await WebBrowser.openBrowserAsync(baseUrl);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <Container
      ListHeaderComponent={
        <>
          <Header>
            <BgImg
              style={StyleSheet.absoluteFill}
              source={{ uri: makeImgPath(params.backdrop_path || "") }}
            />
            <LinearGradient
              colors={["transparent", BLACK_COLOR]}
              style={StyleSheet.absoluteFill}
            />
          </Header>
          <Info>
            <Poster path={params.poster_path || ""} />
            <TextInfo>
              <Title> {"title" in params ? params.title : params.name}</Title>
              <OverView>
                {params.overview.length > 80
                  ? `${params.overview.slice(0, 80)}...`
                  : params.overview}
              </OverView>
              {isLoading ? <Loader /> : null}
              <Genre style={{ color: "white" }}>
                장르 :
                {data?.genres.map((genre: { id: number; name: string }) => (
                  <Text style={{ color: "white" }}> {genre.name}, </Text>
                ))}
              </Genre>
            </TextInfo>
          </Info>
          <DetailInfo>
            <Title> 포토</Title>
            <PhotoList
              keyExtractor={(item) => item.file_path}
              horizontal
              ItemSeparatorComponent={HSeparator}
              data={data?.images?.posters}
              renderItem={({ item }) => <Poster path={item.file_path} />}
            />
            <Title> 예고편</Title>
          </DetailInfo>
        </>
      }
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={HSeparator}
      data={data?.videos?.results}
      renderItem={({ item }) => (
        <VideoList onPress={() => openYoutube(item.key)}>
          {/* {console.log(item)} */}
          <Ionicons name="logo-youtube" size={20} color="red" />
          <VideoBtn>{item.name}</VideoBtn>
        </VideoList>
      )}
    />
  );
};

export default Detail;

const Container = styled.FlatList`
  width: 100%;
  height: 100%;
  background-color: ${BLACK_COLOR};
` as unknown as typeof FlatList;

const Header = styled.View`
  height: ${SCREEN_HEIGHT / 3}px;
  padding: 10px 20px;
`;

const BgImg = styled.Image``;

const Info = styled.View`
  margin: 10px;
  padding: 10px;
  display: flex;
  flex-direction: row;
`;
const TextInfo = styled.View`
  margin-left: 20px;
  flex: 1;
`;
const Title = styled.Text`
  color: white;
  font-size: 20px;
  margin-top: 20px;
`;

const OverView = styled(Title)`
  margin-top: 10px;
  font-size: 12px;
`;

const DetailInfo = styled.View`
  margin: 10px;
  padding: 10px;
`;

const Genre = styled.Text`
  margin-top: 10px;
`;

const PhotoList = styled.FlatList`
  margin-top: 10px;
` as unknown as typeof FlatList;

const VideoList = styled.TouchableOpacity`
  margin: 0 10px;
  padding: 10px;
  flex: 1;
  flex-direction: row;
`;

const VideoBtn = styled.Text`
  color: white;
  font-weight: 500;
  margin-left: 10px;
  line-height: 20px;
`;
