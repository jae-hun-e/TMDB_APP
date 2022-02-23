import AppLoading from "expo-app-loading";
import React, { useState } from "react";
import * as Font from "expo-font"; // expo 폰트
import { Asset } from "expo-asset";
import { Ionicons } from "@expo/vector-icons";
import { Image, useColorScheme } from "react-native";
import { ThemeProvider } from "styled-components/native";
import { darkTheme } from "./styled";
import { lightTheme } from "./styled";
import { NavigationContainer } from "@react-navigation/native";
import Root from "./navigation/Root";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const loadFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));

const loadImages = (images) =>
  images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.loadAsync(image);
    }
  });

export default function App() {
  const [ready, setReady] = useState(false); // 정상 로딩 되었는지 여부
  const onFinish = () => setReady(true); //로딩 완료
  const startLoading = async () => {
    const fonts = loadFonts([Ionicons.font]);
    await Promise.all([...fonts]);
  };
  const isDark = useColorScheme() !== "dark";

  if (!ready) {
    return (
      <AppLoading
        startAsync={startLoading}
        onFinish={onFinish}
        onError={console.error}
      />
    );
  }
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
