import { colors } from "@/constants/Colours";
import React from "react";
import { ImageBackground, StyleSheet, View, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type AppLayoutProps = {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
};

export default function AppLayout({ children, style }: AppLayoutProps) {
  return (
    <ImageBackground
      source={require("@/assets/images/pd-image.png")}
      style={{ flex: 1, backgroundColor: colors.white[100] }}
      resizeMode="center"
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={[styles.main, style]}>{children}</View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 16,
    marginTop: 8,
  },
});
