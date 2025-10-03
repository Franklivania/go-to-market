import { ThemeProvider } from "@/context/ThemeContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClient, QueryClientProvider, onlineManager } from "@tanstack/react-query";
import NetInfo from "@react-native-community/netinfo";
import { PaystackProvider } from "react-native-paystack-webview";

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
        <PaystackProvider
          debug
          publicKey="pk_test_010faa0bfa8c68abfcb50675ff4fe38b8d9ef64d"
          currency="NGN"
          defaultChannels={["card", "bank_transfer", "bank", "ussd"]}
        >
          <GestureHandlerRootView style={{ flex: 1 }}>
            <StatusBar style="auto" />
            <Stack screenOptions={{ headerShown: false }} />
          </GestureHandlerRootView>
        </PaystackProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
