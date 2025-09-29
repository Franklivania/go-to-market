import { ThemeProvider } from "@/context/ThemeContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClient, QueryClientProvider , onlineManager } from "@tanstack/react-query";
import NetInfo from "@react-native-community/netinfo";

import { useReactQueryFocus } from "@/hooks/useReactQueryFocus";

onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected);
  });
});

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Karla: require("../assets/fonts/Karla-Font.ttf"),
    "Karla-Italic": require("../assets/fonts/Karla-Italic.ttf"),
  });
  const queryClient = new QueryClient();

  useReactQueryFocus();

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <StatusBar style="auto" />
          <Stack screenOptions={{ headerShown: false }} />
        </GestureHandlerRootView>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
